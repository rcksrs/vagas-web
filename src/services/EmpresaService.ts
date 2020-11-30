import Empresa from "models/geral/Empresa";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class EmpresaService {
    
    async obterTodos(pageable?: IPageable): Promise<IPage<Empresa>> {
		const response = await api.get<IPage<Empresa>>("empresa", {params: pageable});
		return response.data;
	}

	async listarTodos(): Promise<Empresa[]> {
		const response = await api.get<Empresa[]>("empresa/listar");
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Empresa> {
		const response = await api.get<Empresa>("empresa/" + id);
		return response.data;
	}
	
	async obterPorCnpj(cnpj: string): Promise<Empresa> {
		const response = await api.get<Empresa>("empresa/cnpj/" + cnpj);
		return response.data;
	}
	
	async obterPorNome(nome: string): Promise<Empresa[]> {
		const response = await api.get<Empresa[]>("empresa/nome/" + nome);
		return response.data;
	}
	
	async salvar(empresa: Empresa): Promise<Empresa> {
		if(empresa.id){
			const response = await api.put<Empresa>("empresa", empresa);
			return response.data;
		}
		const response = await api.post<Empresa>("empresa", empresa);
		return response.data;
	}
	
	async remover(empresa: Empresa): Promise<void> {
		await api.delete("empresa", {data: empresa});
		return;
	}
}