import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AdditionalVariableInputs.scss';
import { getAll } from '../../Manager/FetchManager';
import { Button, Form, Input, Space, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AdditionalVariableInput = () => {
  const {
    vocabUrl,
    table,
    setTable,
    terminologies,
    setTerminologies,
    updateTableVariable,
    setLoading,
    getVariableId,
  } = useContext(myContext);
  console.log(table.variables);
  // const addTableVariable = () => {
  //   const tableVars = table.variables;
  //   tableVars.push({ id: getVariableId() });
  //   setTable({
  //     ...table,
  //     variables: tableVars,
  //   });
  // };

  // useEffect(() => {
  //   thisVariable.data_type === 'ENUMERATION' ? getTerminologies() : '';
  // }, [thisVariable.data_type]);

  const getTerminologies = () => {
    setLoading(true);
    getAll(vocabUrl, 'Terminology')
      .then(res => res.json())
      .then(data => setTerminologies(data))
      .then(() => setLoading(false));
  };

  return (
    <Form.List
      name="variables"
      // rules={[
      //   {
      //     validator: async (_, variables) => {
      //       if (!variables || variables.length < 1) {
      //         return Promise.reject(
      //           new Error('At least 1 variable is required.'),
      //         );
      //       }
      //     },
      //   },
      // ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
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
                  validateTrigger={['onChange', 'onBlur']}
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
                  >
                    <Option value="STRING">String</Option>
                    <Option value="INTEGER">Integer</Option>
                    <Option value="QUANTITY">Quantity</Option>
                    <Option value="ENUMERATION">Enumeration</Option>
                  </Select>
                </Form.Item>
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(name)}
                />
              </Space>
            </>
          ))}

          <Form.Item>
            <Button
              style={{ width: 250 }}
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add variable
            </Button>
          </Form.Item>
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
  );
};
