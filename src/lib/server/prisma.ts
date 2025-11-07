import { PrismaClient } from "$lib/server/prisma/client";

let _client: PrismaClient | undefined = undefined;

export async function getPrismaClient() {
    if (!_client) {
        _client = new PrismaClient();
        await _client.$connect();
    }
    return _client;
}

