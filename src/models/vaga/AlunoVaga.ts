import Aluno from "models/geral/Aluno";
import Vaga from "./Vaga";

export default interface AlunoVaga {
    id: AlunoVagaId;
    selecionado: boolean;
    pontuacao: number;
    criadoEm: Date;
}

interface AlunoVagaId {
    aluno: Aluno;
    vaga: Vaga;
}