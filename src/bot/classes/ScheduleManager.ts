import RequestManager from './RequestManager';
import AnimalClient from './AnimalClient';
import Schedule from '../models/Schedule';
import { TextChannel } from 'discord.js';
import Util from '../util/util';

interface Data {
	type?: number;
	guild?: string;
	channel?: string;
	message?: null | string;
}

export default class ScheduleManager {
	protected client: AnimalClient;

	protected rate: number;

	protected manager: RequestManager;

	protected hour: number;

	protected checkInterval!: NodeJS.Timeout;

	public constructor(client: AnimalClient, { rate = 30000 } = {}) {
		this.client = client;
		this.manager = new RequestManager();
		this.rate = rate;
		this.hour = new Date().getHours();
	}

	public async add(data: Data): Promise<void> {
		this.client.logger.info('[SCHEDULE MANAGER] ADDING NEW SCHEDULE');
		const doc = new Schedule({
			type: data.type,
			guild: data.guild,
			channel: data.channel,
			message: data.message
		});
		doc.save();
	}

	public async run(): Promise<void> {
		this.hour = new Date().getHours();
		this.client.logger.info('[SCHEDULE MANAGER] RUNNING SCHEDULES');
		const schedules = await Schedule.find();
		for (const doc of schedules) {
			const image = await this.manager.getLink(doc.type as number).catch(() => {});
			try {
				const channel = this.client.channels.get(doc.channel as string) as TextChannel;
				if (channel) {
					channel.send({
						files: [{
							attachment: image,
							name: `${Util.CONSTANTS.REVERSE[doc.type as number]}.png`
						}]
					 });
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
