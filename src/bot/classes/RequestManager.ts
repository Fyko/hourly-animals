import request from 'node-fetch';
const pandas = [
	'https://i.imgur.com/VI6Vh88.png',
	'https://i.imgur.com/CE0kcjd.gif',
	'https://i.imgur.com/X6ugpw6.png',
	'https://i.imgur.com/bp0VZGh.jpg',
	'https://i.imgur.com/9OAvz8R.png',
	'https://i.imgur.com/ub9uK8u.png',
	'https://i.imgur.com/krellqc.jpg',
	'https://i.imgur.com/qplnhID.png',
	'https://i.imgur.com/XJL7pYl.png',
	'https://i.imgur.com/QYiLig7.png',
	'https://i.imgur.com/iFbJsj8.jpg',
	'https://i.imgur.com/s7WucBN.png',
	'https://i.imgur.com/j5Q7Hbo.png',
	'https://i.imgur.com/MspzpRv.png',
	'https://i.imgur.com/JB5Vvw2.png',
	'https://i.imgur.com/D1RiTsF.png',
	'https://i.imgur.com/2wQfTca.png',
	'https://i.imgur.com/hfHCmqj.png',
	'https://i.imgur.com/G54MWl1.png',
	'https://i.imgur.com/eINlZmD.png',
	'https://i.imgur.com/WRgTbTg.png',
	'https://i.imgur.com/kykYx33.png',
	'https://i.imgur.com/OXQWnND.png',
	'https://i.imgur.com/n2yfcF5.png',
	'https://i.imgur.com/FD57nPx.png',
	'https://i.imgur.com/zfxsqlk.png',
	'https://i.imgur.com/eFSkzb7.png',
	'https://i.imgur.com/fMQbx7s.png',
	'https://i.imgur.com/XAT2ldT.png',
	'https://i.imgur.com/KsXZmyv.png',
	'https://i.imgur.com/5kwSFen.png',
	'https://i.imgur.com/82z3Drs.jpg',
	'https://i.imgur.com/vS89Waw.png',
	'https://i.imgur.com/RHqQW9F.png'
];

export default class RequestManager {
	public async getLink(type: number): Promise<string | string[]> {
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
	/* eslint-disable */
	public panda(): Promise<string | string[]> {
		return new Promise((resolve, _) => {
			resolve(pandas[Math.floor(Math.random() * pandas.length)]);
		});
	}
	/* eslint-enable */

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
