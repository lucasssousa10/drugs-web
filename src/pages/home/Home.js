import React from 'react';
import BasePage from '../basePage/BasePage';
import RestService from '../../services/RestService';
import { CardBordered } from '../../components/template/Layout';
import './Home.css';

const Rest = new RestService();

class Home extends BasePage {
	
	constructor(props)
	{
		super(props);

		this.state = {
			questions: 0,
			answers: 0,
			users: 0,
			info: 0,
			tasks: 0,
			informativos: [],
			atividades: [],
		}
	}

	componentDidMount()
	{
		const self = this;
		Rest.get("dashboard/all", {}).then(res => {
			self.setState({
				questions: res.data.n_questionarios,
				answers: res.data.n_respostas,
				users: res.data.n_users,
				info: res.data.n_info,
				tasks: res.data.n_ativ,
				informativos: res.data.informativos,
				atividades: res.data.atividades
			});
		});
	}
	
	render() 
	{
		let i = 0;
		const atividades_rows = this.state.atividades.map(item => 
			<tr key={i++}>
				<th scope="row" className="col-id">{ item.id }</th>
				<td>{ item.titulo }</td>
			</tr>
		);

		const informativos_rows = this.state.informativos.map(item => 
			<tr key={i++}>
				<th scope="row" className="col-id">{ item.id }</th>
				<td>{ item.titulo }</td>
			</tr>
		);
		
		return (
			<React.Fragment>
				<div className="row d-flex justify-content-between">
					<CardBordered type='primary' label="layout.dashboard.answers" value={ this.state.answers } icon="question"/>
					<CardBordered type='primary' label="layout.dashboard.users" value={ this.state.users } icon="users"/>
					<CardBordered type='primary' label="layout.dashboard.info" value={ this.state.info } icon="info"/>
					<CardBordered type='primary' label="layout.dashboard.tasks" value={ this.state.tasks } icon="atividades"/>
				</div>
				<div className="row">
					<div className="col-md-4">
						<div className="card card-base">
							<div className="card-body">
								<p className="card-text primary-text text-justify" >Follow Life é uma ferramenta para auxiliar na prevenção do uso de drogas por adolescentes. Nela os adolescentes terão conhecimentos para pensar um pouco mais sobre drogas, poderão tirar dúvidas sobre esse assunto, receberão dicas e informações que irão subsidiar na tomada de decisões, favorecendo a realização de escolhas conscientes para as suas vidas.</p>
							</div>
						</div>
					</div>
					
					<div className="col-md-4">
						<div className="card card-base">
							<div className="card-header">Atividades Recentes</div>
							<div className="card-body">
							<table className="table">
								<thead>
									<tr>
										<th scope="col col-id">#</th>
										<th scope="col">Título</th>
									</tr>
								</thead>
								<tbody>
									{ atividades_rows }
								</tbody>
								</table>
							</div>
						</div>
					</div>

					<div className="col-md-4">
						<div className="card card-base">
							<div className="card-header">Informativos Recentes</div>
							<div className="card-body">
							<table className="table">
								<thead>
									<tr>
										<th scope="col col-id">#</th>
										<th scope="col">Título</th>
									</tr>
								</thead>
								<tbody>
									{ informativos_rows }
								</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				
			</React.Fragment>
		);
	}
}

export default Home;