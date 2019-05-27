import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Util from '../../util/util';

export default class PictureCommand extends Command {
	public constructor() {
		super('picture', {
			aliases: ['picture', 'pic'],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: `Sends an animal pic for the animal you provide.\nYou can chose from ${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join(', ')}.`,
				usage: '<animal>'
			},
			cooldown: 5,
			category: 'general'
		});
	}

	public *args(): object {
		const type = yield {
			type: Object.keys(Util.CONSTANTS.TYPES),
			prompt: {
				start: `what animal do you want to schedule?\n${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join(' or ')}.`,
				retry: 'please provide a valid animal option.'
			}
		};
		return { type };
	}

	public async exec(msg: Message, { type }: { type: string }): Promise<Message | Message[]> {
		const animal = Util.CONSTANTS.TYPES[type];
		const image = await this.client.requestManager.getLink(animal);
		return msg.util!.send({
			files: [{
				attachment: image,
				name: `${type}.png`
			}]
		});
	}
}

