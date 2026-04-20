const { Pool, types } = require('pg');
const Parameter = require('./parameter');

const { database } = require('../../config/var');

const dbConfig = {
  user: database.user,
  password: database.password,
  host: database.host,
  database: database.database,
  port: database.port,
  max: 80,
  ssl: false,
  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  // return an error after specified milliseconds if connection could not be established
  connectionTimeoutMillis: 30000, // i.e. "connect_timeout" // (30 seconds X 1000 milliseconds)

  // max milliseconds a client can go unused before it is removed from the pool and destroyed
  idleTimeoutMillis: 900000, // (15 minutes X 60 seconds X 1000 milliseconds)

  // max milliseconds any query using this connection will execute for before timing out in error.
  // false=unlimited
  statement_timeout: 30000, // (30 seconds X 1000 milliseconds)

  // max milliseconds to wait for query to complete (client side)
  query_timeout: 30000, // (30 seconds X 1000 milliseconds)
};

const pool = new Pool(dbConfig);

// Parse date to UTC
// types.setTypeParser(1114, (dateStr) => new Date(`${dateStr} UTC`));
types.setTypeParser(1700, (val) => parseFloat(val));

function convertNamedQueryToPositional(sqlStmt, params) {
  const values = [];
  const fields = [];
  let paramIndex = 1;
  const newQueryText = sqlStmt.replace(/\$\w+/g, (match) => {
    const paramName = match.substring(1); // Remove the colon
    fields.push(paramName);
    values.push(params[paramName]);
    const result = `$${paramIndex}`;
    paramIndex += 1;
    return result;
  });

  return { sqlStmt: newQueryText, params: values };
}

async function getConnection() {
  const client = await pool.connect();

  async function namedQueryAll(sqlStmt, params) {
    const newQuery = convertNamedQueryToPositional(sqlStmt, params);
    const res = await client.query(newQuery.sqlStmt, newQuery.params);
    return res.rows;
  }

  async function namedQueryOne(sqlStmt, params) {
    const res = await namedQueryAll(sqlStmt, params);
    return res[0];
  }

  async function queryAll(sqlStmt, params) {
    const res = await client.query(sqlStmt, params);
    return res.rows;
  }

  async function queryOne(sqlStmt, params) {
    const res = await queryAll(sqlStmt, params);
    return res[0];
  }

  const obj = {
    client,
    query: (sqlStmt, params) => client.query(sqlStmt, params),
    release: () => client.release(),
    namedQueryAll,
    namedQueryOne,
    queryAll,
    queryOne,
  };

  return obj;
}

module.exports = {
  getConnection,

  /**
   * @param {any[]} params
   * @returns {Parameter}
   */
  parameter: (...params) => new Parameter(params),
};
