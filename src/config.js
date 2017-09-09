require('babel-polyfill');

module.exports = {
  app: {
    title: 'Arena Game Admin',
    description: 'Arena Game Admin.',
    head: {
      titleTemplate: 'Arena Game Admin: %s',
    }
  },
  api: {
    url: 'https://api.themoviedb.org/3',
    token: 'cd07a9bd50b1bb42e1e5a692618bb03f'
  }
};
