import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class InfoCommand extends Command {
	public constructor() {
		super('info', {
			aliases: ['info', 'about', 'stats', 'invite'],
			clientPermissions: ['SEND_MESSAGES'],
			description: {
				content: 'Returns information on the Developer.'
			},
			category: 'utilities'
		});
	}

	public async exec(msg: Message): Promise<Message | Message[]> {
		const fyko = await this.client.fetchApplication().then(a => a.owner);
		const format = fyko!.avatar && fyko!.avatar.startsWith('a_') ? 'gif' : 'png';
		const embed = this.client.util.embed()
			.setAuthor('Bot Information', fyko!.displayAvatarURL({ format }))
			.setDescription('This bot was developed by [@FykoPK](https://twitter.com/FykoPK). Shit hit the fan? Tell me in my [Discord Server](https://discord.gg/Agg6yFV)');
		return msg.util!.send({ embed });
	}
}

