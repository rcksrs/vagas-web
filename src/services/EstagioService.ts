import VinculoEstagio from "models/estagio/VinculoEstagio";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class EstagioService {

    async obterTodos(pageable: IPageable): Promise<IPage<VinculoEstagio>> {
		throw new Error("Método não implementado");
	}
	
	async obterPorId(id: number): Promise<VinculoEstagio> {
		throw new Error("Método não implementado");
	}
	
	async obterPorAluno(alunoId: number): Promise<VinculoEstagio> {
		throw new Error("Método não implementado");
	}
	
	async obterPorEmpresa(empresaId: number): Promise<VinculoEstagio[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(estagio: VinculoEstagio): Promise<VinculoEstagio> {
		throw new Error("Método não implementado");
	}
	
	async editar(estagio: VinculoEstagio): Promise<VinculoEstagio> {
		throw new Error("Método não implementado");
	}
	
	async remover(estagio: VinculoEstagio): Promise<void> {
		throw new Error("Método não implementado");
	}
}