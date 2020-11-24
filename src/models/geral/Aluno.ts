import Curso from "./Curso";
import Endereco from "./Endereco";
import Usuario from "./Usuario";

export default interface Aluno {
	id: number;
    nome: string;
	matricula: string;
	dataNascimento: Date;
	dataIngresso: Date;
	endereco: Endereco;
	curso: Curso;
	usuario: Usuario;
}