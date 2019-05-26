import { Listener } from 'discord-akairo';
import { Guild, WebhookClient } from 'discord.js';
import { stripIndents } from 'common-tags';
import * as moment from 'moment';
import 'moment-duration-format';

export default class GuildCreateListener extends Listener {
	public constructor() {
		super('guildCreate', {
			emitter: 'client',
			event: 'guildCreate',
			category: 'client',
		});
	}

	public async exec(guild: Guild) {
		const owner = this.client.users.get(guild.ownerID);
		const createdAgo = moment.duration(new Date().getTime() - guild.createdTimestamp).format('D [days and] H [hours ago]');
		const embed = this.client.util.embed()
			.setAuthor('Joined a Server')
			.setColor('GREEN')
			.setDescription(stripIndents`
				**Name**: \`${guild.name}\`
				**ID**: \`${guild.id}\`
				**Member Count**: ${guild.memberCount}
				**Created**: ${createdAgo}
				**Owner**: ${owner} \`[${owner!.tag}]\`
			`);
		const channel = new WebhookClient(process.env.WH_ID as string, process.env.WH_TOKEN as string);
		await channel.send({
			embeds: [embed],
			username: `guild logs n shit`,
			avatarURL: this.client.user!.displayAvatarURL()
		});
			
	}
};
