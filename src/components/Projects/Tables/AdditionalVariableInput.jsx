import './AdditionalVariableInputs.scss';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdditionalVariableInputDataType from './AdditionalVariableInputDataType';

export const AdditionalVariableInput = () => {
  return (
    <Form.List
      name="variables"
      rules={[
        {
          validator: async (_, variables) => {
            if (!variables || variables.length < 1) {
              return Promise.reject(
                new Error('At least 1 variable is required.'),
              );
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {console.log(fields)}
          {fields.map(({ key, name, ...restField }) => {
            return (
              <AdditionalVariableInputDataType
                restField={restField}
                key={key}
                name={name}
                remove={remove}
              />
            );
          })}
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
