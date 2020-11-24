import Experiencia from "./Experiencia";
import Formacao from "./Formacao";
import Idioma from "./Idioma";

export default interface Perfil {
	id: number;
    resumo: string;
	urlLattes: string;
	urlImagem: string;
    experiencias: [Experiencia];
	formacoes: [Formacao];
	idiomas: [Idioma];
}