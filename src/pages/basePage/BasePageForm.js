import BasePage from './BasePage';
import RestService from '../../services/RestService';
import { AlertifySuccess, AlertifyError } from '../../services/AlertifyService';

const Rest = new RestService();

class BasePageForm extends BasePage
{
	constructor(props)
	{
		super(props);
		
		if(this.props.role == null) {
			this.props.onLoadUserRole();
		}
		this.handleDynamic = this.handleDynamic.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.handleReceiveResponseRest = this.handleReceiveResponseRest.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
	}
	handleChange(e)
	{
		
		this.setState({
				[e.target.name]: e.target.value,
                fieldErrors: []
            }
		)
	}
	
	handleDynamic(items, name){

        this.setState({
            [name]: items ? items : []
        });
     }

    handleReceiveResponseRest(res)
    {
        if (res.data.error)
    	{
    		console.log(res);
    		let arrErrors = [];
    		if (res.data.errors !== undefined) {
				let arrKeys = Object.keys(res.data.errors.fields);
				for (let i = 0; i < arrKeys.length; i++) {
					arrErrors[arrKeys[i]] = res.data.errors.fields[arrKeys[i]].message;
				}

				this.setState({
					fieldErrors: arrErrors,
				});

				AlertifyError(res.data.errors.form);
			} else {
				AlertifyError([res.data]);


			}

			console.log("Log aqui:", res.data.message)
    	} else {
            AlertifySuccess([{message: res.data.message}]);
            this.props.history.push('/' + this.props.urlBase.split('/')[0] + '/list');
        }
    }

    async handleOnSubmit(e) {
		console.log("handleOnSubmit", this.state)
    	Rest.post(this.props.urlBase, this.state).then(this.handleReceiveResponseRest);
    }

    handleCancel(e) {
        this.props.history.push("/" + this.props.urlBase.split('/')[0] + '/list');
    }
}

export default BasePageForm;