export class GithubAPI {

    constructor() {
        this.host = 'https://api.github.com';
        this.headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
    }

    __apiCall(path) {
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

    commits(user, repo, branch) {
        return this.__apiCall(`/repos/${user}/${repo}/commits?sha=${branch}`);
    }

}