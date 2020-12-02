import Aluno from "models/geral/Aluno";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class AlunoService {
    
    async obterTodos(pageable?: IPageable): Promise<IPage<Aluno>> {
		const response = await api.get<IPage<Aluno>>("aluno", {params: pageable});
		return response.data;
	}

	async listarTodos(): Promise<Aluno[]> {
		const response = await api.get<Aluno[]>("aluno/listar");
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Aluno> {
		const response = await api.get<Aluno>("aluno/" + id);
		return response.data;
	}
	
	async obterPorMatricula(matricula: string): Promise<Aluno> {
		const response = await api.get<Aluno>("aluno/matricula/" + matricula);
		return response.data;
	}
	
	async obterPorNome(nome: string): Promise<Aluno[]> {
		const response = await api.get<Aluno[]>("aluno/nome/" + nome);
		return response.data;
	}	
	
	async obterPorCurso(cursoId: number): Promise<Aluno[]> {
		const response = await api.get<Aluno[]>("aluno/curso/" + cursoId);
		return response.data;
	}
	
	async salvar(aluno: Aluno): Promise<Aluno> {
		if(aluno.id) {
			const response = await api.put<Aluno>("aluno", aluno);
			return response.data;
		}
		const response = await api.post<Aluno>("aluno", aluno);
		return response.data;
	}
	
	async remover(aluno: Aluno): Promise<void> {
		await api.delete("aluno", {data: aluno});
		return;
	}
}