import Aluno from "models/geral/Aluno";
import Vaga from "./Vaga";

export default interface AlunoVaga {
    selecionado: boolean;
    pontuacao: number;
    aluno: Aluno;
    vaga: Vaga;
}