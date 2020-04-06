export class GithubAPI {

    constructor() {
        this.host = 'https://api.github.com';
        this.headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
    }

    _apiCall(path) {
        return fetch(this.host + path , {
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

    commits(user, repo, branch, pagination) {
        const path = `/repos/${user}/${repo}/commits?sha=${branch}`;
        const query = pagination ? `${path}&page=${pagination.page}&per_page=${pagination.per_page}` : path;
        return this._apiCall(query);
        //return this._apiCall(`/repos/${user}/${repo}/commits?sha=${branch}`);
    }

}