import Curso from "models/geral/Curso";
import Empresa from "models/geral/Empresa";
import TipoExperiencia from "models/perfil/TipoExperiencia";
import { Moment } from "moment";
import { minDateValidator } from "utils/dateValidator";

export default interface Vaga {
    id: number;
    titulo: string;
	descricao: string;
	vagas: number;
	abertura: Moment;
	encerramento: Moment;
	tipo: TipoExperiencia;
	empresa: Empresa;
	cursos: Curso[];
}

export const vagaValidation = {
	"titulo" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ max: 100, message: 'Este campo não deve ter mais que 100 caracteres' },
	],
	"descricao" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"vagas" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'integer' as const, min: 1, message: 'A quantidade de vagas deve ser maior que 0'},
	],
	"abertura" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ validator: minDateValidator },
	],
	"encerramento" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ validator: minDateValidator },
	],
	"tipo" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"empresa" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	]
};