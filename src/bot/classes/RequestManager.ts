import request from 'node-fetch';

export default class RequestManager { 

    async getLink(type: number) {
        return [
            this.dog(),
            this.shiba(),
            this.cat(),
            this.bird(),
            this.panda(),
            this.fox(),
            this.duck(),
        ][type - 1]
    }

    async dog() {
        try {
            return request('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => json.message);
        } catch (err) {
            throw err; 
        } 
    }

    async shiba() {
        try {
            return request('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
                .then(req => req.json())
                .then(json => json[0])
        } catch (err) {
            throw err;
        }
        
    }
    
    async cat() {
        try {
            return request('http://shibe.online/api/cats?count=1&urls=true&httpsUrls=true')
                .then(req => req.json())
                .then(json => json[0]) 
        } catch (err) {
            throw err;
        }
    }

    async bird() {
        try {
            return request('http://shibe.online/api/birds?count=1&urls=true&httpsUrls=true')
            .then(req => req.json())
            .then(json => json[0]) 
        } catch (err) {
            throw err;
        }
    }

    async panda() {
        try {
            return request('https://some-random-api.ml/img/red_panda')
                .then(req => req.json())
                .then(json => json.file);
        } catch (err) {
            throw err;
        }
    }

    async fox() {
        try {
            return request('https://randomfox.ca/floof/')
                .then(req => req.json())
                .then(json => json.image);
        } catch (err) {
            throw err;
        }
    }

    async duck() {
        try {
            return request('https://random-d.uk/api/v1/random')
                .then(req => req.json())
                .then(json => json.url);
        } catch (err) {
            throw err;
        }
    }

}