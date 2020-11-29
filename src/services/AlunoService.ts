import Aluno from "models/geral/Aluno";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class AlunoService {
    
    async obterTodos(pageable: IPageable): Promise<IPage<Aluno>> {
		throw new Error("Método não implementado");
	}
	
	async obterPorId(id: number): Promise<Aluno> {
		throw new Error("Método não implementado");
	}
	
	async obterPorMatricula(matricula: string): Promise<Aluno> {
		throw new Error("Método não implementado");
	}
	
	async obterPorNome(nome: string): Promise<Aluno[]> {
		throw new Error("Método não implementado");
	}	
	
	async obterPorCurso(cursoId: number): Promise<Aluno[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(aluno: Aluno): Promise<Aluno> {
		throw new Error("Método não implementado");
	}
	
	async editar(aluno: Aluno): Promise<Aluno> {
		throw new Error("Método não implementado");
	}
	
	async remover(aluno: Aluno): Promise<void> {
		throw new Error("Método não implementado");
	}
}