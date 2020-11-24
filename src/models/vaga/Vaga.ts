import Curso from "models/geral/Curso";
import Empresa from "models/geral/Empresa";
import TipoExperiencia from "models/perfil/TipoExperiencia";

export default interface Vaga {
    id: number;
    titulo: string;
	descricao: string;
	vagas: number;
	abertura: Date;
	encerramento: Date;
	tipo: TipoExperiencia;
	empresa: Empresa;
	cursos: [Curso];
}