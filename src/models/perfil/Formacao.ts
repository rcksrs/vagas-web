import TipoCurso from "models/geral/TipoCurso";

export default interface Formacao {
	id: number;
    local: string;
	dataInicio: Date;
	dataFim: Date;
	tipo: TipoCurso;
}