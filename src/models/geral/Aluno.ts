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
	"email" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'email', message: 'Informe um email válido'},
	],
	"senha" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ min: 5, message: 'Insira ao menos 5 caracteres' },
		{ max: 20, message: 'Insira no máximo 20 caracteres' },
	],
	"data" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'date', message: 'Informe uma data válida'},
	],
	"opcao" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};