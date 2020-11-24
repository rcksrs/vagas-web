import Empresa from "./Empresa";
import Endereco from "./Endereco";
import Usuario from "./Usuario";

export default interface Funcionario {
	id: number;
    nome: string;
	matricula: string;
	cargo: string;
	dataNascimento: Date;
	endereco: Endereco;
	empresa: Empresa;
	usuario: Usuario;
}