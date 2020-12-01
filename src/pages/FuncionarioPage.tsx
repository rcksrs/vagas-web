import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Modal, Form, Input, Space, InputNumber, notification, Popconfirm, Tabs, message, Select, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import 'moment/locale/pt-br';
import FuncionarioService from 'services/FuncionarioService';
import Empresa from 'models/geral/Empresa';
import Funcionario, { funcionarioValidation } from 'models/geral/Funcionario';
import Search from 'antd/lib/input/Search';
import { enderecoValidation } from 'models/geral/Endereco';
import buscarCEP from 'utils/buscarCEP';
import EmpresaService from 'services/EmpresaService';
import { usuarioValidation } from 'models/geral/Usuario';
import moment from 'antd/node_modules/moment';

export default function FuncionarioPage() {
    const funcionarioService = new FuncionarioService();
    const empresaService = new EmpresaService();

    const [form] = Form.useForm<Funcionario>();
    const [modalVisible, setModalVisible] = useState(false);

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(obterPaginaFuncionarios, []);

    const colunasTabela = [
        { title: 'Nome', dataIndex: 'nome' },
        { title: 'Matricula', dataIndex: 'matricula' },
        { title: 'Cargo', dataIndex: 'cargo' },
        {
            title: 'Editar/Excluir', render: (text: any, data: Funcionario) => (
                <Space size="middle">
                    <EditOutlined onClick={() => botaoEditarFuncionario(data)} />
                    <Popconfirm title="Tem certeza que deseja remover este item？" okText="Sim" cancelText="Não" onConfirm={() => botaoRemoverFuncionario(data)}>
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            )
        },
    ];

    function obterPaginaFuncionarios() {
        funcionarioService.listarTodos().then(res => setFuncionarios(res));
        empresaService.listarTodos().then(res => setEmpresas(res));
    }

    function buscarFuncionarios(nome: string) {
        if (nome) funcionarioService.obterPorNome(nome).then(res => setFuncionarios(res));
        else funcionarioService.listarTodos().then(res => setFuncionarios(res));
    }

    function botaoEditarFuncionario(funcionario: Funcionario) {
        funcionario.dataNascimento = moment(funcionario.dataNascimento);
        form.setFieldsValue(funcionario);
        setModalVisible(true);
    }

    async function botaoRemoverFuncionario(funcionario: Funcionario) {
        await funcionarioService.remover(funcionario);
        obterPaginaFuncionarios();
        const args = { message: 'Sucesso', description: "Os dados do funcionário selecionado foram removidos com sucesso", duration: 4 };
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

    async function onFinish(funcionario: Funcionario) {
        await funcionarioService.salvar(funcionario);
        obterPaginaFuncionarios();
        const args = { message: 'Sucesso', description: "Os dados do funcionário foram salvos com sucesso", duration: 4 };
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
                title="Funcionários"
                extra={[
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                    <Search key="2" placeholder="Buscar funcionários pelo nome" allowClear style={{ width: 300 }} onSearch={(nome) => buscarFuncionarios(nome)} />,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <p style={{ fontSize: "16px" }}>Lista de todos os funcionários cadastrados e ativos no sistema</p>
                <Table dataSource={funcionarios} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Cadastrar Novo Funcionário" okText="Salvar" cancelText="Cancelar" width={1000}
                visible={modalVisible} onOk={() => botaoSalvarModal()} onCancel={onCancel} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="id" style={{ display: 'none' }}><InputNumber type="hidden" /></Form.Item>
                    <Form.Item name={["usuario", "id"]} style={{ display: 'none' }}><InputNumber type="hidden" /></Form.Item>

                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Informações Gerais" key="1">
                            <div className="row">
                                <div className="col-12">
                                    <Form.Item name="nome" label="Nome" rules={funcionarioValidation.nome}>
                                        <Input placeholder="Nome completo do funcionário" size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-12">
                                    <Form.Item label="Empresa" name={["empresa", "id"]} rules={funcionarioValidation.empresa}>
                                        <Select size="large" style={{width: '100%'}} placeholder="Empresa ou instituição de ensino">
                                            {empresas.map(empresa => 
                                                <Select.Option key={empresa.id} value={empresa.id}>
                                                    {empresa.nome}
                                                </Select.Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name="matricula" label="Matrícula" rules={funcionarioValidation.matricula}>
                                        <Input placeholder="Matrícula do funcionário" size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name="cargo" label="Cargo" rules={funcionarioValidation.cargo}>
                                        <Input placeholder="Cargo atual na empresa" size="large" />
                                    </Form.Item>
                                </div>

                                <div className="col-4">
                                    <Form.Item name="dataNascimento" label="Data de Nascimento" rules={funcionarioValidation.dataNascimento}>
                                        <DatePicker locale={locale} format="DD/MM/YYYY" style={{width: '100%'}} size="large"/>
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