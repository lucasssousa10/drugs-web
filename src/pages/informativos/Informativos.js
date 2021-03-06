import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, Filter, HtmlContentView} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup} from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";

import {EditorButtonsList} from '../../components/utils/Utils';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const Rest = new RestService();
const Messages = new MessageService();

class InformativosList extends BasePageList
{
	static defaultProps = {
		urlBase: 'informativo/all',
		title: 'menu.informativo.title',
		fields: [
			{
				label: 'page.informativo.fields.id',
				field: "id",
				width: "10%"
			},
			{
				label: 'page.informativo.fields.titulo',
				field: "titulo",
				width: "30%"
			},
			{
				label: 'page.informativo.fields.data',
				field: "data",
				width: "10%"
			}
		]
	};

	render()
	{
		let input_fields = [{label: 'page.informativo.fields.id', field: "id"}];
        let filter = <Filter fields={input_fields} onChange={this.handleChange} onSubmit={this.handleOnSubmitFilter}
            toggle="tooltip" placement="top" titletoggle="Filtrar informativos"/>;
		return (
			<TableData filter={filter} onClickPage={ this.handleClickPage } title='page.informativo.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ this.state.actions } addUrl='/informativo/add' titletoggle="Adicionar informativo" onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}

}

/*----------------------------------------------------------------------------------------------------*/

class InformativosAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'informativo/add',
		title: Messages.getMessage('menu.informativo.title'),
	};

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
	}

    handleChange(e)
	{
		this.setState({"conteudo": e})
	}

	handleChangeTitle(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}

	render()
	{
		return (
			<FormPage title="page.informativo.add.title">
				<FormRow>
					<InputInGroup type="text" name="titulo" errors={ this.state.fieldErrors }  onChange={ this.handleChangeTitle }
						label='page.atividade.fields.titulo' required="required" colsize="6" />
				</FormRow>
				<FormRow>
					<SunEditor setOptions={{
							height: 1000,
							buttonList: EditorButtonsList,
							videoWidth : '80%',
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

class InformativosEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
	}
	static defaultProps = {
		urlBase: 'informativo/edit',
		title: Messages.getMessage('menu.informativo.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "informativo/view/" + id, this.state).then(this.handleResponse);
	}
	
	handleChange(e) {
		this.setState({"conteudo": e})
	}

	handleChangeTitle(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}

	async handleOnSubmit(e) {
		Rest.put(this.props.urlBase + "/" + this.state.id, this.state).then(this.handleReceiveResponseRest)
		console.log(this.state);
    }
	render()
	{ 
		
		return (
			this.state.error ?
			( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
			<FormPage title="page.informativo.edit.title">
				<FormRow>
					<InputInGroup type="text" name="titulo" errors={ this.state.fieldErrors }  onChange={ this.handleChangeTitle }
						label='page.atividade.fields.titulo' required="required" colsize="6" value={ this.state.titulo || "" } />
				</FormRow>
				<FormRow>
					<SunEditor setOptions={{
							height: 1000,
							buttonList: EditorButtonsList,
							videoWidth : '80%',
						}}
						setContents={this.state.conteudo}
						onChange={this.handleChange} />
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

class InformativosView extends BasePageForm
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
		urlBase: 'informativo/view',
		title: Messages.getMessage('menu.informativo.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.get( "informativo/view/" + id, this.state).then(this.handleResponse);
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
				(<HtmlContentView title={"Informativo " + this.state.titulo} content={this.state.conteudo}/>)
		);
	}
}


export {InformativosList, InformativosAdd, InformativosEdit, InformativosView};