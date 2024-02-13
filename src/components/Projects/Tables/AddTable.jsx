import { AdditionalVariableInput } from './AdditionalVariableInput';
import { Form, Input } from 'antd';

export const AddTable = ({ form }) => {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{ modifier: 'public' }}
      >
        <h2>Create Table</h2>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input Table name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true, message: 'Please input Table URL.' }]}
        >
          <Input />
        </Form.Item>
        <AdditionalVariableInput form={form} />
      </Form>
    </>
  );
};
