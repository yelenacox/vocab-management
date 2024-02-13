import { Form, Input, Select, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { DataTypeIntQuant } from './DataTypeIntQuant';
import { getAll } from '../../Manager/FetchManager';
import { myContext } from '../../../App';

function DataTypeSelect({ name, restField }) {
  const { vocabUrl, setTerminologies, terminologies } = useContext(myContext);
  const [type, setType] = useState(null);
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
            showSearch
            style={{
              width: '10vw',
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
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
