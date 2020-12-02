import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Modal, Form, Input, Space, InputNumber, notification, Popconfirm, Tabs, message, Select, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'moment/locale/pt-br';
import AlunoService from 'services/AlunoService';
import Search from 'antd/lib/input/Search';
import { enderecoValidation } from 'models/geral/Endereco';
import buscarCEP from 'utils/buscarCEP';
import CursoService from 'services/CursoService';
import { usuarioValidation } from 'models/geral/Usuario';
import moment from 'antd/node_modules/moment';
import Aluno, { alunoValidation } from 'models/geral/Aluno';
import Curso from 'models/geral/Curso';

export default function AlunoPage() {
    const alunoService = new AlunoService();
    const cursoService = new CursoService();

    const [form] = Form.useForm<Aluno>();
    const [modalVisible, setModalVisible] = useState(false);

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);

    useEffect(obterPaginaAlunos, []);

    const colunasTabela = [
        { title: 'Nome', dataIndex: 'nome' },
        { title: 'Matricula', dataIndex: 'matricula' },
        { title: 'Curso', dataIndex: ['curso', 'nome'] },
        {
            title: 'Editar/Excluir', render: (text: any, data: Aluno) => (
                <Space size="middle">
                    <EditOutlined onClick={() => botaoEditarAluno(data)} />
                    <Popconfirm title="Tem certeza que deseja remover este item？" okText="Sim" cancelText="Não" onConfirm={() => botaoRemoverAluno(data)}>
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            )
        },
    ];

    function obterPaginaAlunos() {
        alunoService.listarTodos().then(res => setAlunos(res));
        cursoService.listarTodos().then(res => setCursos(res));
    }

    function buscarAlunos(nome: string) {
        if (nome) alunoService.obterPorNome(nome).then(res => setAlunos(res));
        else alunoService.listarTodos().then(res => setAlunos(res));
    }

    function botaoEditarAluno(aluno: Aluno) {
        aluno.dataNascimento = moment(aluno.dataNascimento);
        aluno.dataIngresso = moment(aluno.dataIngresso);
        form.setFieldsValue(aluno);
        setModalVisible(true);
    }

    async function botaoRemoverAluno(aluno: Aluno) {
        await alunoService.remover(aluno);
        obterPaginaAlunos();
        const args = { message: 'Sucesso', description: "Os dados do aluno selecionado foram removidos com sucesso", duration: 4 };
        notification.success(args);
    }

    async function botaoSalvarModal() {
        try {
            await form.validateFields();
            form.submit();
        } catch (error) {
            message.error("Corrija os campos com erro antes de continuar");
        }
    }

    function onCancel() {
        setModalVisible(false);
        form.resetFields();
    }

    async function onFinish(aluno: Aluno) {
        await alunoService.salvar(aluno);
        obterPaginaAlunos();
        const args = { message: 'Sucesso', description: "Os dados do aluno foram salvos com sucesso", duration: 4 };
        notification.success(args);
        form.resetFields();
        setModalVisible(false);
    }

    async function botaoBuscarCEP(cep: string) {
        const endereco = await buscarCEP(cep);
        if (endereco) form.setFieldsValue({ endereco });
    }

    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Alunos"
                extra={[
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                    <Search key="2" placeholder="Buscar aluno pelo nome" allowClear style={{ width: 300 }} onSearch={(nome) => buscarAlunos(nome)} />,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <p style={{ fontSize: "16px" }}>Lista de todos os alunos cadastrados e ativos no sistema</p>
                <Table dataSource={alunos} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Cadastrar Novo Aluno" okText="Salvar" cancelText="Cancelar" width={1000}
                visible={modalVisible} onOk={() => botaoSalvarModal()} onCancel={onCancel} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="id" style={{ display: 'none' }}><InputNumber type="hidden" /></Form.Item>
                    <Form.Item name={["usuario", "id"]} style={{ display: 'none' }}><InputNumber type="hidden" /></Form.Item>

                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Informações Gerais" key="1">
                            <div className="row">
                                <div className="col-12">
                                    <Form.Item name="nome" label="Nome" rules={alunoValidation.nome}>
                                        <Input placeholder="Nome completo do aluno" size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-6">
                                    <Form.Item label="Curso" name={["curso", "id"]} rules={alunoValidation.curso}>
                                        <Select size="large" style={{width: '100%'}}>
                                            {cursos.map(curso => 
                                                <Select.Option key={curso.id} value={curso.id}>
                                                    {curso.nome}
                                                </Select.Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="col-6">
                                    <Form.Item name="matricula" label="Matrícula" rules={alunoValidation.matricula}>
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-6">
                                    <Form.Item name="dataNascimento" label="Data de Nascimento" rules={alunoValidation.dataNascimento}>
                                        <DatePicker locale={locale} format="DD/MM/YYYY" style={{width: '100%'}} size="large"/>
                                    </Form.Item>
                                </div>

                                <div className="col-6">
                                    <Form.Item name="dataIngresso" label="Data de Ingresso" rules={alunoValidation.dataIngresso}>
                                        <DatePicker locale={locale} format="DD/MM/YYYY" style={{width: '100%'}} size="large" placeholder="Data de ingresso no curso selecionado"/>
                                    </Form.Item>
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Localização" key="2">
                            <div className="row">
                                <div className="col-4">
                                    <Form.Item name={["endereco", "cep"]} label="CEP" rules={enderecoValidation.cep}>
                                        <Search placeholder="Buscar endereço pelo CEP" size="large" onSearch={(cep) => botaoBuscarCEP(cep)} />
                                    </Form.Item>
                                </div>
                                <div className="offset-6" />

                                <div className="col-4">
                                    <Form.Item name={["endereco", "pais"]} label="País">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["endereco", "estado"]} label="Estado">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["endereco", "cidade"]} label="Cidade">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["endereco", "bairro"]} label="Bairro">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["endereco", "numero"]} label="Número">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["endereco", "complemento"]} label="Complemento">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <Form.Item name={["endereco", "referencia"]} label="Referência">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Conta" key="3">
                            <div className="row">
                                <div className="col-12">
                                    <Form.Item name={["usuario", "email"]} label="Email" rules={usuarioValidation.email}>
                                        <Input placeholder="Email para acesso à conta" size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["usuario", "cpf"]} label="CPF" rules={usuarioValidation.cpf}>
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["usuario", "telefone"]} label="Telefone">
                                        <Input size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name={["usuario", "senha"]} label="Senha" rules={usuarioValidation.senha}>
                                        <Input.Password size="large" />
                                    </Form.Item>
                                </div>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Form>
            </Modal>
        </>

    );
}