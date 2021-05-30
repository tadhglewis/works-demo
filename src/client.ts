import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ networkError, response, graphQLErrors }) => {
  // Handle errors (log to Sentry)
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_ENDPOINT,
  cache: new InMemoryCache(),
  link: errorLink,
});

export default client;
