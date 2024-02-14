import { Form, Input, Space } from 'antd';

export const DataTypeIntQuant = ({ name, restField }) => {
  return (
    <>
      <Space
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Form.Item
          {...restField}
          style={{
            flex: 1,
          }}
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
            style={{
              flex: 1,
            }}
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
            style={{
              flex: 1,
            }}
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
      </Space>
    </>
  );
};
