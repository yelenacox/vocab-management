import { Form, Input, Select, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { DataTypeIntQuant } from './DataTypeIntQuant';
import { getAll } from '../../Manager/FetchManager';
import { myContext } from '../../../App';

function DataTypeSelect({ name, restField }) {
  const { vocabUrl, setTerminologies, terminologies, setType } =
    useContext(myContext);

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
