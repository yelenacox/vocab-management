import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AddTerminology.scss';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AdditionalCodeInput = props => {
  const { terminology, setTerminology, handleCodeAdd } = useContext(myContext);
  const [thisCode, setThisCode] = useState(props.code);

  // useEffect(() => {
  //   let codeIndex;
  //   terminology.codes.forEach((code, index) => {
  //     if (code.id === thisCode.id) {
  //       codeIndex = index;
  //     }
  //   });
  //   let newTerminology = terminology;
  //   newTerminology.codes[codeIndex] = thisCode;
  //   setTerminology(newTerminology);
  // }, [thisCode]);

  return (
    <Form.List
      name="codes"
      rules={[
        {
          validator: async (_, variables) => {
            if (!variables || variables.length < 1) {
              return Promise.reject(new Error('At least 1 code is required.'));
            }
          },
        },
      ]}
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
                  name={[name, 'code']}
                  validateTrigger={['onChange']}
                  label="Code"
                  rules={[
                    {
                      required: true,
                      message: 'Code is required.',
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: '15vw',
                    }}
                    placeholder="Code"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Display"
                  name={[name, 'display']}
                  rules={[
                    {
                      required: true,
                      message: 'Code display is required.',
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: '39vw',
                    }}
                    placeholder="Code Display"
                  />
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
              Add code
            </Button>
          </Form.Item>
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
  );
};
