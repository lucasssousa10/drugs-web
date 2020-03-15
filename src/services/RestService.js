import axios from 'axios';
import { Properties } from '../config';
import AuthService from './AuthService';

class RestService {

/*----------------------------------------------------------------------------------------------------*/

	constructor() {
		this.Auth = new AuthService();
	}

/*----------------------------------------------------------------------------------------------------*/

	get(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'GET', parameters, {}, null);		
	}

/*----------------------------------------------------------------------------------------------------*/

	post(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'POST', parameters, {}, null);
	}

/*----------------------------------------------------------------------------------------------------*/

	delete(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'DELETE', parameters, {}, null);
	}

	/* ----------------------------------------------------------------------------------------------------*/

	put(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'PUT', parameters, {}, null);		
	}

	/*----------------------------------------------------------------------------------------------------*/

	get2(urlBase, parameters) {

		// TODO: acabar com essa função e usar o get
		const url = `${ Properties.domain }/${ urlBase }`;

		return axios({
			method: 'GET',
			params: parameters,
			url: url,
			headers: {

			}
		});
	}

	/*----------------------------------------------------------------------------------------------------*/

	post2(urlBase, parameters) {

		// TODO: acabar com essa função e usar o post
		const url = `${ Properties.domain }/${ urlBase }`;

		return axios({
			method: 'POST',
			data: parameters,
			url: url,
			headers: {}
		});
	}

	/*----------------------------------------------------------------------------------------------------*/

	postFile(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'POST', parameters, {}, 'blob');
	}

	/*----------------------------------------------------------------------------------------------------*/

	getFile(urlBase, parameters) {
		return this.Auth.doRequest(urlBase, 'GET', parameters, {}, 'blob');
	}

	/*----------------------------------------------------------------------------------------------------*/

}

export default RestService;