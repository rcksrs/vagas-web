import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Modal, Form, Input, Space, InputNumber, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CursoService from 'services/CursoService';
import Curso, { cursoValidation } from 'models/geral/Curso';

export default function CursoPage() {

    const colunasTabela = [
        { title: 'Código', dataIndex: 'id' },
        { title: 'Nome', dataIndex: 'nome' },
        { title: 'Tipo', dataIndex: ['tipo', 'descricao'] },
        { title: 'Modalidade', dataIndex: 'modalidade' },
        { title: 'Semestres', dataIndex: 'semestres' },
        { title: 'Editar/Excluir', render: (text: any, record: any) => (
              <Space size="middle">
                <EditOutlined />
                <DeleteOutlined />
              </Space>
            )
        },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);

    const service = new CursoService();
    const [cursos, setCursos] = useState<Curso[]>([]);

    const [option, setOption] = useState([]);

    const [form] = Form.useForm<Curso>();

    function obterPaginaCursos() {
        console.log('Chamado!!!')
        service.obterTodos()
            .then(page => setCursos(page.content))
            .catch(error => console.log(error))
        // form.setFieldsValue(cursos[1]);
    }

    useEffect(obterPaginaCursos, []);

    const handleOk = async () => {
        form.setFieldsValue(cursos[10])
        form.validateFields();
        // validation()
        form.submit()
        // setModalConfirmLoading(true);

        // setTimeout(() => {
        //     setModalVisible(false);
        //     setModalConfirmLoading(false);
        // }, 2000);
    };

    function onFinish(data: Curso) {
        console.log(data);
        // form.resetFields();
    }

    return (
        <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Cursos Cadastrados"
                extra={[
                    // <Button key="3">Operation</Button>,
                    // <Button key="2">Operation</Button>,
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <p style={{ fontSize: "16px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Table dataSource={cursos} columns={colunasTabela} rowKey='id' />
            </div>

            <Modal title="Cadastrar Novo Curso" okText="Salvar" cancelText="Cancelar" width={700}
                visible={modalVisible} onOk={handleOk} confirmLoading={modalConfirmLoading} onCancel={() => setModalVisible(false)} >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <div className="row">
                        <div className="col-12">
                            <Form.Item name="nome" label="Nome" rules={cursoValidation.nome}>
                                <Input placeholder="Nome do curso" size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-12">
                            <Form.Item label="Empresa" name={["empresa", "id"]} rules={cursoValidation.empresa}>
                                <Select size="large" style={{width: '100%'}} placeholder="Empresa ou instituição de ensino">
                                    {cursos.map(curso => 
                                        <Select.Option key={curso.id} value={curso.id}>
                                            {curso.nome}
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
                            <Form.Item name="modalidade" label="Modalidade" rules={cursoValidation.modalidade}>
                                <Input size="large" />
                            </Form.Item>
                        </div>

                        <div className="col-6">
                            <Form.Item name="tipo" label="Tipo de Curso" rules={cursoValidation.tipo}>
                                <Input size="large" />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>

    );
}