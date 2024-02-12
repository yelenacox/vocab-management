import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { AdditionalVariableInput } from './AdditionalVariableInput';
import { handlePost } from '../../Manager/FetchManager';
import { Button, Form, Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AddTable = ({ form }) => {
  const { vocabUrl, table, setTable, resetTable, addTableVariable } =
    useContext(myContext);

  useEffect(() => {
    resetTable();
  }, []);
  useEffect(
    () => () => {
      resetTable();
    },
    [],
  );

  // useEffect(() => {
  //   if (table?.variables?.length === 0) {
  //     addTableVariable();
  //   }
  // });

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{ modifier: 'public' }}
      >
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
        <AdditionalVariableInput />
      </Form>
    </>
  );
};
