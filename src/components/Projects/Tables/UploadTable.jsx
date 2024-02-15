import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './TableStyling.scss';

export const UploadTable = ({ form, fileList, setFileList }) => {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{ modifier: 'public' }}
      >
        <h2>Upload Table</h2>
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
        <Form.Item
          name="csvContents"
          rules={[{ required: true, message: 'Please select file.' }]}
          extra="CSV files only"
        >
          <Upload
            maxCount={1}
            onRemove={file => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={file => {
              setFileList([...fileList, file]);
              return false;
            }}
            accept=".csv"
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
