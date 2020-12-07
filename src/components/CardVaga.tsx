import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, List, Space, Tag, Tooltip } from "antd";
import { FlagOutlined, FireOutlined } from '@ant-design/icons';
import moment from 'antd/node_modules/moment';
import Vaga from 'models/vaga/Vaga';
import Curso from 'models/geral/Curso';

export default function CardVaga(props: any) {
    const history = useHistory();

    const vaga: Vaga = props.vaga;
    const IconText = ({ icon, text, tooltip }: any) => (
        <Tooltip title={tooltip}>
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        </Tooltip>
    );

    function obterTagData(data: any) {
        data = moment(data);
        if (data.isSameOrAfter(moment(new Date()), "day")) {
            return <Tag color="#87d068">Inscrições Abertas</Tag>
        }
        return <Tag color="#f30b4a">Inscrições Encerradas</Tag>
    }

    function obterDescricao(cursos: Curso[]) {
        if (cursos.length === 0) return <Tag color="green">TODOS OS CURSOS</Tag>
        if (cursos.length > 3) return (
            <Space size={0}>
                {cursos.slice(0, 3).map(curso => <Tag key={curso.id} color="blue">{curso.nome.toUpperCase()}</Tag>)}
                {<span style={{ paddingLeft: "10px" }}> e mais {cursos.length - 3} cursos</span>}
            </Space>
        );
        return (
            <Space size={0}>
                {cursos.map(curso => <Tag key={curso.id} color="blue">{curso.nome.toUpperCase()}</Tag>)}
            </Space>
        );
    }

    function obterDescricaoDatas(vaga: Vaga) {
        const format = "DD/MM/YYYY"
        const abertura = moment(vaga.abertura).format(format);
        const encerramento = moment(vaga.encerramento).format(format);
        return (
            <div>
                <strong>Período: </strong> de {abertura} até {encerramento}
            </div>
        );
    }

    function obterDescricaoItem(descricao: string) {
        if (descricao.length > 400) return descricao.substr(0, 400) + "...";
        return descricao;
    }

    return (
        <Card style={{ marginBottom: "16px" }} className="cardEffect" onClick={() => history.push("/vaga/detalhe", vaga)}>
            <List.Item key={vaga.id} style={{ padding: 0 }} extra={obterTagData(vaga.encerramento)}
                actions={[
                    <IconText icon={FlagOutlined} text={vaga.tipo.descricao} key="1"/>,
                    <IconText icon={FireOutlined} text={vaga.vagas} key="2" tooltip="Vagas"/>,
                    // <IconText icon={TeamOutlined} text={vaga.vagas} key="3" tooltip="Inscrições"/>,
                ]}
            >
                <List.Item.Meta title={vaga.titulo} description={obterDescricao(vaga.cursos)} />
                <List.Item.Meta description={obterDescricaoDatas(vaga)} />
                {obterDescricaoItem(vaga.descricao)}
            </List.Item>
        </Card>
    );

}