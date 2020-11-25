import Curso from 'models/geral/Curso'
import IPage from 'utils/IPage';
import IPageable from 'utils/IPageable';
import api from 'utils/api';

export default class CursoService {

    async obterTodos(pageable?: IPageable): Promise<IPage<Curso[]>> {
		const response = await api.get<IPage<Curso[]>>("curso");
		if(response.status === 200) {
			console.log(response.data.content);
			return response.data;
		}
		throw new Error("Erro");
	}
	
	async obterPorId(id: number): Promise<Curso> {
		throw new Error("Método não implementado");	
	}
	
	async obterPorNome(nome: string): Promise<Curso[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(curso: Curso): Promise<Curso> {
		throw new Error("Método não implementado");
	}
	
	async editar(curso: Curso): Promise<Curso> {
		throw new Error("Método não implementado");
	}
	
	async remover(curso: Curso): Promise<void> {
		throw new Error("Método não implementado");
	}
}