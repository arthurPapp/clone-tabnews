import { Client, Pool } from 'pg';
import { env } from 'env'

const poolConfig = env.NODE_ENV === 'production' ?
    {
        connectionString: env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    }
    : {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        database: env.POSTGRES_DB,
        password: env.POSTGRES_PASSWORD,
    };

const pool = new Pool(poolConfig);

async function query(queryObject) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(queryObject);

        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.release();
        //await client.end();
    }


}


export default {
    query: query
};
