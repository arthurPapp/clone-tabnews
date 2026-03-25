import { Client } from 'pg';
import { env } from 'env'

async function query(queryObject) {
    const client = new Client({
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        user: env.POSTGRES_USER,
        database: env.POSTGRES_DB,
        password: env.POSTGRES_PASSWORD,
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect();

        const result = await client.query(queryObject);

        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }


}


export default {
    query: query
};
