import pkg from 'dotenv/config' ;
import pg from 'pg'

const {PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT} = pkg;

//*******************************************//
//* initialization of connection throw pool *//
//*******************************************//
const {Pool} = pg
const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT
}) 
export const query = (text, params) => pool.query(text, params);