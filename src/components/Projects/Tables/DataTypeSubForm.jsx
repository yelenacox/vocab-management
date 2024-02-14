import React, { useContext, useEffect } from 'react';
import { myContext } from '../../../App';
import { Form, Select } from 'antd';
import { getAll } from '../../Manager/FetchManager';
import { DataTypeIntQuant } from './DataTypeIntQuant';
function DataTypeSubForm({ restField }) {
  const { type, terminologies, setTerminologies, vocabUrl } =
    useContext(myContext);
  useEffect(() => {
    type === 'ENUMERATION'
      ? getAll(vocabUrl, 'Terminology').then(data => setTerminologies(data))
      : '';
  }, [type]);
  return (
    <>
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

export default DataTypeSubForm;
