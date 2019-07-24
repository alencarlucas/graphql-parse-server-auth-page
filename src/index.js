import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = new HttpLink({ uri: 'https://parseapi.back4app.com/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const session_token = localStorage.getItem('session_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "X-Parse-Application-Id": process.env.REACT_APP_PARSE_APPLICATION_ID,
      "X-Parse-Javascript-Key": process.env.REACT_APP_PARSE_JAVASCRIPT_KEY,
      "X-Parse-Session-Token": session_token
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
