import React from 'react';
import BasePageList from '../basePage/BasePageList';
import BasePageForm from '../basePage/BasePageForm';
import MessageService from '../../services/MessageService';
import {TableData, FormPage, FormRow, BasicViewWithDetails} from '../../components/template/Layout';
import { ButtonSubmit, ButtonCancel, InputInGroup } from '../../components/template/Form';
import {Redirect} from "react-router-dom";
import RestService from "../../services/RestService";
import { Icons } from '../../iconSet';
import { AlertifyConfirmDelete, AlertifyError, AlertifySuccess } from '../../services/AlertifyService';
const Rest = new RestService();

const Messages = new MessageService();

class QuestionariosList extends BasePageList {
    static defaultProps = {
		urlBase: 'questionario/all',
		title: 'menu.questionario.title',
		fields: [
			{
				label: 'page.questionario.fields.id',
				field: "id",
				width: "10%"
			},
			{
				label: 'page.questionario.fields.titulo',
				field: "titulo",
				width: "10%"
            },
            {
				label: 'page.questionario.fields.criador',
				field: "criador",
				width: "10%"
            },
            {
				label: 'page.questionario.fields.data',
				field: "data",
				width: "10%"
			}
		]
	};
	
	constructor(props) {
		super(props);
		this.actionAddQuestion = this.actionAddQuestion.bind(this);
	}

	actionAddQuestion(event, id) {
		let url = "/" + this.props.urlBase.split("/")[0] + "/addquestion";
		this.props.history.push({
			pathname: url,
			state: {item_id: id}
		});
	}

	render()
	{
		// add other action
		let actions = this.state.actions
		
		if (actions !== undefined) {
			actions = actions.concat({
				label: 'action.addquestion',
				field: "question",
				handle: this.actionAddQuestion
			})
		}
	
		return (
			<TableData onClickPage={ this.handleClickPage } title='page.questionario.list.title'
				fields={ this.props.fields } data={ this.state.itens } pagination={ this.state.pagination }
				actions={ actions } addUrl='/questionario/add' titletoggle={Messages.getMessage("menu.questionario.title")} onEdit={ this.handleOnEditAction }
				onDelete={ this.handleOnDeleteAction } onView={ this.handleOnViewAction }/>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class QuestionariosAdd extends BasePageForm
{
	static defaultProps = {
		urlBase: 'questionario/add',
		title: Messages.getMessage('menu.questionario.title'),
    };
    
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
	}

    componentDidMount() {
        Rest.view("me").then(this.handleResponse)
	}
	
	handleResponse(res) {
		this.setState({"criador": res.data.matricula})
	}

    handleChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}

	render()
	{
        
		return (
			<FormPage title="page.questionario.add.title">
				<FormRow>
					<InputInGroup type="text" name="criador" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.criador' required="required" colsize="2" value={this.state.criador || ''}  readOnly={true}/>
				</FormRow>
                
                <FormRow>
					<InputInGroup type="text" name="titulo" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.titulo' required="required" colsize="6" />
                    
                    <InputInGroup type="date" name="data" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.data' required="required" colsize="2" />
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

class QuestionariosEdit extends BasePageForm
{
	constructor(props) {
		super(props);

		this.handleResponse = this.handleResponse.bind(this);
	}
	static defaultProps = {
		urlBase: 'questionario/edit',
		title: Messages.getMessage('menu.questionario.title')
	};

	componentDidMount(){
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "questionario/view/" + id, this.state).then(this.handleResponse);
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
			<FormPage title="page.questionario.add.title">
				<FormRow>
					<InputInGroup type="text" name="criador" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.criador' required="required" colsize="2" value={this.state.criador || ''}  readOnly={true}/>
				</FormRow>
                
                <FormRow>
					<InputInGroup type="text" name="titulo" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.titulo' required="required" colsize="6" value={ this.state.titulo || '' } />
                    
                    <InputInGroup type="date" name="data" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
						label='page.questionario.fields.data' required="required" colsize="2" value={ this.state.data || '' } />
				</FormRow>
				
				
				<FormRow>
					<ButtonSubmit text="layout.form.sign" onClick={ this.handleOnSubmit } />
					<ButtonCancel text="layout.form.cancel" onClick={ this.handleCancel } />
				</FormRow>
			</FormPage>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class QuestionariosView extends BasePageForm
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
		urlBase: 'questionario/view',
		title: Messages.getMessage('menu.questionario.title')
	};

	componentDidMount() {
		if (this.props.location.state === undefined){
			this.setState(({error:true}));
			return;
		}
		let id = this.props.location.state.item_id;
		Rest.view( "questionario/view/" + id, this.state).then(this.handleResponse);
	}

	handleResponse(data) {
		this.setState((
			data.data
		));
	}
	render()
	{
		let fields = [
			{label:"Id: ", value:this.state.id},
			{label:"Título: ", value:this.state.titulo},
			{label:"Criador: ", value:this.state.criador},
			{label:"Data: ", value:this.state.data}
		]
		let details_labels = ["page.pergunta.fields.id", "page.pergunta.fields.pergunta"];
		return (
			this.state.error ?
				( <Redirect to={{ pathname: "/login", state: { from: this.props.location } }}/> ) :
				(<BasicViewWithDetails labels_details={details_labels} title={this.state.titulo} title_details={Messages.getMessage("menu.pergunta.title")} data_details={this.state.perguntas} url={"#questionario/edit?id=" + this.state.id} fields={fields} onClickEdit={this.onClickEdit}/>)
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class QuestionariosAddQuestion extends BasePageForm {
	
	constructor(props) {
		super(props);
		this.handleResponse = this.handleResponse.bind(this);
		this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
		this.handleAddBtn = this.handleAddBtn.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleResponseAdd = this.handleResponseAdd.bind(this);
		this.handleResponseDelete = this.handleResponseDelete.bind(this);
	}
	componentDidMount() {
		if (this.props.history.location.state !== undefined)
			Rest.view( "questionario/view/" + this.props.history.location.state.item_id, this.state).then(this.handleResponse);
	}

	handleResponse(res) {
		this.setState(res.data)
	}
	
	handleAddBtn(e) {
		Rest.post("pergunta/add", {
			"descricao": this.state.descricao,
			"questionario_id": this.state.id
		}).then(this.handleResponseAdd)
	}

	handleResponseAdd(res) {
		if(!res.data.error) {
			this.setState({
				"perguntas": this.state.perguntas.concat([res.data.data])
			});
			
			return AlertifySuccess([{message: res.data.message}])
		}
	}

	handleChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}

	handleResponseDelete(res)
	{
		if (!res.data.error) {
			let perguntas = this.state.perguntas
			
			for(let i = 0; i < perguntas.length; i++) {
				if(perguntas[i].id === eval(res.data.data.id)) {
					perguntas.splice(i, 1);
					break;
				}
			}
			
			this.setState({perguntas: perguntas});
			AlertifySuccess([{message: res.data.message}])
		} else {
			AlertifyError([{message: res.data.message}])
		}
	}

	handleDeleteBtn(id) {
		Rest.delete("pergunta/delete/" + id).then(this.handleResponseDelete);
	}

	render()
	{
		let perguntas = "";
		let i = 0;
		if (this.state.perguntas) {
			perguntas = this.state.perguntas.map((fld) => {
				return (
					<tr key={i++}>
						<td>{fld.id}</td>
						<td>{fld.descricao}</td>
						<td><button question_id={fld.id} onClick={() => this.handleDeleteBtn(fld.id)} className="btn btn-danger"><i className={ Icons.delete }></i></button></td>
					</tr>
				)
			})
		}

		return (
			<div className="card">
				<div className="card-header"><i className={ Icons.table } />{Messages.getMessage("page.pergunta.add.title")}</div>
				<div className="card-body">
					<FormRow>
						<InputInGroup type="text" name="descricao" errors={ this.state.fieldErrors }  onChange={ this.handleChange }
							label='page.pergunta.fields.pergunta' required="required" colsize="6" />
					</FormRow>
					<FormRow>
						<button onClick={this.handleAddBtn} className="btn btn-primary"><i className={ Icons.plus }></i></button>
					</FormRow>
					
					<br/>
					<table className="table">
						<tbody>
							{ perguntas }
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}


export {QuestionariosList, QuestionariosAdd, QuestionariosEdit, QuestionariosView, QuestionariosAddQuestion}