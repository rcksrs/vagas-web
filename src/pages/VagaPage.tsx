import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Modal, Form, Input, InputNumber, Select, notification, DatePicker, List } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import CursoService from 'services/CursoService';
import EmpresaService from 'services/EmpresaService';
import Empresa from 'models/geral/Empresa';
import VagaService from 'services/VagaService';
import Vaga, { vagaValidation } from 'models/vaga/Vaga';
import Curso from 'models/geral/Curso';
import TipoExperiencia from 'models/perfil/TipoExperiencia';
import CardVaga from 'components/CardVaga';

export default function VagaPage() {
    const vagaService = new VagaService();
    const cursoService = new CursoService();
    const empresaService = new EmpresaService();

    const [form] = Form.useForm<Vaga>();
    const [modalVisible, setModalVisible] = useState(false);

    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [cursosSelecionados, setCursosSelecionados] = useState<Curso[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [tiposExperiencia, setTiposExperiencia] = useState<TipoExperiencia[]>([]);

    useEffect(obterPaginaVagas, []);


    function obterPaginaVagas() {
        vagaService.listarTodos().then(res => setVagas(res));
        vagaService.obterTiposExperiencia().then(res => setTiposExperiencia(res));
        cursoService.listarTodos().then(res => setCursos(res));
        empresaService.listarTodos().then(res => setEmpresas(res));
    }

    function handleChange(value: number[]) {
        const filter = cursos.filter(c => value.indexOf(c.id) !== -1)
        setCursosSelecionados(filter);
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
        vaga.cursos = cursosSelecionados;
        await vagaService.salvar(vaga);
        obterPaginaVagas();
        const args = { message: 'Sucesso', description: "Os dados da vaga foram salvos com sucesso", duration: 4 };
        notification.success(args);
        setCursosSelecionados([]);
        form.resetFields();
        setModalVisible(false);
    }

    return (
        <>
            <PageHeader
                ghost={false}
                title="Processos Seletivos"
                extra={[
                    // <Button key="3">Operation</Button>,
                    // <Button key="2">Operation</Button>,
                    <Button key="1" type="primary" onClick={() => setModalVisible(true)}>Novo</Button>,
                ]}>
            </PageHeader>
            <div style={{ backgroundColor: "white", padding: "0 24px" }}>
                <List itemLayout="vertical" dataSource={vagas} footer
                    renderItem={vaga => <CardVaga vaga={vaga} />} />
            </div>

            <Modal title="Cadastrar Nova Vaga" okText="Salvar" cancelText="Cancelar" width={1000}
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
                                <Select mode="multiple" allowClear style={{ width: '100%' }} size="large"
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