import { Command } from 'discord-akairo';
import { Message, TextChannel } from 'discord.js';
import Util from '../../util/util';

export default class ScheduleCommand extends Command {
	public constructor() {
		super('schedule', {
			channel: 'guild',
			aliases: ['schedule'],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: `Schedules an animal post for the animal you provide.\nYou can chose from ${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join(', ')}.\nUsing --now will send an image right now.`,
				usage: '<channel> [--now]'
			},
			cooldown: 5,
			category: 'general',
			args: [
				{
					id: 'type',
					type: Object.keys(Util.CONSTANTS.TYPES),
					prompt: {
						start: `what animal do you want to schedule?\n${Object.keys(Util.CONSTANTS.TYPES).map(a => `\`${a}\``).join('or')}.`,
						retry: 'please provide a valid animal option.'
					}

				},
				{
					id: 'channel',
					type: 'textChannel',
					prompt: {
						start: 'what channel would you like to send the images to?',
						retry: 'please provide a valid text channel.'
					}
				},
				{
					id: 'now',
					flag: ['--now', '-n']
				}
			]
		});
	}

	public async exec(msg: Message, { type, channel, now }: { type: string; channel: TextChannel; now: boolean }): Promise<Message | Message[]> {
		if (now) {
			const animal = Util.CONSTANTS.TYPES[type];
			const image = await this.client.requestManager.getLink(animal);
			return msg.util!.send({
				files: [{
					attachment: image,
					name: `${type}.png`
				}]
			});
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

