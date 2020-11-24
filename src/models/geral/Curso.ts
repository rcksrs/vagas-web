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
    PRESENCIAL,
	SEMIPRESENCIAL,
	EAD
}