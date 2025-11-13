#!/bin/bash



DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="database_name"
DB_USER="username"


# Create a PostgreSQL database dump
# pg_dump --data-only -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f ~/Desktop/db_dump.sql

pg_dump \
  --no-owner \
  --no-privileges \
  -h $DB_HOST \
  -p $DB_PORT \
  -U $DB_USER \
  -d $DB_NAME \
  -f ./tmp/db_dump.sql


# unset PGPASSWORD
