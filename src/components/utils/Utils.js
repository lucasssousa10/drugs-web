
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/*----------------------------------------------------------------------------------------------------*/

const formatString = (format, parameters) => 
{
	let formattedString = format;

	for (let i = 0; i < parameters.length; i++) {
		formattedString = formattedString.replace("{"+ i +"}", parameters[i]);
	}

	return formattedString;
}

/*----------------------------------------------------------------------------------------------------*/

const Days = [{id:1, nome:"Segunda-feira"},{id:2, nome:"Terça-feira"},{id:3, nome:"Quarta-feira"},{id:4, nome:"Quinta-feira"}
				,{id:5, nome:"Sexta-feira"},{id:6, nome:"Sábado"},{id:7, nome:"Domingo"}]

/*------------------------------------------------------------------------------------------------*/

const getDay = (value) =>
{
	for (let i = 0; i < 7; i++) {
		if (Days[i]["value"] === value) {
			return Days[i]["nome"];
		}
	}
};

/*----------------------------------------------------------------------------------------------------*/

const Bool = [{id : "true", nome: "Sim"}, {id : "false", nome: "Não"}]


/*----------------------------------------------------------------------------------------------------*/

const Months = [{value:1, nome:"Janeiro"}, {value:2, nome:"Fevereiro"}, {value:3, nome:"Março"}, {value:4, nome:"Abril"},
	{value:5, nome:"Maio"}, {value:6, nome:"Junho"}, {value:7, nome:"Julho"}, {value:8, nome:"Agosto"},
	{value:9, nome:"Setembro"}, {value:10, nome:"Outubro"}, {value:11, nome:"Novembro"}, {value:12, nome:"Dezembro"}];

/*----------------------------------------------------------------------------------------------------*/

const getMonth = (value) =>
{
	for (let i = 0; i < 12; i++) {
		if (Months[i]["value"] === value) {
			return Months[i]["nome"];
		}
	}
};


export { sleep, formatString , Months, getMonth, getDay, Days, Bool}
