import { env } from 'env';
import migrationRunner from 'node-pg-migrate'
import { join } from "node:path"


export default async function migrations(request, response){

    const defaultMigrationOptions = {
            databaseUrl: env.DATABASE_URL,
            dryRun: true,
            dir: join("infra", "migrations"),
            direction: "up",
            verbose: true,
            migrationsTable: "pgmigrations",
        }

    if(request.method === 'GET'){
        const pendingMigrations = await migrationRunner(defaultMigrationOptions);
        response.status(200).json(pendingMigrations);
    }

    if(request.method === 'POST'){
        const migrateMigrations = await migrationRunner({
            ...defaultMigrationOptions,
            dryRun: false,
     })
     if(migrateMigrations.length > 0 ) return response.status(201).json(migrateMigrations)
    
        return response.status(200).json(migrateMigrations);
    }
    return response.status(405).send();
}
