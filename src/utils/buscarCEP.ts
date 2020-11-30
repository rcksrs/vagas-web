import Axios from "axios";
import Endereco from "models/geral/Endereco";

const cepAPI = Axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default async function buscarCEP(cep: string) {
    try {
        cep = cep.replace('.', '').replace('-', '');
        const response = await cepAPI.get(`${cep}/json/`);
        if(response.data.erro) return;
        const endereco: Endereco = {
            cep: cep,
            pais: "Brasil",
            estado: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro,
            logradouro: response.data.logradouro
        }
        console.log(endereco);
        return endereco;

        
    } catch (error) {
        return;
    }
}