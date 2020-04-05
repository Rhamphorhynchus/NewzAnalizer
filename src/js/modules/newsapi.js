//import { getMesaageByHTMLStatus } from "./../utils/html-status";
import { NETWORK_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from "./../constants/constatns";

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
        .catch((error) => {
            return Promise.reject(`${NETWORK_ERROR_MESSAGE} ${error}`);
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(this._getMesaageByHTMLCode(res.status));
        })
        .then((result) => {
            if (result.status == "ok") {
                return Promise.resolve(result);
            } else {
                return Promise.reject(this._getMessageByResponse(result));
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }

    _getMessageByStatus(result) {
        const messages = {
            "apiKeyDisabled": "Your API key has been disabled.",
            "apiKeyExhausted": "Your API key has no more requests available",
            "apiKeyInvalid": "Your API key hasn't been entered correctly. Double check it and try again",
            "apiKeyMissing": "Your API key is missing from the request. Append it to the request with one of these methods",
            "parameterInvalid": "You've included a parameter in your request which is currently not supported. Check the message property for more details",
            "parametersMissing": "Required parameters are missing from the request and it cannot be completed. Check the message property for more details",
            "rateLimited": "You have been rate limited. Back off for a while before trying the request again",
            "sourcesTooMany": "You have requested too many sources in a single request. Try splitting the request into 2 smaller requests",
            "sourceDoesNotExist": "You have requested a source which does not exist",
            "unexpectedError": "This shouldn't happen, and if it does then it's our fault, not yours. Try the request again shortly"
        }
        
        return messages[result.code] || UNKNOWN_ERROR_MESSAGE;
    }

    _getMesaageByHTMLCode(code) {
        const messages = {
            200: "OK",
            400: "Bad Request. The request was unacceptable, often due to a missing or misconfigured parameter",
            401: "Unauthorized. Your API key was missing from the request, or wasn't correct",
            429: "Too Many Requests. You made too many requests within a window of time and have been rate limited. Back off for a while",
            500: "Server Error. Something went wrong on our side"
        };

        return messages[code] || UNKNOWN_ERROR_MESSAGE;
    }

/*
    _apiCall(path, params) {
            return fetch(this._createUrl(path, params), {
            method: 'GET',
            headers: this.headers,
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(getMesaageByHTMLStatus(res.status));
        })
        .then((result) => {
            return Promise.resolve(result);
        })
        .catch((error) => {
            return Promise.reject(`${NETWORK_ERROR_MESSAGE} ${error}`);
        });
    }
*/
    everything (params) {
        return this._apiCall('/v2/everything', params);
    }
}

