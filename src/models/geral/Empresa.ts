import Endereco from "./Endereco";
import cnpjValidator from "utils/cnpjValidator";

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

export const empresaValidation = {
	"nome": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"cnpj": [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ validator: cnpjValidator}
	],
	"representante": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"email": [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'email' as const, message: 'Informe um email válido'},
	],
	"telefone": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};