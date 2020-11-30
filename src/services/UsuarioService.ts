import Usuario from "models/geral/Usuario";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class UsuarioService {

    async obterTodos(pageable: IPageable): Promise<IPage<Usuario>> {
		const response = await api.get<IPage<Usuario>>("usuario", {params: pageable});
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Usuario> {
		const response = await api.get<Usuario>("usuario/" + id);
		return response.data;
	}
	
	async obterPorCpf(cpf: string): Promise<Usuario> {
		const response = await api.get<Usuario>("usuario/cpf/" + cpf);
		return response.data;
	}
	
	async obterPorEmail(email: string): Promise<Usuario> {
		const response = await api.get<Usuario>("usuario/email/" + email);
		return response.data;
	}
	
	async obterPorResumoPerfil(resumo: string): Promise<Usuario[]> {
		const response = await api.get<Usuario[]>("usuario/perfil/resumo", {params: resumo});
		return response.data;
	}
	
	async salvar(usuario: Usuario): Promise<Usuario> {
		if(usuario.id) {
			const response = await api.put<Usuario>("usuario", usuario);
			return response.data;
		}
		const response = await api.post<Usuario>("usuario", usuario);
		return response.data;
	}
	
	async remover(usuario: Usuario): Promise<void> {
		await api.delete("usuario", {data: usuario});
		return;
	}
}