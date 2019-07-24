import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Profile from './Profile'
import SignUp from './SignUp';

const Home = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Profile}/>
      <Route path='/signup' component={SignUp}/>
    </Switch>
  </main>
)

export default Home
