import superagent from 'superagent';
import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return config.api.url + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { query, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        request.query({
          api_key: config.api.token
        });

        if (query) {
          request.query(query);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }

  empty() {}
}
