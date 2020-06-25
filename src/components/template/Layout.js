import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import RestService from "../../services/RestService";
import MessageService from '../../services/MessageService';
import { Properties } from '../../config';
import { Icons } from '../../iconSet';
import { formatString } from '../utils/Utils';
import { Tooltip } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {ButtonColors} from "../../colorButtons";

import './Layout.css';
import {Hints} from "../../hintSet";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


const Auth = new AuthService();
const Messages = new MessageService();
const Rest = new RestService();

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip);

/*----------------------------------------------------------------------------------------------------*/

class CenterCard extends Component {
	render() {
		return (
			<div className="card card-login mx-auto mt-5">
				<div className="card-header">{Messages.getMessage(this.props.title)}</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class CenterCard2 extends Component {
	render() {
		return (
			<div className="card text-left" >
				<div className="card-header">{Messages.getMessage(this.props.title)}</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class AlertDangerForm extends Component {
	render() {
		if (this.props.text.length === 0) {
			return <div></div>;
		}

		let i = 0;

		const listErrors = this.props.text.map((err) => {
			return (<li key={i++}>{err.message}</li>);
		});

		return (
			<div className="alert alert-danger alert-dismissible fade show" role="alert">
				<ul>{listErrors}</ul>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class CardBordered extends Component
{
    static defaultProps = {
        type: "primary",
        icon: "document",
    }

    render()
    {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className={ "card border-left-" + this.props.type + " shadow h-100 py-2" }>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={"text-xs font-weight-bold text-uppercase mb-1"}>{ Messages.getMessage(this.props.label) }</div>
                                <div className="h5 mb-0 font-weight-bold text-gray">{ this.props.value }</div>
                            </div>
                            <div className="col-auto">
                                <i className={ Icons[this.props.icon] + " fa-2x text-gray-300" }></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class SideBar extends Component {
	render() {
		return (
			<ul className="sidebar navbar-nav">
				{this.props.children}
			</ul>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarItem extends SideBar {
	render() {
		return (
			<li className="nav-item">
				<Link className="nav-link" to={this.props.url}>
					<i className={this.props.icon} />
					<span> {Messages.getMessage(this.props.name)}</span>
				</Link>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDown extends Component {
	render() {
		return (
			<li className="nav-item dropdown">
				<Link className="nav-link dropdown-toggle" to="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className={this.props.icon} />
					<span> {Messages.getMessage(this.props.name)}</span>
				</Link>
				<div className="dropdown-menu" aria-labelledby="pagesDropdown">
					{this.props.children}
				</div>
			</li>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownItem extends SideBar {
	render() {
		return (
			<Link className="dropdown-item" to={this.props.url}> {Messages.getMessage(this.props.name)}</Link>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownGroup extends Component {
	render() {
		return (
			<h6 className="dropdown-header">{Messages.getMessage(this.props.name)}</h6>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class SideBarDropDownDivider extends Component {
	render() {
		return (
			<div className="dropdown-divider" />
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class NavBar extends Component {
	handleLogoutClick() {
		Auth.logout();
	}

	handleToggleSidebarClick(e) {
		e.preventDefault();
		let className = document.getElementsByClassName('sidebar')[0].className;
		let classBodyName = document.getElementsByTagName('body')[0].className;

		if (className.indexOf('toggled') === -1) {
			className = className + " toggled";
			classBodyName = classBodyName + " sidebar-toggled";
		}
		else {
			className = className.replace(" toggled", "");
			classBodyName.replace(" sidebar-toggled", "");
		}

		document.getElementsByClassName('sidebar')[0].className = className;
		document.getElementsByTagName('body')[0].className = classBodyName;
	}

	render() {
		return (
			<nav className="navbar navbar-expand navbar-dark bg-dark static-top">

				<Link className="navbar-brand mr-1" to="/">{Properties.appName}</Link>

				<button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" onClick={this.handleToggleSidebarClick}>
					<i className="fas fa-bars" />
				</button>

				<ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
					
					<li className="nav-item dropdown no-arrow">
					
						<Link className="nav-link dropdown-toggle" to="#" onClick={this.handleLogoutClick} role="button" aria-haspopup="true" aria-expanded="false">
							<i className="fa fa-sign-out-alt" />
						</Link>
						
					</li>
				</ul>
			</nav>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Footer extends Component {
	render() {
		return (
			<footer className="sticky-footer">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>{Messages.getMessage('layout.copyright')} © {Properties.company} {Properties.year}</span><br />
						<span>{Messages.getMessage('layout.version')}. {Properties.version}</span>
					</div>
				</div>
			</footer>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class ScrollToTop extends Component {
	render() {
		return (
			<a className="scroll-to-top rounded" href="#page-top">
				<i className={Icons.toparrow} />
			</a>
		)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class PaginationPage extends Component {
	constructor(props) {
		super(props);
		this.handleClickPage = this.handleClickPage.bind(this);
	}

	handleClickPage(e) {
		e.preventDefault();
		this.props.onClick(this.props.page);
	}

	render() {
		return (<Link className="page-link" to="#" onClick={this.handleClickPage}>{this.props.text}</Link>)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Pagination extends Component {
	static defaultProps = {
		numberPagesShow: 5,
		pagination: {
			current: 0,
			pages_count: 0,
			prev: null,
			next: null
		}
	};

	handleUpdatePages() {
		let pages = [];
		let pagesPrior = [];

		let startPage = this.props.pagination.current - this.props.numberPagesShow;
		let endPage = this.props.pagination.current + this.props.numberPagesShow;

		if (startPage < 1) {
			endPage = endPage + Math.abs(startPage) + 1;
			startPage = 1;
		}

		if (endPage >= this.props.pagination.pages_count) {
			startPage = startPage - Math.abs(endPage - this.props.pagination.pages_count);
			endPage = this.props.pagination.pages_count;
		}

		if (startPage < 1) {
			startPage = 1;
		}

		for (let i = startPage; i <= endPage; pages.push(i++));

		let maxDist = -1;

		for (let i = 0; i <= pages.length; i++) {
			let dist = Math.abs(i - pages.indexOf(this.props.pagination.current));
			pagesPrior.push(dist);

			if (maxDist < dist) {
				maxDist = dist;
			}
		}

		let prior = pages.length;

		while (prior > 0) {
			for (let i = 0; i < pagesPrior.length; i++) {
				if (pagesPrior[i] === maxDist) {
					pagesPrior[i] = prior--;
				}
			}

			maxDist = maxDist - 1;
		}

		return {
			pages: pages,
			prior: pagesPrior
		};
	}

	render() {
		const pages = this.handleUpdatePages();

		let key = 1;
		let i = 0;

		const Paginator = pages['pages'].map((page) =>
			<li key={key++} className={"page-item page-item-" + pages['prior'][i++] + " " + (page === this.props.pagination.current ? 'active' : '')}>
				<PaginationPage page={page} text={page} onClick={this.props.onClickPage} />
			</li>
		);

		const PreviousIcon = (
			<span aria-hidden="true">&laquo;</span>
		);

		const Previous = (
			<li className={"page-item-prev page-item" + (this.props.pagination.prev ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.prev} text={PreviousIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const NextIcon = (
			<span aria-hidden="true">&raquo;</span>
		);

		const Next = (
			<li className={"page-item-prev page-item" + (this.props.pagination.next ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.next} text={NextIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const FirstIcon = (
			<span aria-hidden="true">&laquo;&laquo;</span>
		);

		const First = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current > 1 ? '' : ' disabled')}>
				<PaginationPage page={1} text={FirstIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const LastIcon = (
			<span aria-hidden="true">&raquo;&raquo;</span>
		);

		const Last = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current < this.props.pagination.pages_count ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.pages_count} text={LastIcon} onClick={this.props.onClickPage} />
			</li>
		);

		return (
			<nav aria-label="Navegação">
				<ul className="pagination pagination-sm justify-content-end">
					{First}
					{Previous}
					{Paginator}
					{Next}
					{Last}
				</ul>
			</nav>
		);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class TableData extends Component
{
	constructor(props){
		super(props);
		this.onChangeRemember = this.onChangeRemember.bind(this);
		this.state = {
			remember: false
		}
	}

	onChangeRemember(e) {
		console.log(!this.state.remember);
		this.setState(({remember: !this.state.remember}));
	}

	render()
	{
		let key = 1;

		const labels = this.props.fields.map((fld) =>
			<th style={ {'width': fld.width} } key={ key++ } >{ Messages.getMessage(fld.label) }</th>
		);

		const data = this.props.data.map((register) => 
		{	
			let registerFields = this.props.fields.map((fld) =>
				<td style={ {'width': fld.width} } key={ key++ }>{ register[fld.field] }</td>
			);
			let registerActions = <div/>;
			if (this.props.actions) {
				registerActions =
					<td className="action-col" key={ key++ } style={{width:"100%", height: "100%"}}>{
						this.props.actions.map((act) =>
							<LightTooltip key={ key++ } title={Hints[act.field]} placement={"top"} arrow>
								{act.field === "delete" ?
									<Modal key={key++} act={act} register={register} onChangeRemember={this.onChangeRemember} remember={this.state.remember} dontRemember={() => this.setState(({remember:false}))}/>

									:
									<div style={{width:"98%"}}>
										<button key={ key++ } className="w-33 btn btn-secondary btn-action" style={ {width: "100%", background:ButtonColors[act.field]}} onClick={ (evt) => act.handle(evt, register.id) }><i className={ Icons[act.field] }/></button>

									</div>
									}
								</LightTooltip>
								)}
					</td>;
			}
			if(this.props.actions) {
				return (
					<tr key={ key++ }>
						{ registerFields }
						{ registerActions }
					</tr>
				);
			} else {
				return (
					<tr key={ key++ }>
						{ registerFields }
					</tr>
				);
			}
		});
		
		let labelActions;

		if (this.props.actions && this.props.actions.length > 0) {
			labelActions = <th className="w-5 actions-label" style={ {width: "5%"} } colSpan={ this.props.actions.length }>{ Messages.getMessage('action.title') }</th>;
		}

		let footerPageInfo = "";
		if (this.props.pagination) {
			footerPageInfo = formatString(Messages.getMessage('layout.paginator'), [
				this.props.pagination.current,
				this.props.pagination.pages_count,
				this.props.pagination.itens_count
			]);
		}

		let card = <div className="card-body">
			<div className="table-responsive">
				<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
					<thead>
					<tr>
						{ labels }
						{ labelActions }
					</tr>
					</thead>
					<tbody>
					{ data }
					</tbody>
				</table>
			</div>
			{this.props.pagination ?
			<Pagination pagination={ this.props.pagination } onClickPage={ this.props.onClickPage }/> : <div/>}
		</div>;

		let empty_card =
		<div className="card text-gray text-center ">
			<div className="card-body p-4">
				<h3 className="card-title">Não há nada aqui =( </h3>
				<p className="card-text primary-text text-center" >
					Parece que ainda não há nada cadastrado aqui.
				</p>
			</div>
		</div>;
		let loading = <div className="text-center">
				<h3>Loading...</h3>
		</div>;
		return (
		    <div className="card mb-3">
				<div className="card-header">
					<i className={ Icons.table }/> { Messages.getMessage(this.props.title) }
					{this.props.buttonRemove ? <div/> : <Link className="btn btn-primary" to={ this.props.addUrl }><i className={ Icons.plus }/></Link> }
					{this.props.buttonBackRemove ?
						<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
							<i className="fas fa-backward"/></a> :  <i/>}
				</div>
				{this.props.details}
				{this.props.filter}

				{this.props.pagination ? this.props.pagination.loaded?((this.props.data.length === 0)? empty_card : card):loading : card}


				{this.props.pagination ?
				<div className="card-footer small text-muted">{ footerPageInfo }</div> : <div/>}
		    </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class TableData2 extends Component {


	get_field_correct(register, field) {
		let name = field.split("/");
		let value = register;
		for (let i = 0; i < name.length; i++) {
			value = value[name[i]];
		}
		return value;
	}
	render() {
		let key = 1;

		const labels = this.props.fields.map((fld) =>
			<th style={{ 'width': fld.width }} key={key++} >{Messages.getMessage(fld.label)}</th>
		);

		const data = this.props.data.map((register) => {
			let registerFields = this.props.fields.map((fld) =>
				<td style={{ 'width': fld.width }} key={key++}>{this.get_field_correct(register, fld.field)}</td>
			);

			let registerActions =
				<td className="action-col" key={key++} style={{ width: "100%", height: "100%" }}>{
					this.props.actions.map((act) =>
						act.modal ? <Modal className={Icons[act.field]} title={act.title} onClick={(evt) => act.handle(evt, register.id)} /> :
							(<button key={key++} className="w-33 btn btn-secondary btn-action"
								title={act.title} toggle="tooltip" style={{ width: "100%" }} onClick={(evt) => act.handle(evt, register.id)}><i className={Icons[act.field]} /></button>)
					)}
				</td>;

			return (
				<tr key={key++}>
					{registerFields}
					{registerActions}
				</tr>
			);
		});

		let labelActions;

		if (this.props.actions && this.props.actions.length > 0) {
			labelActions = <th className="w-5 actions-label" style={{ width: "5%" }} colSpan={this.props.actions.length}>{Messages.getMessage('action.title')}</th>;
		}

		const footerPageInfo = formatString(Messages.getMessage('layout.paginator'), [
			this.props.pagination.current,
			this.props.pagination.pages_count,
			this.props.pagination.itens_count
		]);

		return (
			<div className="card mb-3">
				<div className="card-header">
					<i className={Icons.table} /> {Messages.getMessage(this.props.title)}

					{!this.props.extraButton ? '' : <button className="btn btn-primary" onClick={this.props.onClickExtraButton}><i className={Icons.plus} /></button>}
					{this.props.buttonRemove ? <div /> : <Link className="btn btn-primary" toggle='tooltip' data-placement={this.props.placement}
						title={this.props.titletoggle} to={this.props.addUrl}><i className={Icons.plus} /></Link>}

				</div>
				{this.props.details}

				{this.props.filter}
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
							<thead>
								<tr>
									{labels}
									{labelActions}
								</tr>
							</thead>
							<tbody>
								{data}
							</tbody>
						</table>
					</div>
					<Pagination pagination={this.props.pagination} onClickPage={this.props.onClickPage} />
				</div>


				<div className="card-footer small text-muted">{footerPageInfo}</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormPage extends Component {
	render() {
		return (
			<div className="card mb-3">
				<div className="card-header">
					<i className={Icons.table} /> {Messages.getMessage(this.props.title)}
				</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormColapse extends Component
{
	render()
	{
		return (
		    <div className="accordion mb-3" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0 d-flex flex-row bd-highlight">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#" + this.props.name} aria-expanded="true" aria-controls="collapseOne">
                      <i className={ Icons.table }/> { Messages.getMessage(this.props.title) }
                    </button>
                  </h2>
                </div>

                <div id={this.props.name} className="collapse " aria-labelledby="headingOne" data-parent={"#" + this.props.name}>
                  <div className="card-body">
                    { this.props.children }
                  </div>
                </div>
              </div>
            </div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class FormRow extends Component
{
	render()
	{
		return (<div className="form-row">{ this.props.children }</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/
class FormCol extends Component {
	render() {
		return (<div className={"form-group col-" + (this.props.tam ? this.props.tam + "-" : "-auto-") + (this.props.colsize ? +this.props.colsize : +"6")}>{this.props.children}</div>);
	}
}
/*----------------------------------------------------------------------------------------------------*/

class HtmlContentView extends Component {
	render() {
		return (
			<div className="card">
				<div className="card-header">
					<div className="card-title"><b>{this.props.title}</b></div>
				</div>
				<div className="card-body" dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
			</div>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class BasicViewWithDetails extends Component {
	render() {

		let i = 1;
		let text_fields = this.props.fields.map((field) => {
			return (
				<tr key={field.label + '-' + (i++)}>
					<th><strong>{field.label}</strong></th>
					<td>{field.value}</td>
				</tr>
			);
		});
		
		let data_details = this.props.data_details ? this.props.data_details.map((row) => {
			return (
				<tr key={'detail-' + i++}>
					<td>{row.id}</td>
					<td>{row.descricao}</td>
				</tr>
			);
		}) : '';

		let data_labels = this.props.labels_details ? this.props.labels_details.map((col) => {
			return (
				<th key={'col' + i++}>{Messages.getMessage(col)}</th>
			);
		}) : '';

		return (
		<Fragment>
		<div className="card">
			{this.props.removeButtons ? '' :
				<div className="card-header">

					<div className="card-title"><b>{this.props.title}</b>
						{this.props.buttonEditRemove ? '' : <button className="btn btn-primary border-left active" onClick={this.props.onClickEdit}>
							<i className="fas fa-edit" /></button>}
						{this.props.buttonBackRemove ? '' :
							<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
								<i className="fas fa-backward" /></a>}
					</div>
				</div>
			}
			<div className="card-body">
				<div className="row">
					<div className="col-5">
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table profile__table">
									<tbody>
										{text_fields}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="col-7">
						{this.props.navflex}
					</div>
				</div>
				<div className={"row"}>
					{this.props.button_add}
					{this.props.button_cancel}
				</div>
			</div>
		</div>
		{ data_details !== "" &&
		<Fragment>
			<br/>
			<div className="card">
				<div className="card-header"><b>{this.props.title_details}</b></div>
				<div className="card-body">
				<table className="table">
					<thead>
						<tr>
						{ data_labels }
						</tr>
					</thead>
					<tbody>
						{ data_details }
					</tbody>
				</table>
				</div>
			</div>
		</Fragment>
		}
		</Fragment>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class BasicViewWithDetails2 extends Component {

	constructor(props){
		super(props);

		this.state = {
			"detail": null,
		}

		this.handleLoadAnswers = this.handleLoadAnswers.bind(this);
		this.handleLoadAnswersResponse = this.handleLoadAnswersResponse.bind(this);
	}

	handleLoadAnswersResponse(res) {
		debugger
		this.setState({detail: res.data})
	}

	handleLoadAnswers(id) {
		Rest.get('questionario/resposta/' + id).then(this.handleLoadAnswersResponse);
	}

	render() {

		let i = 1;
		let text_fields = this.props.fields.map((field) => {
			return (
				<tr key={field.label + '-' + (i++)}>
					<th><strong>{field.label}</strong></th>
					<td>{field.value}</td>
				</tr>
			);
		});
		
		let data_details = this.props.data_details ? this.props.data_details.map((row) => {
			return (
				<tr key={'detail-' + i++}>
					<td>{row.nome}</td>
					<td>{row.matricula}</td>
					<td>{row.data}</td>
					<td><button answer_id={row.id} onClick={() => this.handleLoadAnswers(row.id)} className="btn btn-success"><i className={ Icons.view }></i></button></td>
				</tr>
			);
		}) : '';

		let data_labels = this.props.labels_details ? this.props.labels_details.map((col) => {
			return (
				<th key={'col' + i++}>{Messages.getMessage(col)}</th>
			);
		}) : '';

		if (data_labels !== '') {
			data_labels = data_labels.concat(<th key={'col' + i++}>Ações</th>)
		}

		let answer_details = this.state.detail ? this.state.detail.respostas.map((ans) => {
			return (
				<tr key={'ans-' + i++} >
					<td>{ ans.pergunta }</td>
					<td>{ ans.resposta_id }</td>
				</tr>
			);
		}) : '';

		return (
		<Fragment>
		<div className="card">
			{this.props.removeButtons ? '' :
				<div className="card-header">
					<div className="card-title"><b>{this.props.title}</b>
						{this.props.buttonEditRemove ? '' : <button className="btn btn-primary border-left active" onClick={this.props.onClickEdit}>
							<i className="fas fa-edit" /></button>}
						{this.props.buttonBackRemove ? '' :
							<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
								<i className="fas fa-backward" /></a>}
					</div>
				</div>
			}
			<div className="card-body">
				<div className="row">
					<div className="col-5">
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table profile__table">
									<tbody>
										{text_fields}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="col-7">
						{this.props.navflex}
					</div>
				</div>
				<div className={"row"}>
					{this.props.button_add}
					{this.props.button_cancel}
				</div>
			</div>
		</div>
		{ data_details !== "" &&
		<Fragment>
			<br/>
			<div className="card">
				<div className="card-header"><b>{this.props.title_details}</b></div>
				<div className="card-body">
				<table className="table">
					<thead>
						<tr>
						{ data_labels }
						</tr>
					</thead>
					<tbody>
						{ data_details }
					</tbody>
				</table>
				</div>
			</div>
		</Fragment>
		}
		{ this.state.detail !== null &&
		<Fragment>
			<br/>
			<div className="card">
				<div className="card-header"><b>{this.props.title_details}</b></div>
				<div className="card-body">
				<b>Nome: </b> {this.state.detail.nome}<br/>
				<b>Matrícula: </b> {this.state.detail.matricula}<br/>
				<br/>
				<table className="table">
					<thead>
						<tr>
							<th>Pergunta</th>
							<th>Resposta</th>
						</tr>
					</thead>
					<tbody>
						{ answer_details }
					</tbody>
				</table>
				</div>
			</div>
		</Fragment>
		}



		</Fragment>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class BasicView extends Component {
	render() {

		let i = 1;
		let text_fields = this.props.fields.map((field) => {
			return (
				<tr key={field.label + '-' + (i++)}>
					<th><strong>{field.label}</strong></th>
					<td>{field.value}</td>
				</tr>
			);
		});

		return (<div className="card">
			{this.props.removeButtons ? '' :
				<div className="card-header">

					<div className="card-title"><b>{this.props.title}</b>
						{this.props.buttonEditRemove ? '' : <button className="btn btn-primary border-left active" onClick={this.props.onClickEdit}>
							<i className="fas fa-edit" /></button>}
						{this.props.buttonBackRemove ? '' :
							<a className="btn btn-primary border-right" href={"javascript:history.back();"}>
								<i className="fas fa-backward" /></a>}
					</div>
				</div>
			}
			<div className="card-body">
			
				<div className="row">
					<div className="col-5">
						<div className="panel panel-default">
							<div className="panel-body">
								<table className="table profile__table">
									<tbody>
										{text_fields}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="col-7">
						{this.props.navflex}
					</div>
				</div>
				<div className={"row"}>
					{this.props.details}
				</div>
				<div className={"row"}>
					{this.props.button_add}
					{this.props.button_cancel}
				</div>
			</div>
		</div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Filter extends Component {


	render() {

		let input_fields = this.props.fields.map((field) => {
			return (<div className={"form-group col-auto"} key={field.label}>
				<input className={"form-control col-auto"} type={field.type} id={this.props.label} placeholder={Messages.getMessage(field.label)} name={field.field}
					autoFocus={this.props.autofocus} onChange={this.props.onChange} />
			</div>);
		});

		return (

			<div className="container-fluid mt-4 ml-0 p-0">

				<div className="form-inline col-sm-12 p-1">
					{input_fields}
					<div className={"form-group col-auto"}>
						<Tooltip title="Filtrar" placement="top" arrow>

							<button type="submit" className="btn btn-success mt-0" onClick={this.props.onSubmit}><i className={"fas fa-filter"} /></button>

						</Tooltip>
					</div>
				</div>

			</div>);
	}
}


/*----------------------------------------------------------------------------------------------------*/

class Modal extends Component {
	constructor(props) {
		super(props);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClickYes = this.handleClickYes.bind(this);
		this.state = {
			open:false
		}
	}

	handleClickOpen (){
		if(this.props.remember)
			this.props.act.handle(null, this.props.register.id);
		else
			this.setState(({open:true}));
	}

	handleClose() {
		this.props.dontRemember();
		this.setState(({open:false}));
	}

	handleClickYes(e) {
		this.setState(({open:false}));
		this.props.act.handle(e, this.props.register.id);
	}

	render() {
		return (
			<div style={{width: "100%"}}>
                <LightTooltip key={ 213876253 } title={Hints[this.props.act.field]} placement={"top"} arrow>
			<button key={ this.props.key } className={"w-33 btn btn-secondary btn-action"} style={ {width: "100%", background:ButtonColors[this.props.act.field]}} onClick={this.handleClickOpen}><i className={ Icons[this.props.act.field] }/>
			</button>
                </LightTooltip>
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Deseja realmente excluir?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={this.handleClose} color="primary">
						Não
					</Button>
					<Button onClick={ this.handleClickYes } color="primary" autoFocus>
						Sim
					</Button>
				</DialogActions>
				
			</Dialog>
			</div>
		)
	}
}

export { CenterCard, AlertDangerForm, NavBar, SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem,
		 SideBarDropDownGroup, SideBarDropDownDivider, Footer, ScrollToTop, TableData, TableData2, CenterCard2, FormPage,
		  FormRow, FormCol, BasicView, Filter, FormColapse, HtmlContentView, BasicViewWithDetails, CardBordered,
		  BasicViewWithDetails2};

