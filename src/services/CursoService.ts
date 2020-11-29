import Curso from 'models/geral/Curso'
import IPage from 'utils/IPage';
import IPageable from 'utils/IPageable';
import api from 'utils/api';
import TipoCurso from 'models/geral/TipoCurso';

export default class CursoService {

    async obterTodos(pageable?: IPageable): Promise<IPage<Curso>> {
		const response = await api.get<IPage<Curso>>("curso", {params: pageable});
		return response.data;
	}

	async listarTodos(): Promise<Curso[]> {
		const response = await api.get<Curso[]>("curso/listar");
		return response.data;
	}

	async listarTiposCurso(): Promise<TipoCurso[]> {
		const response = await api.get<TipoCurso[]>("curso/tipo");
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Curso> {
		const response = await api.get<Curso>("curso/" + id);
		return response.data;
	}
	
	async obterPorNome(nome: string): Promise<Curso[]> {
		const response = await api.get<Curso[]>("curso/nome/" + nome);
		return response.data;
	}
	
	async salvar(curso: Curso): Promise<Curso> {
		const response = await api.post<Curso>("curso", curso);
		return response.data;
	}
	
	async editar(curso: Curso): Promise<Curso> {
		const response = await api.put<Curso>("curso", curso)
		return response.data;
	}
	
	async remover(curso: Curso): Promise<void> {
		await api.delete("curso", {data: curso});
		return;
	}
}