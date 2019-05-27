import request from 'node-fetch';

export default class RequestManager {
	public async getLink(type: number): Promise<string> {
		return [
			this.dog(),
			this.shiba(),
			this.cat(),
			this.bird(),
			this.panda(),
			this.fox(),
			this.duck()
		][type - 1];
	}

	public async dog(): Promise<string> {
		try {
			const req = await request('https://dog.ceo/api/breeds/image/random');
			const body = await req.json();
			return body.message as string;
		} catch (err) {
			throw err;
		}
	}

	public async shiba(): Promise<string> {
		try {
			const req = await request('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true');
			const body = await req.json();
			return body[0] as string;
		} catch (err) {
			throw err;
		}
	}

	public async cat(): Promise<string> {
		try {
			const req = await request('http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true');
			const body = await req.json();
			return body[0] as string;
		} catch (err) {
			throw err;
		}
	}

	public async bird(): Promise<string> {
		try {
			const req = await request('http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true');
			const body = await req.json();
			return body[0] as string;
		} catch (err) {
			throw err;
		}
	}

	public panda(): string {
		const pandas = require('../assets/json/pandas');
		return pandas[Math.floor(Math.random() * pandas.lengh)];
	}

	public async fox(): Promise<string> {
		try {
			const req = await request('https://randomfox.ca/floof/');
			const body = await req.json();
			return body.image as string;
		} catch (err) {
			throw err;
		}
	}

	public async duck(): Promise<string> {
		try {
			const req = await request('https://random-d.uk/api/v1/random');
			const body = await req.json();
			return body.url as string;
		} catch (err) {
			throw err;
		}
	}
}
