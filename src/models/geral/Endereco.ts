export default interface Endereco {
    cep: string;
	pais?: string;
	estado?: string;
	cidade?: string;
	bairro?: string;
	logradouro?: string;
	numero?: string;
	complemento?: string;
	referencia?: string;
}

export const enderecoValidation = {
	"cep" : [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};