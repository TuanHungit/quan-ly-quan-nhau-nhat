import React, { Fragment } from 'react'
import {Route, Switch,Redirect } from 'react-router-dom';
import routes from './../routes';
import { connect } from 'react-redux'
const DefaultLayout = (props) => {
  const {isLoggedIn} = props;
    return (
      <Fragment>
        <Switch>
          {!isLoggedIn?<Redirect to="/login"/>:(
              routes.map((route,idx)=>{
                return route.component?(
                  <Route key={idx} path={route.path} exact={route.exact}
                  name={route.name} component={route.component}/>
                ):null;
              })
          )}
        </Switch>
      </Fragment>
    );
};
const mapStateToProps=(state) => ({
  isLoggedIn:state.auth.isLoggedIn
});
export default connect(mapStateToProps)(DefaultLayout)
