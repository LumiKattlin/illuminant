import { PrismaClient } from "$lib/server/prisma/client";

let _client: PrismaClient | undefined = undefined;

export async function getPrismaClient() {
    if (!_client) {
        const databaseFile = import.meta.env.DEV ? "file:./dev.db" : "file:./prod.db";
        
        process.env.DB_URL = databaseFile

        console.log("Using db:", databaseFile)

        _client = new PrismaClient({
            datasources: {
                db: {
                    url: databaseFile
                }
            }
        });
        await _client.$connect();
    }
    return _client;
}
