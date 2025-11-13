DB_HOST="localhost"
DB_PORT="5432"
DB_USER="postgres"
DB_NAME="database_name"

# create database
# psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE pg_manager_prod;"


psql \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -d $DB_NAME \
  -f ./tmp/db_dump.sql
