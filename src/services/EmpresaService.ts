import Empresa from "models/geral/Empresa";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class EmpresaService {
    
    async obterTodos(pageable: IPageable): Promise<IPage<Empresa>> {
		throw new Error("Método não implementado");
	}
	
	async obterPorId(id: number): Promise<Empresa> {
		throw new Error("Método não implementado");
	}
	
	async obterPorCnpj(cnpj: string): Promise<Empresa> {
		throw new Error("Método não implementado");
	}
	
	async obterPorNome(nome: string): Promise<Empresa[]> {
		throw new Error("Método não implementado");
	}
	
	async salvar(empresa: Empresa): Promise<Empresa> {
		throw new Error("Método não implementado");
	}
	
	async editar(empresa: Empresa): Promise<Empresa> {
		throw new Error("Método não implementado");
	}
	
	async remover(empresa: Empresa): Promise<void> {
		throw new Error("Método não implementado");
	}
}