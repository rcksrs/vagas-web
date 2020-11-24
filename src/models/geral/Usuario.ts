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