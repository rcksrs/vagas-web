import React from 'react';
import { PageHeader, Button, Table } from 'antd';

export default function ConfiguracaoPage() {

    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      
      
      return (
          <>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Página de Configuração"
                extra={[
                    <Button key="3">Operation</Button>,
                    <Button key="2">Operation</Button>,
                    <Button key="1" type="primary">Primary</Button>,
                ]}>
            </PageHeader>
            <div style={{backgroundColor: "white", padding: "0 24px"}}>
                <p style={{fontSize: "16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        </>

    );
}