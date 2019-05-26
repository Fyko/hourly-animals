import { config } from 'dotenv';
import { resolve } from 'path';
import { connect } from 'mongoose';
config({ path: resolve(__dirname, '..', '.env') });

import AnimalClient from './bot/classes/AnimalClient';
import { Logger } from 'winston';

const client = new AnimalClient({ token: process.env.TOKEN, owner: process.env.OWNER });

client
	.on('error', (err): Logger => client.logger.error(`[CLIENT ERROR] ${err.message}`, err.stack))
	.on('shardError', (err, id): Logger => client.logger.error(`[SHARD ${id} ERROR] ${err.message}`, err.stack))
	.on('warn', (warn): Logger => client.logger.warn(`[CLIENT WARN] ${warn}`));

client.launch();

if (process.env.MONGO) {
	connect(process.env.MONGO, {
		useNewUrlParser: true,
		useFindAndModify: false
	});
}

process.on('unhandledRejection', err => {
	console.error('An unhandled promise rejection occured');
	console.error(err);
});
