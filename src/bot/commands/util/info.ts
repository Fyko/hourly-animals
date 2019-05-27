import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { stripIndents } from 'common-tags';

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
		const dev = await this.client.fetchApplication().then(a => a.owner);
		const format = dev!.avatar && dev!.avatar.startsWith('a_') ? 'gif' : 'png';
		const embed = this.client.util.embed()
			.setColor(this.client.config.color!)
			.setAuthor('Bot Information', dev!.displayAvatarURL({ format }))
			.setDescription(stripIndents`
				Want some random animal photos in your server? [Invite](https://discordapp.com/api/oauth2/authorize?client_id=582018558759010314&permissions=116800&scope=bot) me!
				Shit hit the fan? Tell me in my [Discord Server](https://discord.gg/Agg6yFV).
				Wanna see the code? It\'s [open source](https://github.com/Fyk0/hourly-animals/)!
			`)
		return msg.util!.send({ embed });
	}
}

