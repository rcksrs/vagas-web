import Funcionario from "models/geral/Funcionario";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class FuncionarioService {

    async obterTodos(pageable: IPageable): Promise<IPage<Funcionario>> {
		const response = await api.get<IPage<Funcionario>>("funcionario", {params: pageable});
		return response.data;
	}

	async listarTodos(): Promise<Funcionario[]> {
		const response = await api.get<Funcionario[]>("funcionario/listar");
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Funcionario> {
		const response = await api.get<Funcionario>("funcionario/" + id);
		return response.data;
	}
	
	async obterPorNome(nome: string): Promise<Funcionario[]> {
		const response = await api.get<Funcionario[]>("funcionario/nome/" + nome);
		return response.data;
	}
	
	async obterPorMatricula(matricula: string): Promise<Funcionario> {
		const response = await api.get<Funcionario>("funcionario/matricula/" + matricula);
		return response.data;
	}
	
	async obterPorEmpresa(empresaId: number): Promise<Funcionario[]> {
		const response = await api.get<Funcionario[]>("funcionario/empresa/" + empresaId);
		return response.data;
	}
	
	async salvar(funcionario: Funcionario): Promise<Funcionario> {
		if(funcionario.id) {
			const response = await api.put<Funcionario>("funcionario", funcionario);
			return response.data;
		}
		const response = await api.post<Funcionario>("funcionario", funcionario);
		return response.data;
	}
	
	async remover(funcionario: Funcionario): Promise<void> {
		await api.delete("funcionario", {data: funcionario});
		return;
	}
}