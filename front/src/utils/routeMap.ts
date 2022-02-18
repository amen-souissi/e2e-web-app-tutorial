interface Object {
  [key: string]: string | number | boolean;
}

interface Routes {
  [key: string]: (args: Object) => string;
}

const routes: Routes = {
  root: () => '',
  messages: (args) => `messages/${args.channelId}`,
};

export const getQuery = (query?: Object) => {
  if (!query) return '';
  const entries = Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  });
  return `?${entries.join('&')}`;
};

export const getRoute = (name: string, args: Object = {}, query?: Object) => {
  if (!(name in routes)) {
    throw Error(`${name} is not a valid path!`);
  }
  return `/${routes[name](args)}${getQuery(query)}`;
};
