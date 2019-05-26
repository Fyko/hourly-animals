export default {
	/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
	CONSTANTS: {
		TYPES: {
			dog: 1,
			shiba: 2,
			cat: 3,
			bird: 4,
			panda: 5,
			fox: 6,
			duck: 7
		} as { [key: string]: number },
		LINKS: {
			DOG: 'https://dog.ceo/api/breeds/image/random',
			SHIBA: 'https://shibe.online/api/shibes',
			CAT: 'https://aws.random.cat/meow',
			BIRD: 'https://shibe.online/api/birds',
			PANDA: 'https://some-random-api.ml/img/panda',
			FOX: 'https://randomfox.ca/floof/',
			DUCK: 'https://random-d.uk/api/v1/random'
		}as { [key: string]: string }
	}

};
