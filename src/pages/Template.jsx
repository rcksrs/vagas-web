import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Template(props) {
    const history = useHistory();

    return (
        <Layout style={{ minHeight: "100%"}}>
            <Header className="header">
                <div className="logo" style={{ float: "left", width: "126px", height: "31px", margin: "16px 24px 16px 0" }} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<SettingOutlined />} onClick={() => history.push('/')}>Seletivos</Menu.Item>
                    <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => history.push('/gerenciamento')}>Gerenciamento</Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />} onClick={() => history.push('/configuracao')}>Configurações</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ marginTop: "16px", backgroundColor:"white"  }}>
                        <div className="container-fluid" style={{ padding: '24px' }}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}