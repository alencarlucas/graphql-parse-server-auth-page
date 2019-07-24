import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY } from './settings';

const httpLink = new HttpLink({ uri: 'https://parseapi.back4app.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const sessionToken = localStorage.getItem('sessionToken');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "X-Parse-Application-Id": PARSE_APPLICATION_ID,
      "X-Parse-Javascript-Key": PARSE_JAVASCRIPT_KEY,
      "X-Parse-Session-Token": sessionToken || ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
