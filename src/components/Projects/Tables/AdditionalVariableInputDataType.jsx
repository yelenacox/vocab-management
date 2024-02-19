import React, { useState } from 'react';
import './AdditionalVariableInputs.scss';
import { Form, Input, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import DataTypeSelect from './DataTypeSelect';
import DataTypeSubForm from './DataTypeSubForm';

function AdditionalVariableInputDataType({ restField, key, name, remove }) {
  const [type, setType] = useState('');
  return (
    <>
      <Space
        key={key}
        style={{
          display: 'flex',
          marginBottom: 3,
        }}
        align="baseline"
      >
        <Form.Item
          {...restField}
          name={[name, 'name']}
          validateTrigger={['onChange']}
          label="Variable name"
          rules={[
            {
              required: true,
              message: 'Variable name is required.',
            },
          ]}
        >
          <Input
            style={{
              width: '15vw',
            }}
            placeholder="Variable Name"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          {...restField}
          label="Variable description"
          name={[name, 'description']}
          rules={[
            {
              required: true,
              message: 'Variable description is required.',
            },
          ]}
        >
          <Input
            style={{
              width: '39vw',
            }}
            placeholder="Variable Description"
          />
        </Form.Item>

        <DataTypeSelect name={name} restField={restField} setType={setType} />
        <MinusCircleOutlined
          className="dynamic-delete-button"
          onClick={() => remove(name)}
        />
      </Space>
      <DataTypeSubForm restField={restField} type={type} name={name} />
    </>
  );
}

export default AdditionalVariableInputDataType;
