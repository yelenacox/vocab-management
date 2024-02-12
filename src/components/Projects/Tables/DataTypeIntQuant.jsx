import { Form, Input } from 'antd';

export const DataTypeIntQuant = ({ name, restField }) => {
  return (
    <>
      <Form.Item
        {...restField}
        // style={{
        //   colSpan: '3',
        //   display: 'inline-block',
        // }}
        // noStyle
        label="Min"
        name={[name, 'min']}
        rules={[
          {
            required: true,
            message: 'Min value is required.',
          },
        ]}
      >
        <Input
          style={
            {
              // width: '39vw',
            }
          }
          placeholder="Min"
        />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Max"
        name={[name, 'max']}
        rules={[
          {
            required: true,
            message: 'Max value is required.',
          },
        ]}
      >
        <Input
          style={
            {
              // width: '39vw',
            }
          }
          placeholder="Max"
        />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Units"
        name={[name, 'units']}
        rules={[
          {
            required: true,
            message: 'Units are required.',
          },
        ]}
      >
        <Input
          style={
            {
              // width: '39vw',
            }
          }
          placeholder="Units"
        />
      </Form.Item>
    </>
  );
};