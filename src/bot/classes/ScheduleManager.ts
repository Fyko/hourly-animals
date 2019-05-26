import RequestManager from './RequestManager';
import AnimalClient from './AnimalClient';
import Schedule from '../models/Schedule';
import { TextChannel } from 'discord.js';

export default class ScheduleManager {
	protected client: AnimalClient;

	protected rate: number;

	protected manager: RequestManager;

	protected hour: number;

	protected checkInterval!: NodeJS.Timeout;


	public constructor(client: AnimalClient, { rate = 30000 }) {
		this.client = client;
		this.manager = new RequestManager();
		this.rate = rate;
		this.hour = new Date().getHours();
	}

	public async run(): Promise<void> {
		const schedules = await Schedule.find();
		for (const doc of schedules) {
			const image = await this.manager.getLink(doc.type as number).catch(() => {});
			try {
				const channel = this.client.channels.get(doc.channel as string) as TextChannel;
				if (channel) {
					channel.send({ files: image });
				}
			} catch {}
		}
	}


	public async init(): Promise<void> {
		await this._check();
		this.checkInterval = this.client.setInterval(this._check.bind(this), this.rate);
	}

	private async _check(): Promise<void> {
		const now = new Date();
		if (now.getHours() !== this.hour) {
			return this.run();
		}
	}
}
