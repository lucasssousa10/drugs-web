import React, { Component } from 'react';
import { Icons } from '../../iconSet';
import { SideBar, SideBarItem, SideBarDropDown, SideBarDropDownItem} from '../template/Layout';

/*----------------------------------------------------------------------------------------------------*/
/*  Administrador  */
class Administrador extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
				<SideBarItem active={ false } url="/user/list" name='menu.user.title' icon={ Icons.user } />

				{/* <SideBarItem active={ false } url="/estudante/list" name='menu.estudante.title' icon={ Icons.users } />
				<SideBarItem active={ false } url="/centro-estagio/list" name='menu.centro_estagio.title' icon={ Icons.stagecenter } />
				<SideBarItem active={ false } url="/escola/list" name='menu.escola.title' icon={ Icons.company } />
	            <SideBarItem active={ false } url="/empresa/list" name='menu.empresa.title' icon={ Icons.company } />
                <SideBarItem active={ false } url="/contrato-empresa/list" name='menu.contrato_empresa.title' icon={ Icons.table } />

                <SideBarDropDown name='menu.regras' icon={Icons.table}>
                    <SideBarDropDownItem url="/regras-empresa/list" name='menu.regras_empresa.title' />
                    <SideBarDropDownItem url="/regras-curso/list" name='menu.regras_curso.title' />
                    <SideBarDropDownItem url="/regras-ambientacao/list" name='menu.regras_ambientacao.title' />
                    <SideBarDropDownItem url="/regras-ausencias/list" name='menu.regras_ausencias.title' />
                </SideBarDropDown>

                <SideBarItem active={ false } url="/contrato-estudante/list" name='menu.contrato_estudante.title' icon={ Icons.table } />
                <SideBarItem active={ false } url="/curso-formacao/list" name='menu.curso_formacao.title' icon={ Icons.table } />
                <SideBarItem active={ false } url="/modulo/list" name='menu.modulo.title' icon={ Icons.table } />
                <SideBarItem active={ false } url="/seguradora/list" name='menu.seguradora.title' icon={ Icons.table } />
                <SideBarItem active={ false } url="/apolice/list" name='menu.apolice.title' icon={ Icons.table } />

			

				<SideBarItem active={ false } url="/vaga/list" name='menu.vaga.title' icon={ Icons.table} />
				<SideBarDropDown name='menu.vagas' icon={ Icons.config }> 
					<SideBarDropDownItem name='menu.beneficio.title' url="/beneficio/list" />
					<SideBarDropDownItem name='menu.convocacao_vaga.title' url="/convocacao-vaga/list" />
				</SideBarDropDown>

				<SideBarDropDown name='menu.student' icon={ Icons.config } >
                    <SideBarDropDownItem name='menu.estado_civil.title' url="/estado-civil/list" />
                    <SideBarDropDownItem name='menu.categoria_habilitacao.title' url="/categoria-habilitacao/list" />
                    <SideBarDropDownItem name='menu.tipo_conhecimento.title' url="/tipo-conhecimento/list" />
                    <SideBarDropDownItem name='menu.tipo_estudante.title' url="/tipo-estudante/list" />
                    <SideBarDropDownItem name='menu.tipo_veiculo.title' url="/tipo-veiculo/list" />
                    <SideBarDropDownItem name='menu.periodo_curso.title' url="/periodo-curso/list" />
                    <SideBarDropDownItem name='menu.grau_instrucao.title' url="/grau-instrucao/list" />
					<SideBarDropDownItem name='menu.curso_estudante.title' url="/curso-estudante/list" />
					<SideBarDropDownItem name='menu.cbo.title' url="/cbo/list" />
					<SideBarDropDownItem name='menu.conhecimento.title' url="/conhecimento/list" />

				</SideBarDropDown> */}
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
/*  Usuário  */
class Usuario extends Component 
{
	render()
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
				<SideBarItem active={ false } url="/user/list" name='menu.user.title' icon={ Icons.users } />
				
				{/* <SideBarDropDown name='menu.student' icon={ Icons.config } >
                    <SideBarDropDownItem name='menu.estado_civil.title' url="/estado-civil/list" />
                    <SideBarDropDownItem name='menu.categoria_habilitacao.title' url="/categoria-habilitacao/list" />
                    <SideBarDropDownItem name='menu.tipo_conhecimento.title' url="/tipo-conhecimento/list" />
                    <SideBarDropDownItem name='menu.tipo_estudante.title' url="/tipo-estudante/list" />
                    <SideBarDropDownItem name='menu.tipo_veiculo.title' url="/tipo-veiculo/list" />
                    <SideBarDropDownItem name='menu.periodo_curso.title' url="/periodo-curso/list" />
                    <SideBarDropDownItem name='menu.grau_instrucao.title' url="/grau-instrucao/list" />
					<SideBarDropDownItem name='menu.curso_estudante.title' url="/curso-estudante/list" />
					<SideBarDropDownItem name='menu.cbo.title' url="/cbo/list" />
					<SideBarDropDownItem name='menu.conhecimento.title' url="/conhecimento/list" />

				</SideBarDropDown> */}
			</SideBar>
		);
	}
}

/*----------------------------------------------------------------------------------------------------*/
/*  Estudante  */

class Estudante extends Component 
{
	render() 
	{
		return (
			<SideBar>
				<SideBarItem active={ false } url="/" name='menu.dashboard' icon={ Icons.dashboard } />
				{/* <SideBarItem active={ false } url="/centro-estagio/list" name='menu.centro_estagio.title' icon={ Icons.stagecenter } />
				<SideBarItem active={ false } url="/estudante/list" name='menu.estudante.title' icon={ Icons.users } />
				<SideBarItem active={ false } url="/escola/list" name='menu.escola.title' icon={ Icons.company } />
	            <SideBarItem active={ false } url="/empresa/list" name='menu.empresa.title' icon={ Icons.company } />
                <SideBarItem active={ false } url="/contrato-empresa/list" name='menu.contrato_empresa.title' icon={ Icons.table } />
				<SideBarItem active={ false } url="/vaga/list" name='menu.vaga.title' icon={ Icons.table} />
                <SideBarItem active={ false } url="/contrato-estudante/list" name='menu.contrato_estudante.title' icon={ Icons.table } /> */}

				{/* <SideBarDropDown name='menu.vagas' icon={ Icons.config }> 
					<SideBarDropDownItem name='menu.beneficio.title' url="/beneficio/list" />
					<SideBarDropDownItem name='menu.convocacao_vaga.title' url="/convocacao-vaga/list" />
				</SideBarDropDown> */}
			</SideBar>
		);
	}
}

export { Administrador, Usuario, Estudante };