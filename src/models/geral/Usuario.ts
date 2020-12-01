import Perfil from "models/perfil/Perfil";

export default interface Usuario {
	id: number;
	cpf: string;
	email: string;
	emailConfirmado: boolean;
	telefone: string;
	telefoneConfirmado: boolean;
	senha?: string;
	perfil?: Perfil;
}

export const usuarioValidation = {
	"cpf": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
	"email": [
		{ required: true, message: 'Este campo deve ser preenchido' },
		{ type: 'email' as const, message: 'Informe um email válido'},
	],
	"senha": [
		{ required: true, message: 'Este campo deve ser preenchido' },
	],
};