import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Util from '../../util/util';

interface Data {
	type?: number;
	guild?: string;
	channel?: string;
	message?: null | string;
}

export default class ScheduleListCommand extends Command {
	public constructor() {
		super('schedule-list', {
			channel: 'guild',
			aliases: ['list', 'show'],
			clientPermissions: ['SEND_MESSAGES'],
			ignorePermissions: [process.env.OWNER as string],
			description: {
				content: 'Shows all this guild\'s scheduled hourly posts.'
			},
			cooldown: 5,
			category: 'schedule'
		});
	}

	public async exec(msg: Message): Promise<Message | Message[]> {
		const schedules = await this.client.model.default.find({ guild: msg.guild!.id });
		if (!schedules.length) {
			return msg.util!.send(`This server has no hourly posts! ${msg.member!.permissions.has('MANAGE_MESSAGES') ? `Why not add some with \`${this.handler.prefix}add\`!` : ''}`);
		}
		const embed = this.client.util.embed()
			.setColor(this.client.config.color!)
			.setTitle('Current Hourly Posts');
		if (schedules.size > 20) {
			embed.setDescription('Too many.');
			return msg.util!.send({ embed });
		}
		embed.setDescription(
			schedules.reduce((out: string, a: any): string => {
				out += `${Util.CONSTANTS.REVERSE[a.type]} pics in ${msg.guild!.channels.get(a.channel) ? msg.guild!.channels.get(a.channel) : '#deleted-channel'}.\n`;
				return out;
			}, '')
		);
		return msg.util!.send({ embed });
	}
}

