import React from 'react'
import HomePage from './HomePage.jsx'
import UserPage from './UserPage.jsx'

import {Switch, Route, Redirect, withRouter} from 'react-router-dom'

function Main () {

  return (
    <React.Fragment>
    <Switch>
    <Route path= '/home'>
      <HomePage/>
    </Route>

    <Route path= '/user'>
      <UserPage/>
    </Route>
    </Switch>
    </React.Fragment>
  )
}

export default withRouter(Main);