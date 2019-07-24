import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css';

const LOADING_MESSAGE = "Checking your API’s health..."
const ERROR_MESSAGE = "There is something wrong with your API"
const SUCCESS_MESSAGE = "Your API is working fine"

function App() {
  return (
    <Query
      query={gql`
      query Health {
        health
      }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>{ LOADING_MESSAGE }</p>
        if (error) return <p>{ ERROR_MESSAGE }</p>
        return <p>{ data.health ? SUCCESS_MESSAGE : ERROR_MESSAGE }</p>
      }}
    </Query>
  );
}

export default App;
