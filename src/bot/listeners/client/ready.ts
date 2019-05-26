import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
	public constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
			category: 'client'
		});
	}

	public async exec(): Promise<void> {
		this.client.logger.info(`[READY] ${this.client.user!.tag} is ready to send cute puppy pics.`);
		this.client.user!.setActivity(`@${this.client.user!.tag} help`, { type: 'WATCHING' });
		setInterval(async () => {
			for (const g2 of this.client.guilds.values()) {
				g2.presences.clear();
			}
		}, 900);
	}
}
