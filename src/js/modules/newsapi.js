export class NewsAPI {

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.host = 'https://newsapi.org';
        this.headers = {
            'X-Api-Key': this.apiKey
        };
    }

    _createUrl (path, params) {
        const query = Object.keys(params).map((key) => {return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])}).join('&');
        const baseURL = `${this.host}${path}`;
        return query ? `${baseURL}?${query}` : baseURL;
    }

    _apiCall(path, params) {
            return fetch(this._createUrl(path, params), {
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
        })
        .catch((error) => {
            return Promise.reject(`Ошибка ${error}`);
        });
    }

    everything (params) {
        return this._apiCall('/v2/everything', params);
    }

}

