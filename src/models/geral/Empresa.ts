import Endereco from "./Endereco";

export default interface Empresa {
	id: number;
    nome: string;
	cnpj: string;
	natureza: string;
	representante: string;
	email: string;
	site: string;
	telefone: string;
	endereco: Endereco;
}