import { Form, Input, Select, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { DataTypeIntQuant } from './DataTypeIntQuant';
import { getAll } from '../../Manager/FetchManager';
import { myContext } from '../../../App';

function DataTypeSelect({ name, restField }) {
  const { vocabUrl, setTerminologies, terminologies } = useContext(myContext);
  const [type, setType] = useState();

  useEffect(() => {
    type === 'ENUMERATION'
      ? getAll(vocabUrl, 'Terminology').then(data => setTerminologies(data))
      : '';
  }, [type]);

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
          style={{ width: '9vw' }}
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
      {type === 'INTEGER' || type === 'QUANTITY' ? (
        <DataTypeIntQuant name={name} restField={restField} />
      ) : type === 'ENUMERATION' ? (
        <Form.Item
          {...restField}
          label="Terminology"
          name={[name, 'enumerations', 'reference']}
          rules={[
            {
              required: true,
              message: 'Terminology is required.',
            },
          ]}
        >
          <Select
            style={{ width: '9vw' }}
            placeholder="Select Terminology"
            options={terminologies.map(term => {
              return {
                value: `Terminology/${term?.id}`,
                label: term?.name,
              };
            })}
          />
        </Form.Item>
      ) : (
        ''
      )}
    </>
  );
}

export default DataTypeSelect;
