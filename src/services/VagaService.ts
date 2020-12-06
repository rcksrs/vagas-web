import Aluno from "models/geral/Aluno";
import TipoExperiencia from "models/perfil/TipoExperiencia";
import AlunoVaga from "models/vaga/AlunoVaga";
import Vaga from "models/vaga/Vaga";
import api from "utils/api";
import IPage from "utils/IPage";
import IPageable from "utils/IPageable";

export default class VagaService {
    
    async obterTodos(pageable?: IPageable): Promise<IPage<Vaga>> {
		const response = await api.get<IPage<Vaga>>("vaga", {params: pageable});
		return response.data;
	}

	async listarTodos(): Promise<Vaga[]> {
		const response = await api.get<Vaga[]>("vaga/listar");
		return response.data;
	}
	
	async obterPorId(id: number): Promise<Vaga> {
		const response = await api.get<Vaga>("vaga/" + id);
		return response.data;
	}
	
	async filtrarPorData(dataInicial: Date, dataFinal: Date): Promise<Vaga[]> {
		const response = await api.get<Vaga[]>(`vaga/data/${dataInicial}/${dataFinal}`);
		return response.data;
	}

	async obterTiposExperiencia(): Promise<TipoExperiencia[]> {
		const response = await api.get<TipoExperiencia[]>("vaga/tipo");
		return response.data;
	}
	
	async obterPorTipoExperiencia(tipoExperienciaId: number): Promise<Vaga[]> {
		const response = await api.get<Vaga[]>("vaga/tipo/" + tipoExperienciaId);
		return response.data;
	}
	
	async obterPorEmpresa(empresaId: number): Promise<Vaga[]> {
		const response = await api.get<Vaga[]>("vaga/empresa/" + empresaId);
		return response.data;
	}
	
	async statusAlunoVaga(alunoId: number, vagaId: number): Promise<AlunoVaga> {
		const response = await api.get<AlunoVaga>(`vaga/status/${alunoId}/${vagaId}`);
		return response.data;
	}
	
	async obterInscricoesPorAluno(alunoId: number): Promise<AlunoVaga[]> {
		const response = await api.get<AlunoVaga[]>("vaga/inscricoes/" + alunoId);
		return response.data;
	}
	
	async obterAlunosPorVaga(vagaId: number): Promise<AlunoVaga[]> {
		const response = await api.get<AlunoVaga[]>("vaga/status/" + vagaId);
		return response.data;
	}
	
	async salvar(vaga: Vaga): Promise<Vaga> {
		const response = await api.post<Vaga>("vaga", vaga);
		return response.data;
	}
	
	async candidatar(aluno: Aluno, vagaId: number): Promise<AlunoVaga> {
		const response = await api.post<AlunoVaga>("vaga/candidatar/" + vagaId, aluno);
		return response.data;
	}
	
	async remover(vaga: Vaga): Promise<void> {
		await api.delete("vaga", {data: vaga});
		return;
	}
}