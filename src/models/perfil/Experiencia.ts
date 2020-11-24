import TipoExperiencia from "./TipoExperiencia";

export default interface Experiencia {
	id: number;
    titulo: string;
	descricao: string;
	urlComprovante: string;
	local: string;
	dataInicio: Date;
	dataFim: Date;
	tipo: TipoExperiencia;
}