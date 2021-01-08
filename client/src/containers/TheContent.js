import React, { Suspense } from 'react'
// import DefaultLayout from './defaultLayout';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { connect } from 'react-redux'
// routes config
import routes from '../routes'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const TheContent = (props) => {
  const {isLoggedIn} = props;
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {isLoggedIn && routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/login" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}
const mapStateToProps=(state) => ({
  isLoggedIn:state.auth.isLoggedIn
});
export default connect(mapStateToProps)(React.memo(TheContent))

