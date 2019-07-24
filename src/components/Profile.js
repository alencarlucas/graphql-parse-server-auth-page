import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router'
import { LOADING_MESSAGE, ERROR_MESSAGE } from '../App'

const GET_USER = gql`
  query Me {
    users {
      me {
        username
      }
    }
  }`

export default class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: ''
    }
  }

  render() {
    return (
      <Query
        query={GET_USER}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>{LOADING_MESSAGE}</p>
          if (error) return <Redirect to="/signup" />

          const username = data.users.me.username
          return username ? <p>Welcome, { username } !</p> : <Redirect to="/signup" />
        }}
      </Query>
    );
  }
}
