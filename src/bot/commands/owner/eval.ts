/* this was stolen from crawl thanks */
import { Command } from 'discord-akairo';
import { Message, Util } from 'discord.js';
import * as util from 'util';
import { stripIndents } from 'common-tags';

export default class EvalCommand extends Command {
	constructor() {
		super('eval', {
			category: 'owner',
			aliases: ['eval', 'js'],
			args: [
				{
					id: 'code',
					match: 'content',
					prompt: {
						start: 'what code would you like to evaluate?'
					}
				}
			],
			clientPermissions: ['SEND_MESSAGES'],
			description: 'Evaluate JavaScript code.',
			ownerOnly: true
		});
	}

	async exec(msg: Message, { code }: { code: string }) {
		let evaled;
		const start = Date.now();
		let type;
		try {
			evaled = await eval(code);
			type = typeof evaled;
			if (typeof evaled === 'object') {
				evaled = util.inspect(evaled, {
					depth: 0
				});
			}
		} catch (err) {
			return msg.util!.send(stripIndents`
                An error occured!
                \`\`\`xl
                    ${err}
                \`\`\`
           `);
		}
		const end = Date.now();
		if (!evaled) {
			evaled = 'Nothing...';
		}
		if (evaled.length > 1500) {
			evaled = 'Response too long.';
		}
		return msg.util!.send(stripIndents`
            **Output**:
            \`\`\`js
                ${evaled}
            \`\`\`
            **Type**:
            \`\`\`js
                ${type}
            \`\`\`
            ⏱ ${end - start}ms
        `);
	}
};