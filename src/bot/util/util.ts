import { Message, MessageEmbed, GuildMember, User } from 'discord.js';
import { stripIndents, oneLine } from 'common-tags';
const ms = require('@naval-base/ms'); // eslint-disable-line

interface Types {
    [key: number]: string;
}

const TYPES: Types =  {
    1: 'dog',
    2: 'shiba',
    3: 'cat',
    4: 'bird',
    5: 'panda',
    6: 'fox',
    7: 'duck',
}

export default {
    /* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
    CONSTANTS: {
        TYPES: {
            DOG: 1,
            SHIBA: 2,
            CAT: 3,
            BIRD: 4,
            PANDA: 5,
            FOX: 6,
            DUCK: 7,
        } as { [key: string]: number },
        LINKS: {
            DOG: 'https://dog.ceo/api/breeds/image/random',
            SHIBA: 'https://shibe.online/api/shibes',
            CAT: 'https://aws.random.cat/meow',
            BIRD: 'https://shibe.online/api/birds',
            PANDA: 'https://some-random-api.ml/img/panda',
            FOX: 'https://randomfox.ca/floof/',
            DUCK: 'https://random-d.uk/api/v1/random',
        }as { [key: string]: string },
    }

}