import React from "react";
import { Mutation, ApolloConsumer } from 'react-apollo'
import { POST_USER, LOADING_MESSAGE } from '../App'
import { Redirect } from 'react-router'

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div >
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" onChange={e => this.setState({ username: e.target.value })} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={e => this.setState({ password: e.target.value })} />

        <Mutation
          mutation={POST_USER}
          variables={{ username, password }}
          onCompleted={(data) => {
            localStorage.setItem('sessionToken', data.users.signUp.sessionToken);
            return <Redirect to="/profile" />
          }}
          onError={console.error}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}