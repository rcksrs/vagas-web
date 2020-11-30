import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Modal, Form, Input, Space, InputNumber, Select, notification, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CursoService from 'services/CursoService';
import Curso, { cursoValidation, Modalidade } from 'models/geral/Curso';
import EmpresaService from 'services/EmpresaService';
import Empresa from 'models/geral/Empresa';
import TipoCurso from 'models/geral/TipoCurso';
import Search from 'antd/lib/input/Search';

export default function CursoPage() {
    const cursoService = new CursoService();
    const empresaService = new EmpresaService();

    const [form] = Form.useForm<Curso>();
    const [modalVisible, setModalVisible] = useState(false);

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [tiposCurso, setTiposCurso] = useState<TipoCurso[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    useEffect(obterPaginaCursos, []);

    const colunasTabela = [
        { title: 'Nome', dataIndex: 'nome' },
        { title: 'Tipo', dataIndex: ['tipo', 'descricao'] },
        { title: 'Modalidade', dataIndex: 'modalidade' },
        { title: 'Semestres', dataIndex: 'semestres' },
        { title: 'CH', dataIndex: 'chTotal' },
        { title: 'Editar/Excluir', render: (text: any, data: Curso) => (
              <Space size="middle">
                <EditOutlined onClick={() => botaoEditarCurso(data)}/>
                <Popconfirm title="Tem certeza que deseja remover este item？" okText="Sim" cancelText="Não" onConfirm={() => botaoRemoverCurso(data)}>
                    <DeleteOutlined />
                </Popconfirm>
              </Space>
            )
        },
    ];

    function obterPaginaCursos() {
        cursoService.listarTodos().then(res => setCursos(res));
        cursoService.listarTiposCurso().then(res => setTiposCurso(res))
        empresaService.listarTodos().then(res => setEmpresas(res));
    }

    function buscarCursos(nome: string) {
        if(nome) cursoService.obterPorNome(nome).then(res => setCursos(res));
        else cursoService.listarTodos().then(res => setCursos(res));
    }
    
    function botaoEditarCurso(curso: Curso) {
        console.log(curso);
        form.setFieldsValue(curso);
        setModalVisible(true);
    }

    async function botaoRemoverCurso(curso: Curso) {
        await cursoService.remover(curso);
        obterPaginaCursos();
        const args = { message: 'Sucesso', description: "O curso foi removido com sucesso", duration: 3 };
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

    async function onFinish(curso: Curso) {
        await cursoService.salvar(curso);
        obterPaginaCursos();
        const args = { message: 'Sucesso', description: "Os dados do curso foram salvos com sucesso", duration: 4 };
        notification.success(args);
        form.resetFields();
        setModalVisible(false);
    }

    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Cursos"
                extra={[
                    // <Button key="3">Operation</Button>,
                    // <Button key="2">Operation</Button>,
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                    <Search key="2" placeholder="Buscar cursos pelo nome" allowClear style={{ width: 300 }} onSearch={(nome) => buscarCursos(nome)} />,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <p style={{ fontSize: "16px" }}>Lista de todos os cursos cadastrados e ativos no sistema</p>
                <Table dataSource={cursos} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Cadastrar Novo Curso" okText="Salvar" cancelText="Cancelar" width={700}
                visible={modalVisible} onOk={() => botaoSalvarModal()} onCancel={onCancel} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="row">
                        <Form.Item name="id" style={{display: 'none'}}>
                            <InputNumber type="hidden"/>
                        </Form.Item>

                        <div className="col-12">
                            <Form.Item name="nome" label="Nome" rules={cursoValidation.nome}>
                                <Input placeholder="Nome do curso" size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-12">
                            <Form.Item label="Empresa" name={["empresa", "id"]} rules={cursoValidation.empresa}>
                                <Select size="large" style={{width: '100%'}} placeholder="Empresa ou instituição de ensino">
                                    {empresas.map(empresa => 
                                        <Select.Option key={empresa.id} value={empresa.id}>
                                            {empresa.nome}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="chTotal" label="Carga Horária" rules={cursoValidation.chTotal}>
                                <InputNumber placeholder="Carga horária total" size="large" style={{width: '100%'}}/>
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="semestres" label="Semestres" rules={cursoValidation.semestres}>
                                <InputNumber placeholder="Quantidade de semestres" size="large" style={{width: '100%'}}/>
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item label="Modalidade" name="modalidade" rules={cursoValidation.modalidade}>
                                <Select size="large" style={{width: '100%'}}>
                                    {Object.keys(Modalidade).map(m => <Select.Option key={m} value={m}>{m}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item label="Tipo de Curso" name={["tipo", "id"]} rules={cursoValidation.tipo}>
                                <Select size="large" style={{width: '100%'}}>
                                    {tiposCurso.map(tipo => 
                                        <Select.Option key={tipo.id} value={tipo.id}>
                                            {tipo.descricao}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>

    );
}