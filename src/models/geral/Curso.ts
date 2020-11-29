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
	nome : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	semestres : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'integer' as const, min: 0, message: 'A quantidade de semestres deve ser maior que 0'},
	],
	chTotal : [
		{ type: 'integer' as const, min: 0, message: 'A carga horária deve ser maior que 0'},
	],
	modalidade : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	tipo : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	empresa : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};