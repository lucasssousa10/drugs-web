import React, { Component } from 'react';
import MessageService from '../../services/MessageService';
import RestService from '../../services/RestService';
import { FormRow, FormCol } from './Layout';
import { Icons } from '../../iconSet';
import {Tooltip} from '@material-ui/core';

import './Form.css';

const Messages = new MessageService();
const Rest = new RestService();

/*----------------------------------------------------------------------------------------------------*/

class InputInGroup extends Component 
{		
	render() 
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
		    classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}
		
		return (
			<div className= {"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input type={ this.props.type } className={ classValue } id={ this.props.name }  name={ this.props.name }
					required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }
					maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.props.onBlur === true? this.props.onChange : undefined} readOnly={this.props.readOnly}/>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class RememberMeInGroup extends Component 
{	
	render() 
	{	
		return (
			<div className="form-group">
				<div className="checkbox">
					<label>
						<input type="checkbox" value="remember-me" /> { Messages.getMessage(this.props.text) }
					</label>
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonSubmit extends Component 
{
	render() 
	{
		return (
			<input className='btn btn-primary button-form' value={ Messages.getMessage(this.props.text) } type="submit"
				onClick={ this.props.onClick } />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ButtonCancel extends Component 
{	
	render() 
	{
		return (
			<input className='btn btn-danger button-form' value={ Messages.getMessage(this.props.text) } type="submit" 
				onClick={ this.props.onClick } />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class ButtonFilter extends Component
{
	render()
	{
		return(
		<div className={"form-group col-auto" }>	
		<Tooltip title="Filtrar Estudantes" placement="top" arrow>
			<button type="submit" className="btn btn-success mt-0" onClick={this.props.onClick}><i className={"fas fa-filter"}/></button>
		
		</Tooltip>
		</div>	
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

class SelectField extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []

		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens,
			});
		}
	}

	componentDidMount()
	{

		this._isMounted = true;
		this._isMounted && !this.props.options && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);


	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	concatenarValues(data) {
		let value = "";
		let keys = [
			data.centro_estagio_nome,
			data.empresa_nome,
			data.inicio,
			data.fim,
			data.contrato_empresa_nome,
			data.quantidade_vagas,
			data.curso_nome,
			data.conhecimento_especifico

		];
		for (var i=0;i < keys.length ;i++){
			if(keys[i] !== undefined) {
				value =  value.concat(keys[i]);
				if(i!== keys.length - 1 && keys[i+1]!== undefined){
					value = value.concat(' - ');
					
				}	
			}
			
		}

		return String(value);
	}

	render()
	{
		let classValue;
		let key;
		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;

		
		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
			 {data.nome_fantasia} {data.escola} { data.nome || data.nome_fantasia ? data.nome : this.concatenarValues(data) }   </option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled}
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}



/*----------------------------------------------------------------------------------------------------*/
class DataList extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []
		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		this._isMounted && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
	}

	componentWillUnmount() {
		this._isMounted = false;
		
	}

	render()
	{
		let classValue;
		let key;
		

		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}
		
		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid custom-select";
		}
		else {
			classValue = "custom-select";
		}

		key=1;

		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>{data.nome}</option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<input list={this.props.name} className={classValue} placeholder={this.props.placeholder}/>
				<datalist id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled}
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</datalist>

				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
	
	

	
}
/*----------------------------------------------------------------------------------------------------*/
 class SelectGender extends Component
 {
	
	render()
	 {
		 let classValue;

		 if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}
		 return(
		    <div className={"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
                <label>{Messages.getMessage(this.props.label)}</label>
				<select id={ this.props.name }  name={ this.props.name } className={classValue} onChange={ this.props.onChange } defaultValue={'DEFAULT'} 
					autoFocus={ this.props.autofocus } value={this.props.value}>
					<option value="" disable="true" ></option>
					<option value="F">Feminino</option>
					<option value="M">Masculino</option>
				</select>
				
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
				
			</div>
		 );

	 }
	 
 }

/*----------------------------------------------------------------------------------------------------*/
class SelectConduction extends Component
{
	render()
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
		   classValue = "is-invalid form-control";
	   }
	   else {
		   classValue = "form-control";
	   }
		return(
			<div className={"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
                <label>{Messages.getMessage(this.props.label)}</label>
				<select  className={classValue} name={this.props.name} onChange={ this.props.onChange } defaultValue={'DEFAULT'}
					autoFocus={ this.props.autofocus } value={this.props.value}>
					<option value="" disable="true" ></option>
					<option value={true}>Sim</option>
					<option value={false}>Não</option>
				</select>
					
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>

			</div>
			
		);
	}

}
/*----------------------------------------------------------------------------------------------------*/
class SelectLicenseStatus extends Component
{
	render()
	{
		let classValue;


		if (this.props.errors[this.props.name]) {
		   classValue = "is-invalid form-control";
	   }
	   else {
		   classValue = "form-control";
	   }
		return(
			<div className={"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
                <label>{Messages.getMessage(this.props.label)}</label>
				<select id={ this.props.name }  name={ this.props.name } className={classValue} onChange={ this.props.onChange } defaultValue={'DEFAULT'}
					autoFocus={ this.props.autofocus } value={this.props.value}>
					<option value="" disable="true" ></option>
				    <option value={true}>Sim</option>
				    <option value={false}>Não</option>
				</select>
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicButton extends Component{
	constructor(props){
		super(props);
		this.itemID =0;
		this.state = {
			items: [ 
			],
			Body :"",
			BodyID : "",
			id : "",
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: [],
			auxOptions: []
		}
		if(this.props.removeInput){
			this.state.Body = 0;
		}
		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		if(this.props.options){
			this.setState({options: this.props.options})

		}else{
			this._isMounted && Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
		}
		
		this.props.onChange();
	}

	componentWillUnmount() {
		this._isMounted = false;
		
	}


	deleteEvent = (index)=> {
		const aux = Object.assign([], this.state.items);
		aux.splice(index, 1);
		this.setState({
			items: aux
		})
		this.props.onChange(aux);
	}

	setItem = (element)=>{
		this.setState({
			Body : element.target.value
		})
	}
	setItem2 = (element)=>{
		this.setState({
			BodyID : element.target.value
		})
	}
	
	addItem = ()=>{
		if (!(this.state.BodyID === "" || this.state.Body === "")){
			this.itemID = this.itemID + 1;
			const aux = Object.assign([], this.state.items);
			
			aux.push({
					id : this.itemID,
					body: this.state.Body,
					bodyID : this.state.BodyID
				}
			);

			this.setState({
				items : aux
			});
			this.props.onChange(aux);

		}
		
	}
	concatenarValues(data) {
		let value = "";
		let keys = [
			data.estudante_nome,
			data.estudante_curso,
			data.estudante_escola,
			data.estudante_periodo

		];
		for (var i=0;i < keys.length ;i++){
			if(keys[i] !== undefined) {
				value =  value.concat(keys[i]);
				if(i!== keys.length - 1 && keys[i+1]!== undefined){
					value = value.concat(' - ');
					
				}	
			}
			
		}

		return String(value);
	}


	render()
	{
		let key = 1;	
		

		let options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
				{data.nome ? data.nome : this.concatenarValues(data)} </option>
			);


		if(this.props.flag === true && this.props.options !== undefined){

			let optionsTest = []	
			key = 1;
			for(let i = 0; i < this.props.options.length ; i++){
				optionsTest.push(
					<option key={key++} value={this.props.options[i].estudante_id}>{this.props.options[i].estudante_nome}</option>);
			}	
			options = optionsTest;
		}
		
		const optionsAux = options;

		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		const auxOptions = []
		for(let i = 0; i < key-1; i++){
			auxOptions[optionsAux[i].props.value] = i
		}	
		return(
             <div className="card mb-2">
                <h6 className="card-header dynamic"><b>{this.props.label}</b></h6>
                <div className="card-body">
                <FormRow>

                    <div className="col-5">
                        <select className={ "form-control mr-2" } id={ this.props.name}  name="BodyID" disabled={this.props.disabled}
                                required={ this.props.required } autoFocus={ this.props.autofocus } onChange={ this.setItem2 }>
                            {  <option value=""/> }
                            { options }
                        </select>

                        
                    </div>

                    {this.props.removeInput? '' :
					<div className="col-5">
                        <input type={ this.props.type }  className={"form-control mr-2 "+this.props.class} id={ this.props.name}  name="Body"
                            required={ this.props.required } disabled={this.props.disabled} placeholder={this.props.placeholder} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
                    </div>
					}
                    <FormCol>
						<Tooltip title="Adicionar item" placement="top" arrow>
							<button className='btn btn-primary button-form' onClick={this.addItem}> <i className={ Icons.plus }></i> </button>
						</Tooltip>
                    </FormCol>
					{this.props.removeFilter? '' :
					<FormCol>
						<ButtonFilter  className="button-form" onClick={this.props.onClick} />
					</FormCol>
					}
                </FormRow>

                {this.state.items.length === 0 ? '' :
                <table className="table">
                  <thead>
                    <tr>	
                      <th scope="col">Nome</th>
                      <th scope="col">Deletar</th>
                    </tr>
                  </thead>
                    {
                        this.state.items.map((item, index) =>{
                            return(
                                <Item removeInput={this.props.removeInput}
									key = {item.id}
                                    id = {item.id}
                                    body={item.body}
                                    bodyID={item.bodyID}
                                    bodyName={optionsAux[auxOptions[item.bodyID]]}
                                    delete={this.deleteEvent.bind(this, index)}
                                />
                            )
                        })
                    }
                   </table>
                }

                </div>
            </div>
		);
	}
}
/*----------------------------------------------------------------------------------------------------*/

class TableFilter extends Component{
	constructor(props){
		super(props);
		this.itemID =0;
		this.state = {
			items: [],
			Body :"",
			BodyID : "",
			id : "",
			options: [],
			auxOptions: [],
			optionsAdd: [],
			optionsDelete: []
		}
		if(this.props.removeInput){
			this.state.Body = 0;
		}
		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this.handleChangeButtonAux = this.handleChangeButtonAux.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		if(this.props.options){
			this.setState({optionsAdd: this.props.options})

		}

	}

	componentWillUnmount() {
		this._isMounted = false;
		
	}


	deleteEvent = (index)=> {
		let  flag = 0
		for(let i = 0; i < this.state.optionsAdd.length; i++ ){
			if(this.state.optionsDelete[index-1].estudante_id === this.state.optionsAdd[i].estudante_id){
				flag = 1
			}
		}	
		if(!flag){
			this.state.optionsAdd.push(
				this.state.optionsDelete[index-1]
			)
			this.state.optionsDelete.splice(index-1,1)
		}
		

		this.props.onChange(this.state.optionsDelete)
		console.log(this.state.optionsAdd,this.state.optionsDelete)
	}

	setItem = (element)=>{
		this.setState({
			[element.target.name] : element.target.value
		})
	}
	
	addItem = (index)=>{	

		let  flag = 0
		for(let i = 0; i < this.state.optionsDelete.length; i++ ){
			if(this.state.optionsAdd[index-1].estudante_id === this.state.optionsDelete[i].estudante_id){
				flag = 1
			}
		}	
		if(!flag){
			this.state.optionsDelete.push(
				this.state.optionsAdd[index-1]
			)
			this.state.optionsAdd.splice(index-1,1)
		}
		
			
		this.props.onChange(this.state.optionsDelete)
		console.log(this.state.optionsAdd,this.state.optionsDelete)

	}

	handleFilter()
    {
        Rest.post('estudante/filter', this.state).then(this.handleResponse);
    }
    handleResponse(data) {
		let vetor = data.data.itens
		console.log(vetor,"Dataitens")
		console.log(this.state.optionsAdd, "OptionsAdd")

		let copyadd = this.state.optionsAdd
		if(vetor.length === 0){
			vetor = copyadd
		}

		for(let i = 0; i < copyadd.length; i++){
			for(let j = 0; j < vetor.length; j++){
				if(vetor[j].estudante_id === copyadd[i].estudante_id){
					copyadd.splice(i--,1);
					j = vetor.length
				}
			}
		}

		let aux = this.state.optionsAdd.concat(this.state.optionsDelete)



		for(let i = 0; i < vetor.length; i++){
			for(let j = 0; j < aux.length; j++){
				if(vetor[i].estudante_id === aux[j].estudante_id){
					vetor.splice(i--, 1);
					j = aux.length;
				}
			}
		}


		let copy = []
		for(let i = 0; i < vetor.length; i++){
			if(vetor[i].estudante_id !== undefined){
				copy.push(vetor[i]);
			}
			
		}

		this.setState({
			optionsAdd: copy 
		});
		
	}	
	handleChangeButtonAux(items)
	{
		this.setState({
				conhecimentos: items ? items : []
        })
    }

	render()
	{
		let key = 1;	
		
		let options = [];
		

		let optionsTest = []	
		key = 1;
			
		for(let i = 0; i < this.state.optionsAdd.length ; i++){
			optionsTest.push(
				<ItemFilter key={key++} bodyName={this.state.optionsAdd[i].estudante_nome} 
						addButton add={this.addItem.bind(this, key-1)}/>);
		}	
	
		options = optionsTest;
		const optionsAux = options;

		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		const auxOptions = []
		for(let i = 0; i < key-1; i++){
			auxOptions[optionsAux[i].props.value] = i
		}	
		let optionsOut = [];
		let teste = [];

		key = 1;
		for(let i = 0; i < this.state.optionsDelete.length ; i++){
			teste.push(
				<ItemFilter key={key++} bodyName={this.state.optionsDelete[i].estudante_nome} 
					delete={this.deleteEvent.bind(this,key-1)}/>);
		}	

		optionsOut= teste;
		

		return(
			<>
			<DynamicButton value_name="id" removeInput onChange={this.handleChangeButtonAux}
			label='Conhecimentos' url="conhecimento/all" onClick={this.handleFilter}  />

			 <div className="card mb-2">
                <h6 className="card-header dynamic"><b>{this.props.label}</b></h6>
                <FormRow>
				<div className="card-body">
				<h6 className="card-header dynamic"><b>{this.props.title1}</b></h6>
				{options.length > 0 ?
				<table className="table table-responsive-lg" >
                  <thead >
					<tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
					{options} 
				   </table>
				   : ""}
                </div>
				
				<div className="card-body">
				<h6 className="card-header dynamic"><b>{this.props.title2}</b></h6>
				{optionsOut.length > 0 ?
				<table className="table table-responsive-lg" >
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
				  {optionsOut}
                   </table>
				: ""}

                </div>
				</FormRow>
            </div>
			</>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicButton2 extends Component{
	constructor(props){
		super(props);
		this.itemID =0;
		this.state = {
			items: [ 
			],
			Body :"",
			Body2 : "",
			BodyID : "",
			id : "",
			options: this.props.options ? this.props.options: [],
			auxOptions: []
		}
		if(this.props.removeInput){
			this.state.Body = 0;
		}
	}

	deleteEvent = (index)=> {
		const aux = Object.assign([], this.state.items);
		aux.splice(index, 1);
		this.setState({
			items: aux
		})
		this.props.onChange(aux);
	}

	setItem = (element)=>{
		this.setState({
			Body : element.target.value
		})
	}
	setItem2 = (element)=>{
		this.setState({
			BodyID : element.target.value
		})
	}
	setItem3 = (element)=>{
		this.setState({
			Body2 : element.target.value
		})
	}
	
	addItem = ()=>{
		if (!(this.state.BodyID === "" || this.state.Body === "" || this.state.Body2 === "")){
			this.itemID = this.itemID + 1;
			const aux = Object.assign([], this.state.items);
			
			aux.push({
					id : this.itemID,
					body: this.state.Body,
					body2: this.state.Body2,
					bodyID : this.state.BodyID
				}
			);

			this.setState({
				items : aux
			});
			this.props.onChange(aux);

		}
		
	}


	render()
	{
		

		return(
             <div className="card mb-2">
                <h6 className="card-header"><b>{this.props.label}</b></h6>
                <div className="card-body">
                <FormRow>

					
					<FormCol>
                        <input type={ this.props.type } className={"form-control mr-2 "+this.props.class} id={ this.props.name}  name="Body"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
                    </FormCol>
                    <FormCol>
                        <input type={ this.props.type } className={"form-control mr-2 "+this.props.class} id={ this.props.name}  name="Body2"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem3} />
                    </FormCol>
                    <FormCol>
                        <select className={ "form-control mr-2" } id={ this.props.name}  name="BodyID" disabled={this.props.disabled}
                                required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.setItem2 }>
                            <option value=""/>
							<option value="1">Domingo</option> 
							<option value="2">Segunda-Feira</option>
							<option value="3">Terça-Feira</option>
							<option value="4">Quarta-Feira</option>
							<option value="5">Quinta-Feira</option>
							<option value="6">Sexta-Feira</option>
							<option value="7">Sábado</option>  
                        </select>

                        <div className="invalid-feedback">
                            { this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
                        </div>
                    </FormCol>
                    <FormCol>
                        <button className='btn btn-primary button-form' onClick={this.addItem}> <i className={ Icons.plus }></i> </button>
                    </FormCol>
                </FormRow>




                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Dia</th>
					  <th scope="col">Início</th>
					  <th scope="col">Fim</th>
                      <th scope="col">Deletar</th>
                    </tr>
                  </thead>
                    {
                        this.state.items.map((item, index) =>{
                            return(
                                <Item2 removeInput={this.props.removeInput}
                                    key = {item.id}
									id = {item.id}
									bodyID={item.bodyID}
									body={item.body}
									body2={item.body2}
                                    bodyName={item.bodyID}
                                    delete={this.deleteEvent.bind(this, index)}
                                />
                            )
                        })
					}
 
					
                   </table>
                </div>
            </div>
		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class ItemFilter extends Component{
	render(){
		return(
              <tbody>
                <tr>
	              <td>{this.props.bodyName}</td>
				  {this.props.addButton ? <td><button className='btn btn-primary button-form' onClick={this.props.add}><i className={ Icons.plus }></i></button></td>
				  	 :<td><button className='btn btn-primary button-form' onClick={this.props.delete}><i className={ Icons.delete }></i></button></td>}
                </tr>
              </tbody>

		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Item extends Component{
	render(){
		return(
              <tbody>
                <tr>
	              <td>{this.props.bodyName}</td>
				  {this.props.removeInput ? '' : <td>{this.props.body}</td>}
				  {this.props.addButton ? <td><button className='btn btn-primary button-form' onClick={this.props.add}><i className={ Icons.plus }></i></button></td>
				  	 :<td><button className='btn btn-primary button-form' onClick={this.props.delete}><i className={ Icons.delete }></i></button></td>}
                </tr>
              </tbody>

		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Item2 extends Component{
	render(){
		return(
              <tbody>
                <tr>
                  <th scope="row">{this.props.id}</th>
                  <td>{this.props.bodyName}</td>
				  <td>{this.props.body}</td>
				  <td>{this.props.body2}</td>
                  <td><button className='btn btn-primary button-form' onClick={this.props.delete}><i className={ Icons.delete }></i></button></td>
                </tr>
              </tbody>

		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class SelectAux extends Component{
	constructor(props)
	{
		super(props);
		this.state = {
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: []
		};

		this.handleReceiveOption = this.handleReceiveOption.bind(this);
		this._isMounted = false;
	}

	async handleReceiveOption(res)
	{
		if (res.status === 200) {
		    console.log(res.data)
			this._isMounted && this.setState({
				options: res.data.itens
			});
		}
	}

	componentDidMount()
	{
		this._isMounted = true;
		console.log(this.props.url);
		this._isMounted && Rest.get2(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);

	}

	componentWillUnmount() {
		this._isMounted = false;

	}

	render()
	{
		let classValue;
		let key;
		if(JSON.stringify(this.state.urlParameters)!== JSON.stringify(this.props.urlParameters)){
			Rest.get2(this.props.url, this.props.urlParameters).then(this.handleReceiveOption);
			this.setState(({urlParameters: this.props.urlParameters}))
		}

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		}
		else {
			classValue = "form-control";
		}

		key=1;

		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
			{ data.nome } {data.nome_fantasia} {data.escola}</option>
		);


		return (
			<div className= { "form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "") }>
				<label>{ Messages.getMessage(this.props.label) }</label>
				<select className={ classValue } id={ this.props.name }  name={ this.props.name } disabled={this.props.disabled}
						required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.props.onChange }>
					{ this.props.empty === true ? <option value=""/> : '' }
					{ options }
				</select>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicButtonAux extends Component{
	constructor(props){
		super(props);
		this.itemID =0;
		this.state = {
			items: [
			],
			Body :"",
			BodyID : "",
			id : "",
			urlParameters: undefined ,
			options: this.props.options ? this.props.options: [],
			auxOptions: []
		}
		if(this.props.removeInput){
			this.state.Body = 0;
		}
	}

	componentDidMount(){
        Rest.get2(this.props.url, this.props.urlParameters)
          .then(res => {
            this.setState({
              options: res.data.itens
            });
          })
      }


	deleteEvent = (index)=> {
		const aux = Object.assign([], this.state.items);
		aux.splice(index, 1);
		this.setState({
			items: aux
		})
		this.props.onChange(aux);
	}

	setItem = (element)=>{
		this.setState({
			Body : element.target.value
		})
	}
	setItem2 = (element)=>{
		this.setState({
			BodyID : element.target.value
		})
	}

	addItem = ()=>{
		if (!(this.state.BodyID === "" || this.state.Body === "")){
			this.itemID = this.itemID + 1;
			const aux = Object.assign([], this.state.items);

			aux.push({
					id : this.itemID,
					body: this.state.Body,
					bodyID : this.state.BodyID
				}
			);

			this.setState({
				items : aux
			});
			this.props.onChange(aux);

		}

	}


	render()
	{
		let key = 1;

		const options = this.state.options.map((data) =>
			<option key={key++} value={data[this.props.value_name?this.props.value_name:this.props.name]}>
				{data.nome} </option>
		);
		const optionsAux = options;


		const auxOptions = []
		for(let i = 0; i < key-1; i++){
			auxOptions[optionsAux[i].props.value] = i
		}

		return(
            <div className="card mb-2">
                <h6 className="card-header dynamic"><b>{this.props.label}</b></h6>
                <div className="card-body">
                <FormRow>

                    <div className="col-5">
                        <select className={ "form-control mr-2" } id={ this.props.name}  name="BodyID" disabled={this.props.disabled}
                                required={ this.props.required } value={this.props.value} autoFocus={ this.props.autofocus } onChange={ this.setItem2 }>
                            {  <option value=""/> }
                            { options }
                        </select>
                    </div>

                    {this.props.removeInput? '' :
					<div className="col-5">
                        <input type={ this.props.type } className="form-control mr-2" id={ this.props.name}  name="Body"
                            required={ this.props.required } placeholder={this.props.placeholder} disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
                    </div>
					}

                    <FormCol>
                        <button className='btn btn-primary button-form' onClick={this.addItem}> <i className={ Icons.plus }></i> </button>
                    </FormCol>
                </FormRow>

                {this.state.items.length === 0 ? '' :
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      {this.props.removeInput ? '':<th scope="col">{this.props.palavra}</th>}
                      <th scope="col">Deletar</th>
                    </tr>
                  </thead>
                    {
                        this.state.items.map((item, index) =>{
                            return(
                                <Item removeInput={this.props.removeInput}
                                    key = {item.id}
                                    id = {item.id}
                                    body={item.body}
                                    bodyID={item.bodyID}
                                    bodyName={optionsAux[auxOptions[item.bodyID]]}
                                    delete={this.deleteEvent.bind(this, index)}
                                />
                            )
                        })
                    }
                   </table>
                }
                </div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicFormContato extends Component{
	constructor(props){
		super(props);
		this.itemID =0;
		this.state = {
			items: [ 
			],
			Nome :"",
			Cargo : "",
			Email : "",
			Telefone : "",
			Celular : "",
			Contato : "",
			id : "",
		}
		this.handle = this.handle.bind(this);
		if(this.props.removeInput){
			this.state.Body = 0;
		}
	}

	componentDidMount(){
        Rest.get(this.props.url,{}).then(this.handle);
	}
	handle(data){
		let itens = data.data.itens
		for(let i=0; i < itens.length ; i++ ){
			
			this.itemID = this.itemID + 1;
			const aux = Object.assign([], this.state.items);
			
			aux.push({
					id : this.itemID,
					nome: itens[i].nome,
					cargo : itens[i].cargo,
					email : itens[i].email,
					telefone : itens[i].telefone,
					celular : itens[i].celular
				}
			);
	
			this.setState({
				items : aux
			});
			this.props.onChange(aux);
	
		
		}

	}

	deleteEvent = (index)=> {
		const aux = Object.assign([], this.state.items);
		aux.splice(index, 1);
		this.setState({
			items: aux
		})
		this.props.onChange(aux);
	}

	setItem = (element)=>{
		this.setState({
			[element.target.name] : element.target.value
		})
	}
	

	addItem = ()=>{
	
		if(	!(this.itemID === "" ||
			this.state.Nome === "" ||
			this.state.Cargo === "" ||
			this.state.Email === "" ||
			this.state.Telefone === "" ||
			this.state.Celular === ""))
		{
			
			this.itemID = this.itemID + 1;
			const aux = Object.assign([], this.state.items);
			
			aux.push({
					id : this.itemID,
					nome: this.state.Nome,
					cargo : this.state.Cargo,
					email : this.state.Email,
					telefone : this.state.Telefone,
					celular : this.state.Celular
				}
			);
	
			this.setState({
				items : aux
			});
			this.props.onChange(aux);
	
		
		}
		
	}



	render()
	{
		return(
             <div className="card mb-2 col-12">
                <h6 className="card-header"><b>{this.props.label}</b></h6>
                <div className="card-body">
                <FormRow>
                    <div className="form-group col-6">
                        <input placeholder="Nome" type={ this.props.type } className="form-control mr-2" id={ this.props.name}  name="Nome"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
				    </div>
				    <div className="form-group col-6">
                        <input placeholder="Cargo" type={ this.props.type } className="form-control mr-2" id={ this.props.name}  name="Cargo"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
					</div>
				</FormRow>
				<FormRow>
					<div className="form-group col-6">
                        <input placeholder="Email" type={ this.props.type } className="form-control mr-2" id={ this.props.name}  name="Email"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
                    </div>
                    <div className="form-group col-6">
                        <input placeholder="Telefone" type={ this.props.type } className="form-control mr-2 phone" id={ this.props.name}  name="Telefone"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
					</div>
				</FormRow>
				<FormRow>
					<div className="form-group col-6">
                        <input placeholder="Celular" type={ this.props.type } className="form-control mr-2 sp_celphones" id={ this.props.name}  name="Celular"
                            required={ this.props.required } disabled={this.props.disabled} value={this.props.value} autoFocus={ this.props.autofocus }
                            maxLength={this.props.maxLength} checked={this.props.checked} onBlur={this.setItem} />
                    </div>

					<div className="invalid-feedback">
						{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : '' }
					</div>
					<div className="form-group col-6">
				        <button className='btn btn-primary button-form' onClick={this.addItem}> <i className={ Icons.plus }></i> Adicionar</button>
				    </div>
                </FormRow>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
					  <th scope="col">Cargo</th>
					  <th scope="col">Email</th>
					  <th scope="col">Telefone</th>
					  <th scope="col">Celular</th>
                      <th scope="col">Deletar</th>
                    </tr>
                  </thead>

                    {
                        this.state.items.map((item, index) =>{
                            return(
								<ItemContato 
									key={item.id}
                                    id = {item.id}
                                    nome={item.nome}
									cargo={item.cargo}
									email ={item.email}
									telefone={item.telefone}
									celular={item.celular}
                                    delete={this.deleteEvent.bind(this, index)}
                                />
                            )
                        })
                    }
                   </table>
                </div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ItemContato extends Component{
	render(){
		return(
              <tbody>
                <tr>
                  <th scope="row">{this.props.id}</th>
                  <td>{this.props.nome}</td>
				  <td>{this.props.cargo}</td>
				  <td>{this.props.email}</td>
				  <td>{this.props.telefone}</td>
                  <td>{this.props.celular}</td>
                  <td><button className='btn btn-primary button-form' onClick={this.props.delete}><i className={ Icons.delete }></i></button></td>
                </tr>
              </tbody>

		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class LoginArea extends Component{
    render(){
        return(
            <div className="card mb-2">
              <div className="card-header dynamic">
                <b>{this.props.title}</b>
              </div>
              <div className="card-body">
                <FormRow>
                    <div className="col-6">
                        <label>{Messages.getMessage(this.props.label1) }</label>
					    <input type="text" class="form-control" name="username" label='page.user.fields.username' required="required" />
					</div>
					<div className="col-6">
				        <label>{Messages.getMessage(this.props.label2) }</label>
					    <input type="password" class="form-control" name="password" label='page.user.fields.password' required="required" />
					</div>

				</FormRow>

				<FormRow>
				    <div className="col mt-2">
					    <label>{Messages.getMessage(this.props.label3) }</label>
					    <input type="email" class="form-control" name="email" label='page.user.fields.email' required="required" />
					</div>
				</FormRow>
              </div>
            </div>
        );
    }

}

/*----------------------------------------------------------------------------------------------------*/

class Profile extends Component{
    render(){
        let text_fields = this.props.fields.map( (field) => {
			return (<tr key={field.label}><th><strong>{field.label}</strong></th><td>{field.value}</td></tr>);
		});

		let contatos = this.props.contato.map( (field) => {
			return (
                <div className="profile__contact-info-item">
                    <div className="profile__contact-info-icon">
                        <i className="fa fa-phone"></i>
                    </div>
                    <div className="profile__contact-info-body">
                        <h5 className="profile__contact-info-heading">{field.nome}</h5>
                        {field.celular}<br/>
                        {field.telefone}<br/>
                        <a href={"mailto:" + field.email}>{field.email}</a><br/>
                    </div>
                </div>
			);
		});

        return(
        <div className="card">
          <div className="card-body">
            <div className="container">
                <div className="row">
                      <div className="col-xs-12 col-sm-9">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                          </div>
                          <div className="panel-body">
                            <div className="profile__avatar">
                              <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="..."/>
                              {/*<i className="fas fa-user-edit icon-user" aria-hidden="true"></i>*/}
                            </div>
                            <div className="profile__header">
                              <h4>{this.props.title} <small>Administrator</small></h4>
                              <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum repellat veniam eligendi rem cumque magnam autem delectus qui.
                              </p>
                            </div>
                          </div>
                        </div>


                        <div className="panel panel-default">
                          <div className="panel-heading">

                          </div>
                          <div className="panel-body">
                            <table className="table profile__table">
                              <tbody>
                                {text_fields}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-3">
                        <p>
                            {this.props.buttonEditRemove ? '' : <button type="button" class="btn btn-primary" onClick={this.props.onClickEdit}>
                            <i className="fas fa-user-edit"> Editar </i></button>}
                        </p>

                        <hr/>

                        <div className="profile__contact-info">
                          {contatos}
                        </div>
                      </div>
                    </div>
                </div>
                </div>
                </div>

        );
    }

}

/*---------------------------------------------------------------------------------------------------------------*/
class NavFlex extends Component{

    constructor(props){
        super(props);
        this.aux = 0;
        this.state = {
            dados:[],
            urlParameters: undefined ,
            options: this.props.options ? this.props.options: []

        };

        this.handleReceiveOption = this.handleReceiveOption.bind(this);
        this._isMounted = false;
    }

    handleReceiveOption(res)
    {
        if (res.status === 200) {
            const auxName = this.props.label[this.aux].title;
            this.aux = this.aux+1;

            this._isMounted = true;
            this.setState({
                [auxName]: res.data.itens
            }, () => {});
        }
    }

    componentDidMount()
    {
        this._isMounted = true;

        for(let i = 0;i < this.props.label.length ; i++){
            this.setState({aux: this.props.label[i].title});
            this._isMounted && Rest.get(this.props.label[i].url, this.props.urlParameters).then(this.handleReceiveOption);

        }

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        let index = 0;
        let label = this.props.label.map( (field) => {
			return (<li className="nav-item" key={"index1" + index++}>
                        <a className="nav-link" id={field.name_id + "-tab"} data-toggle="tab" href={"#"+field.name_id} role="tab" aria-controls={field.name_id} aria-selected="false">{field.title}</a>
                    </li>);
		});

        let tables = []
        for(let i=0; i < this.props.label.length; i++){
            let th = [];
            let table = [];
            let index = 0;

            for (var key in this.props.labelFields[i]){
                th.push(<th key={"index2" + index++} >{this.props.labelFields[i][key]}</th>)
            }

            let trs = [];
            if(this.aux === this.props.label.length){
                for(let j = 0; j < this.state[this.props.label[i].title].length; j++){
                    let tr = []
                    let tds = []
                    let key
                    for(key in this.props.labelFields[i]){
                        let td = <td key={"index3" + index++}>{this.state[this.props.label[i].title][j][key]}</td>
                        tds.push(td);
                    }
                    tr = <tr key={"index4" + index++}>{tds}</tr>
                    trs.push(tr);
                }


            }


            table = <table className="table">
                        <thead className="thead">
                            <tr>
                                {th}
                            </tr>
                        </thead>
                        <tbody>
                            {trs}

                        </tbody>
                    </table>;

            tables.push(table);
        }
        let index2 = 0;
        let tablenav = this.props.label.map((field) =>{
           return ( <div className="tab-pane fade" id={field.name_id} role="tabpanel" aria-labelledby={field.name_id + "-tab"} key={"index5" + index++}>
                {tables[index2++]}
            </div>);
		});



        return(
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {label}
            </ul>
            <div className="tab-content" id="myTabContent">
            {tablenav}
            </div>

         </div>
        );
    }
}
/*---------------------------------------------------------------------------------------------------------------*/
class Config extends Component{
    render(){

        return(
        <div className="card">
          <div className="card-header">
            Destaque
          </div>
          <div className="card-body">
            <h5 className="card-title">Título especial</h5>
            <p className="card-text">Com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
            <p className="card-text">Com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
            <p className="card-text">Com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
            <p className="card-text">Com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
            <a href="/dashboard" class="btn btn-danger">Deletar minha conta</a>
          </div>
        </div>

        );
    }
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicFields extends Component{
	constructor(props){

		super(props);
        this._isMounted = false;
		this.itemID =0;
		this.state = {
			items: [],
			itemAtual:{},
			options : []
		}
		this.handleEditData = this.handleEditData.bind(this);
		this.addItem = this.addItem.bind(this);
		this.setItem = this.setItem.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
	}

	componentDidMount(){
	    this._isMounted = true;

		let itemAtual = {}

		for(let i = 0; i < this.props.fields.length; i++){
			Object.assign(itemAtual, {[this.props.fields[i].name] : ''})

			if (this.props.fields[i].fieldType === "select"){

				this._isMounted && Rest.get(this.props.fields[i].url, {}).then(res => {
					let copy = Object.assign({}, this.state.options, {[this.props.fields[i].name] :res.data.itens});
					this._isMounted && this.setState({
					options: copy
					});
				})
			
				
			}
		}

		this._isMounted && this.setState({itemAtual : itemAtual});

		if(this.props.url !== undefined ){

			this._isMounted && Rest.get(this.props.url,{}).then(this.handleEditData);

		}
	}


    componentWillUnmount(){
        this._isMounted = false;
    }

	handleEditData(res){

		let itens = res.data.itens;
		let copy = []
		for(let i = 0; i < itens.length; i++){
			let item = {};
			for(let j = 0; j < this.props.fields.length; j++){
				Object.assign(item, {[this.props.fields[j].name]:itens[i][this.props.fields[j].name]});

				if(this.props.fields[j].fieldType === "select"){
					let key = this.props.fields[j].select_idKey
					let name = this.props.fields[j].name

					let select_id = {[name]: itens[i][key]}
					Object.assign(item, {select_id})
				}

			}
			item['id'] = this.itemID + 1;
			this.itemID = this.itemID + 1;

			copy.push(item);
		}

		this._isMounted && this.setState({items : copy}, () => {console.log(this.state.items); this.props.onChange(this.state.items, this.props.name);});

	}


	deleteEvent = (index)=> {
		const aux = Object.assign([], this.state.items);
		aux.splice(index, 1);
		this.setState({
			items: aux
		})
		this.props.onChange(aux, this.props.name);
	}

	setItem = (element)=>{

		if(element.target.type === "select-one"){
			let name = element.target.options[element.target.selectedIndex].text;

			this.setState({
				itemAtual: {
					...this.state.itemAtual,
					[element.target.name] : name,
					select_id : {...this.state.itemAtual.select_id,
					[element.target.name]:element.target.value}
				}
			});

		}else{

			this.setState({
				itemAtual: {
					...this.state.itemAtual,
					[element.target.name] : element.target.value
				}
			})
		}


	}

	addItem = ()=>{

		let flag = false;
		for(let i = 0; i < this.props.fields.length; i++){
			if(this.state.itemAtual[this.props.fields[i].name] === undefined || this.state.itemAtual[this.props.fields[i].name] === ''){
				flag = true;
				i = this.props.fields.length;
			}
		}

		if(!flag){
			var copy = {}
			Object.assign(copy, this.state.itemAtual);
			copy['id'] = this.itemID + 1;
			this.itemID = this.itemID + 1;
			this.setState({
				itemAtual : copy
			}, () => {
				this.state.items.push(copy);

				this.props.onChange(this.state.items, this.props.name);

			})
		}



	}

	render()
	{

		


		var fields = [];
		var th = [];
		let options = {};

		for(let i = 0; i < this.props.fields.length; i++){

			var field = '';
			if(this.props.fields[i].fieldType === "input"){
				//construcao dos inputs
				field =
				<div key={"div-input-"+this.props.fields[i].name} className="form-group col-6">
					<input type={ this.props.fields[i].type }  className={"form-control "+this.props.fields[i].class} id={ this.props.fields[i].name}  name={this.props.fields[i].name}
							placeholder={this.props.fields[i].label} disabled={false} maxLength={this.props.fields[i].maxLength} onBlur={this.setItem}  />
				</div>;
			}else if (this.props.fields[i].fieldType === "select"){

				let option = [];
				if (this.props.fields[i].options !== undefined){
					option = this.props.fields[i].options.map((data) =>
					<option key={data[this.props.fields[i].value_name]} value={data[this.props.fields[i].value_name]}>
						{data.nome} </option>
					)
				}else if(this.state.options[this.props.fields[i].name] !== undefined){
					option = this.state.options[this.props.fields[i].name].map((data) =>
					<option key={data[this.props.fields[i].value_name]} value={data[this.props.fields[i].value_name]}>
						{data.nome} </option>
					);
				}

				Object.assign(options, options, {[this.props.fields[i].name] : option});
				//construcao dos selects
				field =
					<div key={"div-select"+this.props.fields[i].name} className="form-group col-6">
						<select className={ "form-control mr-2" } id={ this.props.fields[i].name}  name={this.props.fields[i].name} onChange={ this.setItem }>
								{<option label={this.props.fields[i].labelSelect} value=""/>}
								{options[this.props.fields[i].name]}
						</select>
					</div>
			}
			fields.push(field);

			//construcao das colunas da tabela
			var col =
				<th key={"thMap"+i+this.props.fields[i].label + this.props.label}scope="col">{this.props.fields[i].label}</th>;
			th.push(col);

		}


		return(
            <div className="card mb-2" style={{width:'100%'}}>
                <h6 className="card-header dynamicForm"><b>{this.props.label}</b></h6>
                <div className="card-body">
                <FormRow>
					{this.props.extra}
					{fields}
                </FormRow>
				<FormRow>

					<div className="form-group col-6">
						<button className='btn btn-primary button-form' onClick={this.addItem}> <i className={ Icons.plus }></i> Adicionar</button>
					</div>

                </FormRow>

				{this.state.items.length > 0 ?
				<table className="table">
				<thead>
				  <tr>
					{th}
					<th scope="col">Deletar</th>

				  </tr>
				</thead>
				  {
					  this.state.items.map((item, index) =>{
						  return(
							  <DynamicFieldsItem
								  key={item.id + "itemMap"}
								  id = {item.id}
								  item = {item}
								  unique={this.props.label}
								  delete={this.deleteEvent.bind(this, index)}
							  />
						  )
					  })
				  }
				  </table>
					: ''}	
				
	
								
                </div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class DynamicFieldsItem extends Component{
	render(){
		var items = [];
		var copy =	Object.assign({}, this.props.item);
		copy['id'] = null;
		copy['select_id'] = null;

		let index = 0;
		for(var key in copy){
			if(copy[key] !== null){
				var td = <td key={"tdMap-"+ (index++) + '-' +this.props.item["id"] + this.props.unique} id={"td " + this.props.item["id"]}>{copy[key]}</td>
				items.push(td)	
				
			}
			
		}
			

		/*for(var key in this.props.item){
			if(key !== "id"){
				var td = <th>{this.props.item[key]}</th>
				items.push(td)	
			}
		*/	
		//}

		return(
              <tbody>
                <tr>
				  	{items}  
                  <td><button className='btn btn-primary button-form' onClick={this.props.delete}><i className={ Icons.delete }></i></button></td>
                </tr>
              </tbody>

		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class DynamicTable extends Component{


	render(){
		
		return(
            <div className="card mb-2" style={{display: "flex", "flex-direction":"row", width:'100%'}}>

				<table className="table all" >
						<thead>
						<tr><th>{this.props.listaAddName}</th></tr>
						</thead>
						
						<tbody>
						{this.props.list1.map((item, index) => {
							return(
							<>
								<tr>
									<th>{item.nome}<br/>{item.nome1}</th>
									<th>
										<button type="button" class="btn btn-primary" onClick={this.props.manager.bind(this, index, "a", this.props.regra)}>
											<i className={ Icons.plus }></i>
										</button>
										<button type="button" class="btn btn-danger ml-1" onClick={this.props.remover.bind(this, index, this.props.regra)}>
											<i className={ Icons.delete }></i>
										</button>
									</th>

								</tr>
							</>
								);
						})
						}
					</tbody>
				</table>
				<table className="table all" >
					<thead>
					<tr><th>{this.props.listaRmvName}</th></tr>
					</thead>
					<tbody>

						{this.props.list2.map((item, index) => {
							return(
								<>

									<tr>
										<th>{item.nome}<br/>{item.nome1}</th>
										<th><button type="button" class="btn btn-danger" onClick={this.props.manager.bind(this, index, "r", this.props.regra)}>
											<i className={ Icons.delete }></i>
										</button></th>
									</tr>
								</>
								)
							
						})
						}
					</tbody>					
					
				</table>

			</div>
		);
	}
}

class TextField extends Component
{		
	render() 
	{
		let classValue;

		if (this.props.errors[this.props.name]) {
			classValue = "is-invalid form-control";
		} else if(!this.props.class) {
		    classValue = "form-control";
		} else {
			classValue = "form-control " + (this.props.class);
		}

		return (
			<div className= {"form-group col " + (this.props.colsize ? "col-md-" + this.props.colsize : "")  }>
				<label>{ Messages.getMessage(this.props.label) }</label>
			
								
				<textarea id={this.props.name} name={this.props.name} className={classValue} style={{resize: "none"}} rows={this.props.rowsize} cols={10 * this.props.colsize}
							required={this.props.required} maxLength={this.props.maxLength} disabled={this.props.disabled} value={this.props.value} 
							onChange={this.props.onChange}  placeholder={this.props.placeholder}/>
								
				<div className="invalid-feedback">
					{ this.props.errors[this.props.name] ? this.props.errors[this.props.name] : ''}
				</div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/


export  { InputInGroup, RememberMeInGroup, ButtonSubmit, ButtonCancel, ButtonFilter, SelectField,SelectGender,
	 SelectConduction, SelectLicenseStatus, DataList, DynamicButton, Item, SelectAux, DynamicButtonAux,
	 DynamicFormContato, LoginArea, DynamicButton2, Item2, Profile, Config, DynamicFields, DynamicFieldsItem, NavFlex,
	 TableFilter, DynamicTable, TextField};
