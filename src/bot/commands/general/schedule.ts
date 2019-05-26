import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Util from '../../util/util';

export default class ScheduleCommand extends Command {
	public constructor() {
		super('info', {
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

                },
                {
                    id: 'now',
                    flag: ['--now', '-n']
                }
            ]
		});
	}

	public async exec(msg: Message, { }): Promise<Message | Message[]> {
		
	}
}

