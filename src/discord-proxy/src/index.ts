import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import fastifyCors from '@fastify/cors'
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { UserRoutes } from './service';

dotenv.config({ path: '../../.env' });

const client = new Client({ intents: [] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

const server: FastifyInstance = Fastify({})

server.register(fastifyCors);
server.register(UserRoutes);

server.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' }
})

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    await client.login(process.env.DISCORD_BOT_TOKEN!);

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()