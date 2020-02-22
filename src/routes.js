import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthService from './services/AuthService';
import MasterLayout from './components/masterLayout/MasterLayout'

import Home from './pages/home/Home';
import About from './pages/about/About';
import {UsersList ,UsersAdd ,UsersEdit, UsersView} from './pages/users/Users';
import Login from './pages/login/Login'

const Auth = new AuthService();

/*----------------------------------------------------------------------------------------------------*/

function PrivateRoute({ component: Component, ...rest }) 
{
	return (
		<Route {...rest} render=
			{	
				props =>
					Auth.loggedIn() ?
					( <Component {...props} /> ) :
					( <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> )
			}
		/>
	);
}

/*----------------------------------------------------------------------------------------------------*/

function Routes() 
{
	return (
		<Router>
			<MasterLayout>
				{
					props =>
						<Switch>
							<PrivateRoute exact path="/" component={ (privateRouteProps) => (<Home {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/about" component={ (privateRouteProps) => (<About {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/list" component={ (privateRouteProps) => (<UsersList {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/add" component={ (privateRouteProps) => (<UsersAdd {...privateRouteProps} {...props} />) } />
							<PrivateRoute path="/user/edit" component={ (privateRouteProps) => (<UsersEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/user/view" component={ (privateRouteProps) => (<UsersView {...privateRouteProps} {...props} />)} />

							<Route path="/login" component={ Login } />
						</Switch>
				}
				
			</MasterLayout>
		</Router>
	);
}

/*----------------------------------------------------------------------------------------------------*/

export default Routes;