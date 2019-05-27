import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Util from '../../util/util';

export default class ScheduleDeleteCommand extends Command {
	public constructor() {
		super('schedule-delete', {
			channel: 'guild',
			aliases: ['delete', 'remove'],
			clientPermissions: ['SEND_MESSAGES'],
			ignorePermissions: [process.env.OWNER as string],
			description: {
				content: 'Deletes all ongoing schedules.',
				usage: '[--all/-a]',
				examples: ['', '--all']
			},
			cooldown: 5,
			category: 'schedule',
			args: [
				{
					id: 'all',
					match: 'flag',
					flag: ['--all', '-a']
				}
			]
		});
	}

	public async exec(msg: Message, { all }: { all: boolean }): Promise<Message | Message[]> {
		if (all) {
			const schedules = await this.client.model.default.find({ guild: msg.guild!.id });
			for (const doc of schedules) doc.delete();
			return msg.util!.send(`I deleted ${schedules.length} schedule${schedules.length === 1 ? '' : 's'}.`);
		}

		const schedules = await this.client.model.default.find({ guild: msg.guild!.id });
		if (!schedules.length) return msg.util!.send('So... you want me to delete nothing?');

		while (schedules.length) {
			const arr = [];
			let number = 1;
			for (const s of schedules) {
				arr.push(`${number}. ${Util.CONSTANTS.REVERSE[s.type]} in ${msg.guild!.channels.get(s.channel) ? msg.guild!.channels.get(s.channel) : '#deleted-channel'}`);
				number++;
			}
			const embed = this.client.util.embed()
				.setAuthor(`${msg.guild!.name}'s Ongoing Schedules`)
				.setColor(this.client.config.color!)
				.setDescription(`Send a message with the schedule's number to delete it or \`cancel\` to cancel\n\n${arr.join('\n')}`);
			await msg.channel.send({ embed });
			const messages = await msg.channel.awaitMessages(
				m => m.author.id === msg.author!.id && ((m.content > 0 && m.content <= schedules.length) || m.content.toLowerCase() === 'cancel'),
				{ max: 1, time: 20000 }
			);
			if (!messages.size) return msg.util!.send('Time\'s up!');
			if (messages.first()!.content.toLowerCase() === 'cancel') return msg.util!.send('Welp, it was nice helpin\' ya!');

			const index = parseInt(messages.first()!.content, 10) - 1;
			const reminder = schedules.splice(index, 1)[0];
			await reminder.delete();
		}

		return msg.util!.send('Welp, looks like all of your schedules are gone!');
	}
}

