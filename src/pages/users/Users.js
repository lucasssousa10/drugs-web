import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, BasicView, Filter} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup, SelectField } from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";
const Rest = new RestService();

const Messages = new MessageService();

class UsersList extends BasePageList
{
	static defaultProps = {
		urlBase: 'user/all',
		title: 'menu.user.title',
		fields: [
			{
				label: 'page.user.fields.matricula',
				field: "matricula",
				width: "10%"
			},
			{
				label: 'page.user.fields.estudante',
				field: "nome",
				width: "10%"
			}
		]
	};

	render()
	{
		let input_fields = [{label: 'page.user.fields.matricula', field: "matricula"}];
        let filter = <Filter fields={input_fields} onChange={this.handleChange} onSubmit={this.handleOnSubmitFilter}
            toggle="tooltip" placement="top" titletoggle="Filtrar usuários"/>;
		return (
			<TableData filter={filter} onClickPage={ this.handleClickPage } title='page.user.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/user/add' titletoggle="Adicionar usuário" onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class UsersAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'user/add',
		title: Messages.getMessage('menu.user.title'),
	};

	constructor(props) {
		super(props);
	    this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}


	render()
	{
        let campo1 = []
        let campo2 = []
        let campo3 = []
        if(this.state.role_id === "1" || this.state.role_id === "2"){
            campo1 = ""
            campo2 = ""
            campo3 = ""

        }else if(this.state.role_id === "3"){
            campo1 = <SelectField empty={ true } value_name="id" name="centro_estagio_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.centro_estagio' required="required" colsize="6" url="centro-estagio/all" />
            campo2 = ""
            campo3 = ""
        }else if(this.state.role_id === "4"){
            campo1 = ""
			campo2 = <SelectField empty={ true } value_name="id" name="empresa_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.empresa' required="required" colsize="6" url="empresa/all" />
            campo3 = ""
        }else if(this.state.role_id === "5"){
            campo1 = ""
			campo2 = ""
            campo3 = <SelectField empty={ true } value_name="id" name="estudante_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.estudante' required="required" colsize="6" url="estudante/all" />
        }
		return (
			<FormPage title="page.user.add.title">
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.username' required="required" colsize="6" />
					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.email' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<InputInGroup type="password" name="password" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.password' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<SelectField empty={ true } value_name="id" name="role_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.role' required="required" colsize="6" url="roles/all" />
				    {campo1}
				    {campo2}
				    {campo3}
				</FormRow>
				<FormRow>
					<ButtonSubmit text="layout.form.sign" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*--------------------------------------------------------------------------------------------------*/

class UsersEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
	}
	static defaultProps = {
		urlBase: 'user/edit',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "user/view/" + id, this.state).then(this.handleResponse);
	}
	
	handleResponse(data) {
		this.setState((
			data.data
		));
	}

	async handleOnSubmit(e) {
		Rest.edit(this.props.urlBase + "/" + this.state.id, this.state).then(this.handleReceiveResponseRest)
		console.log(this.state);
    }
	render()
	{ 

		let master_permission = false;
		if (this.props.role === "1"){
			master_permission = true;
		}
			
		let campo1 = []
        let campo2 = []
        let campo3 = []
        if(this.state.role_id === "1" || this.state.role_id === "2"){
            campo1 = ""
            campo2 = ""
            campo3 = ""

        }else if(this.state.role_id === "3" || this.state.role_id === 3){
            campo1 = <SelectField empty={ true } value_name="id" name="centro_estagio_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.centro_estagio' required="required" colsize="6" url="centro-estagio/all" value={this.state.centro_estagio_id}/>
            campo2 = ""
            campo3 = ""
        }else if(this.state.role_id === "4"|| this.state.role_id === 4){
            campo1 = ""
			campo2 = <SelectField empty={ true } value_name="id" name="empresa_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.empresa' required="required" colsize="6" url="empresa/all" value={this.state.empresa_id}/>
            campo3 = ""
        }else if(this.state.role_id === "5"|| this.state.role_id === 5){
            campo1 = ""
			campo2 = ""
            campo3 = <SelectField empty={ true } value_name="id" name="estudante_id" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.user.fields.estudante' required="required" colsize="6" url="estudante/all" value={this.state.estudante_id}/>
        }
		return (
			this.state.error ?
			( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
			<FormPage title="page.user.add.title">
				<FormRow>
					<InputInGroup type="text" name="username" errors={ this.state.fieldErrors } value={this.state.username} onChange={ this.handleChange }
						label='page.user.fields.username' required="required" colsize="6" />
					<InputInGroup type="email" name="email" errors={ this.state.fieldErrors }  value={this.state.email} onChange={ this.handleChange }
						label='page.user.fields.email' required="required" colsize="6" />
				</FormRow>

				<FormRow>
					<InputInGroup disabled={true} type="password" name="password" errors={ this.state.fieldErrors }   onChange={ this.handleChange }
						label='page.user.fields.password' required="required" colsize="6" />
				</FormRow>

				{master_permission ? 
				<FormRow>
					<SelectField disabled={!master_permission} empty={ true } value_name="id" name="role_id" errors={ this.state.fieldErrors }  value={this.state.role_id} onChange={ this.handleChange }
						label='page.user.fields.role' required="required" colsize="6" url="roles/all" />
					{campo1}
					{campo2}
					{campo3}
				</FormRow>
				:''}
				
				<FormRow>
					<ButtonSubmit text="layout.form.edit" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class UsersView extends BasePageForm
{

	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
	}
	onClickEdit(event) {
		console.log(event.target);
		let url = "edit";
		let id = this.state.id;
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}
	static defaultProps = {
		urlBase: 'user/view',
		title: Messages.getMessage('menu.user.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "user/view/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		let fields = [{label:"Username: ", value:this.state.username},
		{label:"Email: ", value:this.state.email},
		{label:"Tipo de usuário: ", value:this.state.role_nome},
		this.state.role_id === 2 ? {label:"Empresa: ", value:this.state.empresa_nome} : ''
		]
		
		//{label:"Centro de estágio: ", value:this.state.centro_estagio_nome},
		
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<BasicView title={"Usuário " + this.state.username} url={"#user/edit?id=" + this.state.id} fields={fields} onClickEdit={this.onClickEdit}/>)
		);
	}
}


export { UsersList, UsersAdd , UsersEdit,  UsersView};     