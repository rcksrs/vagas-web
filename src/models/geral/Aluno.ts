import { Moment } from "moment";
import Curso from "./Curso";
import Endereco from "./Endereco";
import Usuario from "./Usuario";

export default interface Aluno {
	id: number;
    nome: string;
	matricula: string;
	dataNascimento: Moment;
	dataIngresso: Moment;
	endereco: Endereco;
	curso: Curso;
	usuario: Usuario;
}

export const alunoValidation = {
	"nome": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"matricula": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"dataNascimento" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'date' as const, message: 'Informe uma data válida'},
	],
	"dataIngresso" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'date' as const, message: 'Informe uma data válida'},
	],
	"curso" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};