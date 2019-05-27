import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';
import Util from '../../util/util';

export default class ScheduleCommand extends Command {
	public constructor() {
		super('schedule', {
			channel: 'guild',
			aliases: ['schedule', 'hourly'],
			userPermissions: ['MANAGE_MESSAGES'],
			clientPermissions: ['SEND_MESSAGES'],
			ignorePermissions: [process.env.OWNER as string],
			description: {
				content: `Schedules an animal post for the animal you provide.\nYou can chose from ${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join(', ')}.\nUsing --now will send an image right now.`,
				usage: '<animal> <channel>'
			},
			cooldown: 5,
			category: 'general'
		});
	}

	public *args(): object {
		const type = yield {
			type: Object.keys(Util.CONSTANTS.TYPES),
			prompt: {
				start: `what animal do you want to schedule?\n${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join('or')}.`,
				retry: 'please provide a valid animal option.'
			}
		};

		const channel = yield {
			type: 'textChannel',
			prompt: {
				start: 'what channel would you like to send the images to?',
				retry: 'please provide a valid text channel.'
			}
		};

		return { type, channel };
	}

	public async exec(msg: Message, { type, channel }: { type: string; channel: TextChannel; now: boolean }): Promise<Message | Message[]> {
		const check = await this.client.model.default.find({ channel: channel.id, type: Util.CONSTANTS.TYPES[type] });
		if (check.length) {
			return msg.util!.send(`Sorry pal! You're already running a ${type} schedule in that channel.`);
		}

		await this.client.scheduleManager.add({
			type: Util.CONSTANTS.TYPES[type],
			guild: msg.guild!.id,
			channel: channel!.id,
			message: null
		});
		return msg.util!.send(`Sounds good! I will send a ${type} pic in ${channel} every hour.`);
	}
}

