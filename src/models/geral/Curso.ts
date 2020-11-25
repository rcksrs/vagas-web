import Empresa from "./Empresa";
import TipoCurso from "./TipoCurso";

export default interface Curso {
	id: number;
    nome: string;
	chTotal: number;
	semestres: number;
	modalidade: Modalidade;
	tipo: TipoCurso;
	empresa: Empresa;
}

enum Modalidade {
    PRESENCIAL = 'PRESENCIAL',
	SEMIPRESENCIAL = 'SEMIPRESENCIAL',
	EAD = 'EAD'
}

export const cursoValidation = {
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