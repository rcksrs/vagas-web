import Aluno from "models/geral/Aluno";
import Empresa from "models/geral/Empresa";

export default interface VinculoEstagio {
	id: number;
    dataInicio: Date;
	dataFim: Date;
	aluno: Aluno;
	empresa: Empresa;
	aditivos: Aditivo[];
}

interface Aditivo {
	id: number;
    termo: string;
	observacao: string;
	dataInicio: Date;
	dataFim: Date;
}