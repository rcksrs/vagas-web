import Usuario from "models/geral/Usuario";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class UsuarioService {

    async obterTodos(pageable: IPageable): Promise<IPage<Usuario>> {
		throw new Error("Método não implementado");
	}
	
	async obterPorId(id: number): Promise<Usuario> {
		throw new Error("Método não implementado");
	}
	
	async obterPorCpf(cpf: string): Promise<Usuario> {
		throw new Error("Método não implementado");
	}
	
	async obterPorEmail(email: string): Promise<Usuario> {
		throw new Error("Método não implementado");
	}
	
	async obterPorResumoPerfil(resumo: string): Promise<Usuario[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(usuario: Usuario): Promise<Usuario> {
		throw new Error("Método não implementado");
	}
	
	async editar(usuario: Usuario): Promise<Usuario> {
		throw new Error("Método não implementado");
	}
	
	async remover(usuario: Usuario): Promise<void> {
		throw new Error("Método não implementado");
	}
}