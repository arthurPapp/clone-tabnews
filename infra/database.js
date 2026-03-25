import { Pool } from 'pg';
import { env } from 'env'


const isProduction = env.NODE_ENV === 'production' || process.env.VERCEL === '1';

const poolConfig = isProduction ?
    {
        connectionString: env.POSTGRES_URL,
        ssl: true
        // ssl: {
        //     rejectUnauthorized: false,
        // }
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
