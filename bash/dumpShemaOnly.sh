#!/bin/bash

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="database_name"
DB_USER="postgres"


# Create a PostgreSQL database dump
# pg_dump --data-only -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f ~/Desktop/db_dump.sql
pg_dump \
  --no-owner \
  --no-privileges \
  --schema-only\
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -d $DB_NAME \
  -f ./tmp/db_dump_schema.sql


# unset PGPASSWORD
