import { Moment } from "moment";
import Empresa from "./Empresa";
import Endereco from "./Endereco";
import Usuario from "./Usuario";

export default interface Funcionario {
	id: number;
    nome: string;
	matricula: string;
	cargo: string;
	dataNascimento: Moment;
	endereco: Endereco;
	empresa: Empresa;
	usuario: Usuario;
}

export const funcionarioValidation = {
	"nome": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"matricula": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"dataNascimento": [
		{ type: 'date' as const, message: 'Informe uma data válida'},
	],
	"cargo": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"empresa" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};