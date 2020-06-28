import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import { CenterCard, FormRow } from '../../components/template/Layout';
import { InputInGroup, RememberMeInGroup, ButtonSubmit } from '../../components/template/Form';
import { AlertifySuccess } from '../../services/AlertifyService';
import MessageService from '../../services/MessageService';
import alertify from 'alertifyjs';
import logo from '../../img/logo.png';
import './Login.css';

const Message = new MessageService();

class Login extends Component
{

	constructor()
	{
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Auth = new AuthService();
		this.state = {
			fieldErrors: {username: null, password: null},
			formErrors: []
		};
	}

	render()
	{
		return (
			<CenterCard title='page.user.login.title'>
				<form onSubmit={ this.handleSubmit }>
					<img src={ logo } className="login-logo" />
					<h3 className="follow-logo">Follow Life</h3>
					<hr />
					<InputInGroup type="text" name="matricula" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.login.matricula' required="required" autofocus="autofocus"/>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors} onChange={ this.handleChange }
						label='page.user.login.password' required="required" />
					<hr />
					    <div className="col-12 mb-2">
					        <ButtonSubmit type="submit" className="btn-block button-login" text='page.user.login.submit' />
					    </div>
				</form>
			</CenterCard>
		);
	}

	handleChange(e)
	{
        this.setState({
                [e.target.name]: e.target.value
            }
        )
    }

    handleErrorLogin(errors)
    {
    	this.setState({
    		fieldErrors: {
    			username: errors.fields.username,
    			password: errors.fields.password
    		},
    		formErrors: errors.form
    	});
		alertify.error(errors.form[0].message);
	
	}
	

    handleSubmit(e)
    {
    	e.preventDefault();
    	this.Auth.login(this.state.matricula, this.state.password)
    		.then(res => {
    			if (res.error)
    			{
    				this.handleErrorLogin(res.errors);
    			} else {
					AlertifySuccess([{message: Message.getMessage('page.user.login.success')}]);
					this.props.history.push('/');
    			}
    		})
    		.catch(err=> {
    			alert(err);
    		})
    }

    componentWillMount()
    {
    	if(this.Auth.loggedIn()) {
    		this.props.history.push('/');
    	}
    }

}

export default Login;