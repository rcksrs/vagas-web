import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, DatePicker, Descriptions, Form, Input, InputNumber, Modal, notification, PageHeader, Select, Space, Table, Tag } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import Paragraph from 'antd/lib/typography/Paragraph';
import moment from 'antd/node_modules/moment';
import Curso from 'models/geral/Curso';
import Empresa from 'models/geral/Empresa';
import TipoExperiencia from 'models/perfil/TipoExperiencia';
import Vaga, { vagaValidation } from 'models/vaga/Vaga';
import CursoService from 'services/CursoService';
import EmpresaService from 'services/EmpresaService';
import VagaService from 'services/VagaService';

export default function DetalheVagaPage() {
    const { state } = useLocation();

    const vagaService = new VagaService();
    const cursoService = new CursoService();
    const empresaService = new EmpresaService();

    const [form] = Form.useForm<Vaga>();
    const [modalVisible, setModalVisible] = useState(false);

    const [vaga, setVaga] = useState<Vaga>(state as Vaga);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [cursosSelecionados, setCursosSelecionados] = useState<Curso[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [tiposExperiencia, setTiposExperiencia] = useState<TipoExperiencia[]>([]);

    const colunasTabela = [
        { title: 'Aluno', dataIndex: 'nome' },
        { title: 'Curso', dataIndex: ['tipo', 'descricao'] },
        { title: 'Pontuação', dataIndex: 'semestres' },
        {
            title: 'Situação', width: 160, render: (text: any, data: Curso) => {
                if (data.semestres) return <Tag color="#87d068">CLASSIFICADO</Tag>
                return <Tag color="#f30b4a">DESCLASSIFICADO</Tag>
            }
        },
        {
            title: 'Ações', width: 160, render: (text: any, data: Curso) => {
                if(data.semestres) return <Button size="small" onClick={() => botaoEditar()}>Notificar</Button>
                return <Space>
                    <Button size="small" onClick={() => botaoEditar()}>Notificar</Button>
                    <Button size="small" onClick={() => botaoEditar()}>Classificar</Button>
                </Space>
            }
        },
    ];

    useEffect(carregarDadosSelect, []);

    function carregarDadosSelect() {
        vagaService.obterTiposExperiencia().then(res => setTiposExperiencia(res));
        cursoService.listarTodos().then(res => setCursos(res));
        empresaService.listarTodos().then(res => setEmpresas(res));
        vagaService.obterPorId(vaga.id).then(res => {
            setVaga(res);
            setCursosSelecionados(res.cursos);
        });
    }

    function handleChange(value: number[]) {
        const filter = cursos.filter(c => value.indexOf(c.id) !== -1)
        setCursosSelecionados(filter);
    }

    function botaoEditar() {
        vaga.abertura = moment(vaga.abertura);
        vaga.encerramento = moment(vaga.encerramento);
        form.setFieldsValue(vaga);
        setModalVisible(true);
    }

    async function botaoSalvarModal() {
        await form.validateFields();
        form.submit();
    }

    function onCancel() {
        setModalVisible(false);
        form.resetFields();
    }

    async function onFinish(vaga: Vaga) {
        console.log(cursosSelecionados);
        vaga.cursos = cursosSelecionados;
        await vagaService.salvar(vaga);
        const args = { message: 'Sucesso', description: "Os dados da vaga foram alterados com sucesso", duration: 4 };
        notification.success(args);
        carregarDadosSelect();
        form.resetFields();
        setModalVisible(false);
    }

    function obterDescricao(texto: string | number) {
        return (
            <div style={{ color: "grey" }}>{texto}</div>
        );
    }

    function obterDescricaoDatas() {
        const format = "DD/MM/YYYY"
        const abertura = moment(vaga.abertura).format(format);
        const encerramento = moment(vaga.encerramento).format(format);
        return (
            <div style={{ color: "grey" }}>{abertura} - {encerramento}</div>
        );
    }

    function obterTagCursos() {
        const cursos = vaga.cursos;
        if (cursos.length === 0) return <Tag color="default">TODOS OS CURSOS</Tag>
        return (
            <Space size={0} wrap>
                {cursos.map(curso => <Tag key={curso.id} color="default" style={{ marginBottom: "6px" }}>{curso.nome.toUpperCase()}</Tag>)}
            </Space>
        );
    }


    return (
        <>
            <PageHeader
                title="Informações sobre a Vaga"
                ghost={false}
                onBack={() => window.history.back()}
                extra={[
                    <Button key="1">Excluir Vaga</Button>,
                    <Button key="2">Encerrar Seletivo</Button>,
                    <Button key="3" type="primary" onClick={() => botaoEditar()}>Editar</Button>,
                ]}
            >
                <div>
                    <Paragraph><Tag color="blue">{vaga.tipo.descricao.toUpperCase()}</Tag></Paragraph>
                    <Paragraph><h3>{vaga.titulo}</h3></Paragraph>
                    <Descriptions size="small" column={1}>
                        <Descriptions.Item label="Instituição">{obterDescricao(vaga.empresa.nome)}</Descriptions.Item>
                        <Descriptions.Item label="Período">{obterDescricaoDatas()}</Descriptions.Item>
                        <Descriptions.Item label="Vagas">{obterDescricao(vaga.vagas)}</Descriptions.Item>
                        <Descriptions.Item label="Cursos">{obterTagCursos()}</Descriptions.Item>
                    </Descriptions>
                    <Paragraph>{vaga.descricao}</Paragraph>
                </div>
            </PageHeader>

            <div style={{ backgroundColor: "white", padding: "24px", marginTop: "30px" }}>
                <Paragraph><h3>Inscrições realizadas para esta vaga</h3></Paragraph>
                <Table dataSource={cursos} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Editar Vaga" okText="Salvar" cancelText="Cancelar" width={1000}
                visible={modalVisible} onOk={() => botaoSalvarModal()} onCancel={onCancel} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="row">
                        <Form.Item name="id" style={{ display: 'none' }}><InputNumber type="hidden" /></Form.Item>

                        <div className="col-12">
                            <Form.Item name="titulo" label="Título" rules={vagaValidation.titulo}>
                                <Input size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-12">
                            <Form.Item label="Empresa" name={["empresa", "id"]} rules={vagaValidation.empresa}>
                                <Select size="large" style={{ width: '100%' }} placeholder="Empresa ou instituição de ensino">
                                    {empresas.map(empresa =>
                                        <Select.Option key={empresa.id} value={empresa.id}>
                                            {empresa.nome}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-12">
                            <Form.Item label="Cursos">
                                <Select mode="multiple" allowClear style={{ width: '100%' }} size="large" defaultValue={cursosSelecionados.map(c => c.id)}
                                    placeholder="Selecione um ou mais cursos aceitos para a vaga" onChange={(value: number[]) => handleChange(value)}>
                                    {cursos.map(curso =>
                                        <Select.Option key={curso.id} value={curso.id}>
                                            {curso.nome}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-12">
                            <Form.Item name="descricao" label="Descrição" rules={vagaValidation.descricao}>
                                <Input.TextArea rows={4} placeholder="Descrição detalhada da vaga" />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="vagas" label="Vagas" rules={vagaValidation.vagas}>
                                <InputNumber placeholder="Quantidade total de vagas" size="large" style={{ width: '100%' }} />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item label="Tipo" name={["tipo", "id"]} rules={vagaValidation.tipo}>
                                <Select placeholder="Tipo de vaga" size="large" style={{ width: '100%' }}>
                                    {tiposExperiencia.map(tipo =>
                                        <Select.Option key={tipo.id} value={tipo.id}>
                                            {tipo.descricao}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="abertura" label="Data de Abertura" rules={vagaValidation.abertura}>
                                <DatePicker locale={locale} format="DD/MM/YYYY" style={{ width: '100%' }} size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="encerramento" label="Data de Encerramento" rules={vagaValidation.encerramento}>
                                <DatePicker locale={locale} format="DD/MM/YYYY" style={{ width: '100%' }} size="large" />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
}