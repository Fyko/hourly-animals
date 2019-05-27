import { Command } from 'discord-akairo';
import { stripIndents } from 'common-tags';
import { Message } from 'discord.js';

export default class HelpCommand extends Command {
	public constructor() {
		super('help', {
			category: 'utilities',
			aliases: ['help'],
			description: {
				content: 'Displays all available commands or detailed info for a specific command.',
				usage: '[command]',
				examples: ['', 'ebay', 'size']
			},
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					id: 'command',
					type: 'commandAlias',
					prompt: {
						start: 'Which command would you like more info on?',
						retry: 'Please provide a valid command.',
						optional: true
					}
				}
			]
		});
	}

	public async exec(msg: Message, { command }: { command: Command}): Promise<Message | Message[]> {
		// @ts-ignore
		const prefix = await this.handler.prefix;
		if (!command) {
			const embed = this.client.util.embed()
				.setTitle('Commands')
				.setColor(this.client.config.color!)
				.setDescription(stripIndents`This is a list of the available commands.
                    For more info on a command, type \`${prefix}help <command>\`
                `);

			for (const category of this.handler.categories.values()) {
				if (category.id === 'owner') continue;
				embed.addField(`❯ ${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`, `${category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.aliases[0]}\``).join(', ')}`);
			}
			return msg.util!.send({ embed });
		}
		const embed = this.client.util.embed()
			.setColor(this.client.config.color!)
			.setTitle(`\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``)
			.addField('❯  Description', command.description.content || '\u200b');

		if (command.aliases.length > 1) embed.addField('❯ Aliases', `\`${command.aliases.join('`, `')}\``);
		if (command.description.examples && command.description.examples.length) embed.addField('❯ Examples', `\`${command.aliases[0]} ${command.description.examples.join(`\`\n\`${command.aliases[0]} `)}\``);
		return msg.util!.send({ embed });
	}
}
