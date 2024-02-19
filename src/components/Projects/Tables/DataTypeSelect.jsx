import { Form, Select } from 'antd';
import React from 'react';

function DataTypeSelect({ name, restField, setType }) {
  return (
    <>
      <Form.Item
        {...restField}
        label="Data Type"
        name={[name, 'data_type']}
        rules={[
          {
            required: true,
            message: 'Data type is required.',
          },
        ]}
      >
        <Select
          style={{ width: '10vw' }}
          placeholder="Select data type"
          onChange={value => {
            setType(value);
          }}
          options={[
            { value: 'STRING', label: 'String' },
            { value: 'INTEGER', label: 'Integer' },
            { value: 'QUANTITY', label: 'Quantity' },
            { value: 'ENUMERATION', label: 'Enumeration' },
          ]}
        />
      </Form.Item>
    </>
  );
}

export default DataTypeSelect;
