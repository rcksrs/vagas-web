import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FileDoneOutlined, LaptopOutlined, SettingOutlined, MailOutlined, HomeOutlined, BankOutlined, 
         NotificationOutlined, ReadOutlined, UsergroupAddOutlined, SolutionOutlined, ApiOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Template(props) {
    const history = useHistory();

    return (
        <Layout style={{ minHeight: "100%"}}>
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: "#1a1a23" }}>
                <div style={{ width: "100%", height:"100%", display:"flex", justifyContent:"space-between" }}>
                    <p style={{ color: "white", fontSize: "22px" }}>Seletivos</p>
                    <p style={{ color: "white", fontSize: "18px" }}><MailOutlined /></p>
                </div>
            </Header>
            <Layout>
                <Sider width={260} className="site-layout-background" 
                       style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: "64px" }}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
                        <SubMenu key="sub1" icon={<HomeOutlined />} title="Página Inicial">
                            <Menu.Item key="1" icon={<FileDoneOutlined />} onClick={() => history.push('/vaga')}>Processos Seletivos</Menu.Item>
                            <Menu.Item key="2" icon={<NotificationOutlined />}>Convocações</Menu.Item>
                            <Menu.Item key="3" icon={<SolutionOutlined />}>Vínculos Ativos</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Gerenciamento">
                            <Menu.Item key="6" icon={<UsergroupAddOutlined />} onClick={() => history.push('/aluno')}>Alunos</Menu.Item>
                            <Menu.Item key="4" icon={<ReadOutlined />} onClick={() => history.push('/curso')}>Cursos</Menu.Item>
                            <Menu.Item key="8" icon={<BankOutlined />} onClick={() => history.push('/empresa')}>Empresas</Menu.Item>
                            <Menu.Item key="7" icon={<UsergroupAddOutlined />} onClick={() => history.push('/funcionario')}>Funcionários</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<SettingOutlined />} title="Configurações">
                            <Menu.Item key="9">Alterar Perfil</Menu.Item>
                            <Menu.Item key="10">Controle de Acesso</Menu.Item>
                        </SubMenu>
                        <Menu.Item danger key="11" icon={<ApiOutlined />} style={{ color: "#f30b4a" }}>Sair</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ margin: "64px 0 0 260px", padding: '24px'}}>
                    <Content>
                        <div className="container-fluid" style={{ padding: '24px' }}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}