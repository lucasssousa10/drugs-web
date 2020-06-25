import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthService from './services/AuthService';
import MasterLayout from './components/masterLayout/MasterLayout'

import Home from './pages/home/Home';
import About from './pages/about/About';
import {UsersList ,UsersAdd ,UsersEdit, UsersView} from './pages/users/Users';
import {InformativosList, InformativosAdd, InformativosEdit, InformativosView} from './pages/informativos/Informativos';
import {AtividadesList, AtividadesAdd, AtividadesEdit, AtividadesView} from './pages/atividades/Atividades';
import {QuestionariosList, QuestionariosAdd, QuestionariosEdit, QuestionariosView, QuestionariosAddQuestion, QuestionariosAnswers} from './pages/questionario/Questionario';
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

							<PrivateRoute path="/informativo/list" component={ (privateRouteProps) => (<InformativosList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/informativo/add" component={ (privateRouteProps) => (<InformativosAdd {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/informativo/edit" component={ (privateRouteProps) => (<InformativosEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/informativo/view" component={ (privateRouteProps) => (<InformativosView {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/atividade/list" component={ (privateRouteProps) => (<AtividadesList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/atividade/add" component={ (privateRouteProps) => (<AtividadesAdd {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/atividade/edit" component={ (privateRouteProps) => (<AtividadesEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/atividade/view" component={ (privateRouteProps) => (<AtividadesView {...privateRouteProps} {...props} />)} />

							<PrivateRoute path="/questionario/list" component={ (privateRouteProps) => (<QuestionariosList {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/questionario/add" component={ (privateRouteProps) => (<QuestionariosAdd {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/questionario/edit" component={ (privateRouteProps) => (<QuestionariosEdit {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/questionario/view" component={ (privateRouteProps) => (<QuestionariosView {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/questionario/addquestion" component={ (privateRouteProps) => (<QuestionariosAddQuestion {...privateRouteProps} {...props} />)} />
							<PrivateRoute path="/questionario/answers" component={ (privateRouteProps) => (<QuestionariosAnswers {...privateRouteProps} {...props} />)} />
							
							<Route path="/login" component={ Login } />
						</Switch>
				}
				
			</MasterLayout>
		</Router>
	);
}

/*----------------------------------------------------------------------------------------------------*/

export default Routes;