export default interface Idioma {
	id: number;
    idioma: string;
	nivel: Nivel;
}

enum Nivel {
    BASICO,
	INTERMEDIARIO,
	AVANCADO,
	FLUENTE,
	NATIVO
}