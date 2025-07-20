import Fastify, { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'
import { Client, Events } from 'discord.js';
import dotenv from 'dotenv';
import { Token } from './token';

dotenv.config({ path: '../../.env' });

async function initDiscord(): Promise<Client> {
  const client = new Client({ intents: [] });

  client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    Token.initDiscord(client);
  });

  client.on(Events.InteractionCreate, async interaction => {
    Token.interactionHandlerDiscord(client, interaction);
  });

  await client.login(process.env.DISCORD_BOT_TOKEN!);
  return client;
}

async function initServer(): Promise<FastifyInstance> {
  const server: FastifyInstance = Fastify({})

  server.register(fastifyCors);

  server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' }
  })

  await server.listen({ port: 3000 });
  console.log("Listening on 3000");
  return server;
}

async function start() {
  try {
    const client = await initDiscord();
    const server = await initServer();
  } catch (err) {
    process.exit(1)
  }
}

start()