import { join } from 'path';
import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { Logger, createLogger, transports, format } from 'winston';
import RequestManager from './RequestManager';
import ScheduleManager from './ScheduleManager';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Schedule from '../models/Schedule';


declare module 'discord-akairo' {
	interface AkairoClient {
		logger: Logger;
		commandHandler: CommandHandler;
		config: AnimalConfiguration;
		requestManager: RequestManager;
		scheduleManager: ScheduleManager;
	}
}

interface AnimalConfiguration {
	owner?: string;
	token?: string;
	color?: string;
}

export default class AnimalClient extends AkairoClient {
	public constructor(config: AnimalConfiguration) {
		super({ ownerID: config.owner }, {
			messageCacheMaxSize: 1000,
			disabledEvents: ['TYPING_START'],
			shardCount: 'auto'
		});

		this.config = config;

		this.model = {
			schedule: Schedule
		};

		this.requestManager = new RequestManager();

		this.scheduleManager = new ScheduleManager(this);

		process.on('unhandledRejection', (err: any): Logger => this.logger.error(`[UNHANDLED REJECTION] ${err.message}`, err.stack));
	}

	public logger = createLogger({
		format: format.combine(
			format.colorize({ level: true }),
			format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
			format.printf(info => {
				const { timestamp, level, message, ...rest } = info;
				return `[${timestamp}] ${level}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
			})
		),
		transports: [
			new transports.Console({
				format: format.colorize({ level: true }),
				level: 'info'
			}),
			new DailyRotateFile({
				format: format.combine(
					format.timestamp(),
					format.json()
				),
				level: 'debug',
				filename: join(__dirname, '..', '..', '..', 'logs', 'animal-%DATE%.log'),
				maxFiles: '14d'
			})
		]
	});

	public model: Record<string, any> = {
		schedule: Schedule
	};

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, '..', 'commands'),
		prefix: 'ha?',
		aliasReplacement: /-/g,
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 3000,
		argumentDefaults: {
			prompt: {
				modifyStart: (msg: Message, str: string): string => `${msg.author}, ${str}\n\nType \`cancel\` to cancel the command.`,
				modifyRetry: (msg: Message, str: string): string => `${msg.author}, ${str}\n\nType \`cancel\` to cancel the command.`,
				timeout: 'Guess you took too long, the command has been cancelled.',
				ended: "More than 3 tries and you still didn't quite get it. The command has been cancelled",
				cancel: 'The command has been cancelled.',
				retries: 3,
				time: 30000
			},
			otherwise: ''
		}
	});

	public inhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '..', 'inhibitors') });

	public listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') });

	public config: AnimalConfiguration;

	public requestManager: RequestManager;

	public scheduleManager: ScheduleManager;

	private async load(): Promise<void> {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});
		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
		await this.scheduleManager.init();
	}

	public async launch(): Promise<string> {
		await this.load();
		return this.login(this.config.token);
	}
}
