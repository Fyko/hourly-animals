import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CooldownListener extends Listener {
	public constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown',
			category: 'commandHandler'
		});
	}

	public exec(msg: Message, _: any, time: number) {
		time /= 1000;
		return msg.reply(`Pipe down! You can use that command again in ${time.toFixed()}.`);
	}
};
