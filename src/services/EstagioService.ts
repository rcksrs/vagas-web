import VinculoEstagio from "models/estagio/VinculoEstagio";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class EstagioService {

    async obterTodos(pageable?: IPageable): Promise<IPage<VinculoEstagio>> {
		const response = await api.get<IPage<VinculoEstagio>>("estagio", {params: pageable});
		return response.data;
	}
	
	async obterPorId(id: number): Promise<VinculoEstagio> {
		const response = await api.get<VinculoEstagio>("estagio/" + id);
		return response.data;
	}
	
	async obterPorAluno(alunoId: number): Promise<VinculoEstagio[]> {
		const response = await api.get<VinculoEstagio[]>("estagio/aluno/" + alunoId);
		return response.data;
	}
	
	async obterPorEmpresa(empresaId: number): Promise<VinculoEstagio[]> {
		const response = await api.get<VinculoEstagio[]>("estagio/empresa/" + empresaId);
		return response.data;
	}
	
	async salvar(estagio: VinculoEstagio): Promise<VinculoEstagio> {
		const response = await api.post<VinculoEstagio>("estagio", estagio);
		return response.data;
	}
	
	async editar(estagio: VinculoEstagio): Promise<VinculoEstagio> {
		const response = await api.put<VinculoEstagio>("estagio", estagio);
		return response.data;
	}
	
	async remover(estagio: VinculoEstagio): Promise<void> {
		await api.delete("estagio", {data: estagio});
		return;
	}
}