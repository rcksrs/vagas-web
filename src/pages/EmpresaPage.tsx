import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Modal, Form, Input, Space, InputNumber, notification, Popconfirm, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmpresaService from 'services/EmpresaService';
import Empresa, { empresaValidation } from 'models/geral/Empresa';
import Search from 'antd/lib/input/Search';
import { enderecoValidation } from 'models/geral/Endereco';
import buscarCEP from 'utils/buscarCEP';

export default function EmpresaPage() {
    const empresaService = new EmpresaService();

    const [form] = Form.useForm<Empresa>();
    const [modalVisible, setModalVisible] = useState(false);

    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(obterPaginaEmpresas, []);

    const colunasTabela = [
        { title: 'Nome', dataIndex: 'nome' },
        { title: 'CNPJ', dataIndex: 'cnpj' },
        { title: 'Site', dataIndex: 'site' },
        { title: 'Contato', dataIndex: 'contato' },
        { title: 'Editar/Excluir', render: (text: any, data: Empresa) => (
              <Space size="middle">
                <EditOutlined onClick={() => botaoEditarEmpresa(data)}/>
                <Popconfirm title="Tem certeza que deseja remover este item？" okText="Sim" cancelText="Não" onConfirm={() => botaoRemoverEmpresa(data)}>
                    <DeleteOutlined />
                </Popconfirm>
              </Space>
            )
        },
    ];

    function obterPaginaEmpresas() {
        empresaService.listarTodos().then(res => setEmpresas(res));
    }

    function buscarEmpresas(nome: string) {
        if(nome) empresaService.obterPorNome(nome).then(res => setEmpresas(res));
        else empresaService.listarTodos().then(res => setEmpresas(res));
    }
    
    function botaoEditarEmpresa(empresa: Empresa) {
        form.setFieldsValue(empresa);
        setModalVisible(true);
    }

    async function botaoRemoverEmpresa(empresa: Empresa) {
        await empresaService.remover(empresa);
        obterPaginaEmpresas();
        const args = { message: 'Sucesso', description: "A empresa selecionada foi removida com sucesso", duration: 4 };
        notification.success(args);
    }

    async function botaoSalvarModal() {
        await form.validateFields();
        form.submit();
    }

    function onCancel() {
        setModalVisible(false);
        form.resetFields();
    }

    async function onFinish(empresa: Empresa) {
        await empresaService.salvar(empresa);
        obterPaginaEmpresas();
        const args = { message: 'Sucesso', description: "Os dados da empresa foram salvos com sucesso", duration: 4 };
        notification.success(args);
        form.resetFields();
        setModalVisible(false);
    }

    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Empresas"
                extra={[
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                    <Search key="2" placeholder="Buscar empresas pelo nome" allowClear style={{ width: 300 }} onSearch={(nome) => buscarEmpresas(nome)} />,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <p style={{ fontSize: "16px" }}>Lista de todas as empresas cadastradas e ativas no sistema</p>
                <Table dataSource={empresas} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Cadastrar Nova Empresa" okText="Salvar" cancelText="Cancelar" width={1000}
                visible={modalVisible} onOk={() => botaoSalvarModal()} onCancel={onCancel} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="row">
                        <Form.Item name="id" style={{display: 'none'}}><InputNumber type="hidden"/></Form.Item>

                        <div className="col-12">
                            <Form.Item name="nome" label="Nome" rules={empresaValidation.nome}>
                                <Input placeholder="Nome da empresa" size="large" />
                            </Form.Item>
                        </div>


                        <div className="col-4">
                            <Form.Item name="cnpj" label="CNPJ" rules={empresaValidation.cnpj}>
                                <Input placeholder="CNPJ da empresa" size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-4">
                            <Form.Item name="natureza" label="Natureza">
                                <Input placeholder="Natureza da empresa" size="large" />
                            </Form.Item>
                        </div>


                        <div className="col-4">
                            <Form.Item name="email" label="Email" rules={empresaValidation.email}>
                                <Input size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-4">
                            <Form.Item name="representante" label="Representante" rules={empresaValidation.representante}>
                                <Input placeholder="Nome do representante da empresa" size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-4">
                            <Form.Item name="telefone" label="telefone" rules={empresaValidation.telefone}>
                                <Input placeholder="Telefone de contato" size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-4">
                            <Form.Item name="site" label="Site">
                                <Input placeholder="Site da empresa" size="large" />
                            </Form.Item>
                        </div>

                        <Divider orientation="left">Endereço</Divider>

                        <div className="col-4">
                            <Form.Item name={["endereco", "cep"]} label="CEP" rules={enderecoValidation.cep}>
                                <Search placeholder="Buscar endereço pelo CEP" size="large" onSearch={(cep) => buscarCEP(cep)} />
                                {/* <Input placeholder="CEP da empresa" size="large" /> */}
                            </Form.Item>
                        </div>
                        <div className="offset-6" />

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

                        <div className="col-4">
                            <Form.Item name={["endereco", "referencia"]} label="Referência">
                                <Input size="large" />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>

    );
}