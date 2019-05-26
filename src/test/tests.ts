import RequestManager from '../bot/classes/RequestManager';

(async () => {
    const it = new RequestManager();
    return console.log(await it.getLink(6))
})()