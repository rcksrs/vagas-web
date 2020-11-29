import Funcionario from "models/geral/Funcionario";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class FuncionarioService {

    async obterTodos(pageable: IPageable): Promise<IPage<Funcionario>> {
		throw new Error("Método não implementado");
	}
	
	async obterPorId(id: number): Promise<Funcionario> {
		throw new Error("Método não implementado");
	}
	
	async obterPorNome(nome: number): Promise<Funcionario[]> {
		throw new Error("Método não implementado");
	}
	
	async obterPorMatricula(matricula: string): Promise<Funcionario> {
		throw new Error("Método não implementado");
	}
	
	async obterPorEmpresa(empresaId: number): Promise<Funcionario[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(funcionario: Funcionario): Promise<Funcionario> {
		throw new Error("Método não implementado");
	}
	
	async editar(funcionario: Funcionario): Promise<Funcionario> {
		throw new Error("Método não implementado");
	}
	
	async remover(funcionario: Funcionario): Promise<void> {
		throw new Error("Método não implementado");
	}
}