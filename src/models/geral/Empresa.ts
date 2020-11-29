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

export const empresaValidation = {
	"email" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'email', message: 'Informe um email válido'},
	],
	"senha" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ min: 5, message: 'Insira ao menos 5 caracteres' },
		{ max: 20, message: 'Insira no máximo 20 caracteres' },
	],
	"data" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'date', message: 'Informe uma data válida'},
	],
	"opcao" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};