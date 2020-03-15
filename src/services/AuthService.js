import decode from 'jwt-decode';
import { Properties } from '../config';
import axios from 'axios';

class AuthService 
{

/*----------------------------------------------------------------------------------------------------*/

	constructor(domain)
	{
		this.domain			= domain || Properties.domain;
		this.fetch			= this.fetch.bind(this);
		this.login			= this.login.bind(this);
		this.user  			= null;
	}

/*----------------------------------------------------------------------------------------------------*/

	login(matricula, password) 
	{
		return this.fetch(`${this.domain}/auth`,
			{
				method: 'POST',
				body: JSON.stringify({
					matricula: matricula, 
					password: password
				})
			}
		).then(res =>
		{
			if (!res.error) 
			{
				this.setToken(res.access_token);
				this.setRefreshToken(res.refresh_token);
				this.setUser({role: res.user_role});
				this.updateProfile(res.access_token);
			}
			
			return Promise.resolve(res);
		});
	}

/*----------------------------------------------------------------------------------------------------*/

	loggedIn() 
	{
		const token = this.getToken();
		if (!!!token) {
			return false;
		}

		if (this.isTokenExpired(token)) 
		{
			const rfToken = this.getRefreshToken();

			if(this.isTokenExpired(rfToken)) {
				this.logout();
				return false;
			}
		}
		
		return true;
	}

/*----------------------------------------------------------------------------------------------------*/

	isTokenExpired(token) 
	{
		try
		{
			const decoded = decode(token);

			if (decoded.exp < Date.now() / 1000) {
				return true;
			} 
			
			return false;

		} catch(err) {
			return false;
		}
	}

/*----------------------------------------------------------------------------------------------------*/	

	doRequest(url, method, data, headers, responseType=null)
	{
		if (this.loggedIn())
		{
			const token = this.getToken();
			
			if (this.isTokenExpired(token))
			{
				let self = this;
				return axios({
					url: `${ this.domain }/refresh`,
					method: 'GET',
					headers: {
						Authorization: self.getAuthorizationRefreshHeader(),
						...headers
					}
				}).then(res => {

					if (res.status === 200) 
					{
						console.log("token refreshed")
						self.setToken(res.data.access_token);
						
						return axios({
							url: `${ self.domain }/${url}`,
							method: method,
							responseType: responseType,
							data: data,
							headers: {
								Authorization: self.getAuthorizationHeader(),
								...headers
							}
						})
					}
				})
			} 
			else 
			{
				return axios({
					url: `${ this.domain }/${url}`,
					method: method,
					data: data,
					headers: {
						Authorization: this.getAuthorizationHeader()
					}
				})
			}
		} else {
			this.logout();
		}
	}

/*----------------------------------------------------------------------------------------------------*/

	setToken(idToken) {
		localStorage.setItem('id_token', idToken);
	}

/*----------------------------------------------------------------------------------------------------*/

	getToken() {
		return localStorage.getItem('id_token');
	}

/*----------------------------------------------------------------------------------------------------*/

	setRefreshToken(idToken) {
		localStorage.setItem('id_refresh_token', idToken);
	}

/*----------------------------------------------------------------------------------------------------*/

	getRefreshToken() {
		return localStorage.getItem('id_refresh_token');
	}

/*----------------------------------------------------------------------------------------------------*/

	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('id_refresh_token');
		localStorage.removeItem('user_profile_role');
		localStorage.removeItem('user_profile_email');
		localStorage.removeItem('user_profile_matricula');

		window.location.replace("/");
	}

/*----------------------------------------------------------------------------------------------------*/
	
	updateProfile(token) {
		fetch(`${this.domain}/me`,
			{
				method: 'GET',
				headers: {Authorization: 'Bearer ' + token}
			}
		)
			.then(res => 
			{
				res.json().then(json => {
						localStorage.setItem('user_profile_role', json.role_id);
						localStorage.setItem('user_profile_email', json.email);
						localStorage.setItem('user_profile_matricula', json.matricula);
					}
				)
			}
		)	
	}

/*----------------------------------------------------------------------------------------------------*/
	
	setUser(data) {
		this.user = data;
	}

/*----------------------------------------------------------------------------------------------------*/
	
	getUser() {
		return this.user;
	}

/*----------------------------------------------------------------------------------------------------*/

	getUserRole() 
	{
		if (this.getUser() == null) {
			return localStorage.getItem('user_profile_role');
		} 
		else {
			return this.getUser().role;
		}
	}

/*----------------------------------------------------------------------------------------------------*/

	getAuthorizationHeader() {
		return 'Bearer ' + this.getToken();
	}

/*----------------------------------------------------------------------------------------------------*/

	getAuthorizationRefreshHeader() {
		return 'Bearer ' + this.getRefreshToken();
	}

/*----------------------------------------------------------------------------------------------------*/

	fetch(url, options) 
	{	
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = this.getAuthorizationHeader();
		}

		return fetch(url, 
		{
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

/*----------------------------------------------------------------------------------------------------*/

	_checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} 
		else 
		{
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}

/*----------------------------------------------------------------------------------------------------*/

}

export default AuthService;
