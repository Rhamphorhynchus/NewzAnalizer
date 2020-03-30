export class NewsAPI {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.host = 'https://newsapi.org';
        this.headers = {
            'X-Api-Key': this.apiKey
        };
    }

    __createUrl (path, params) {
        const query = Object.keys(params).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])}).join('&');
        const baseURL = `${this.host}${path}`;
        return query ? `${baseURL}?${query}` : baseURL;
    }

    __apiCall(path, params) {
        //return fetch(__createUrl(path, params), {
            return fetch(this.__createUrl(path, params), {
            method: 'GET',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((result) => {
            return Promise.resolve(result);
        });
    }

    everything (params) {
        return this.__apiCall('/v2/everything', params);
    }

}

