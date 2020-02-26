import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, Filter, HtmlContentView} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel} from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";

import {EditorButtonsList} from '../../components/utils/Utils';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const Rest = new RestService();

const Messages = new MessageService();

class AtividadesList extends BasePageList
{
	static defaultProps = {
		urlBase: 'atividade/all',
		title: 'menu.atividade.title',
		fields: [
			{
				label: 'page.atividade.fields.id',
				field: "id",
				width: "10%"
			},
			{
				label: 'page.atividade.fields.data',
				field: "data",
				width: "10%"
			}
		]
	};

	render()
	{
		let input_fields = [{label: 'page.atividade.fields.id', field: "id"}];
        let filter = <Filter fields={input_fields} onChange={this.handleChange} onSubmit={this.handleOnSubmitFilter}
            toggle="tooltip" placement="top" titletoggle="Filtrar atividades"/>;
		return (
			<TableData filter={filter} onClickPage={ this.handleClickPage } title='page.atividade.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/atividade/add' titletoggle="Adicionar atividade" onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class AtividadesAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'atividade/add',
		title: Messages.getMessage('menu.atividade.title'),
	};

	constructor(props) {
		super(props);
        this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e)
	{
        this.setState({"conteudo": e})
	}

	render()
	{
        
		return (
			<FormPage title="page.atividade.add.title">
				<FormRow>
					<SunEditor setOptions={{
							height: 1000,
							buttonList: EditorButtonsList
						}} 
						onChange={this.handleChange}/>
                </FormRow>

                <br/>

				<FormRow>
					<ButtonSubmit text="layout.form.sign" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*--------------------------------------------------------------------------------------------------*/

class AtividadesEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	static defaultProps = {
		urlBase: 'atividade/edit',
		title: Messages.getMessage('menu.atividade.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "atividade/view/" + id, this.state).then(this.handleResponse);
	}
	
	handleChange(e) {
		this.setState({"conteudo": e})
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
		
		return (
			this.state.error ?
			( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
			<FormPage title="page.atividade.edit.title">
				<FormRow>
					<SunEditor setOptions={{
							height: 1000,
							buttonList: EditorButtonsList
						}} 
						onChange={this.handleChange}/>
                </FormRow>
				<br/>
				<FormRow>
					<ButtonSubmit text="layout.form.edit" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class AtividadesView extends BasePageForm
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
		urlBase: 'atividade/view',
		title: Messages.getMessage('menu.atividade.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "atividade/view/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<HtmlContentView title={"Atividade " + this.state.data} content={this.state.conteudo}/>)
		);
	}
}


export {AtividadesList, AtividadesAdd, AtividadesEdit, AtividadesView};