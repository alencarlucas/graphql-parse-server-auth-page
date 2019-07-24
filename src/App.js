import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { BrowserRouter } from 'react-router-dom'

import Home from './components/Home'

export const LOADING_MESSAGE = "Checking your API’s health..."
export const ERROR_MESSAGE = "There is something wrong with your API"
export const SUCCESS_MESSAGE = "Your API is working fine"

export const GET_HEALTH = gql`
  query Health {
    health
  }`

export const POST_USER = (gql`
  mutation SignUp($username: String! $password: String!) {
    users {
      signUp(fields: {
        username: $username
        password: $password
      }) {
        sessionToken
      }
    }
  }`
)


function App() {
  return (
    <BrowserRouter>
      <Query
        query={GET_HEALTH}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>{LOADING_MESSAGE}</p>
          if (error) return <p>{ERROR_MESSAGE}</p>
          return data.health ? <Home /> : <p>{ERROR_MESSAGE}</p>
        }}
      </Query>
    </BrowserRouter>
  );
}

export default App;
