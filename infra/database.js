import { Client } from 'pg';
import { env } from '../env'

async function query(queryObject) {

    const client = new Client({
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        database: env.POSTGRES_DATABASE,
        password: env.POSTGRES_PASSOWORD
    });

    await client.connect();
    const result = await client.query(queryObject)
    await client.end();

    return result;
}


export default {
    query: query
};
