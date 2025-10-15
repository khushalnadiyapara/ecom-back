#!/bin/bash



DB_HOST="194.164.149.149"
DB_PORT="5432"
DB_NAME="vb_brothers"
DB_USER="admin"


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
