import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { AdditionalVariableInput } from './AdditionalVariableInput';
import { handlePost } from '../../Manager/FetchManager';
import { Button, Form, Input } from 'antd';

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

  useEffect(() => {
    if (table?.variables?.length === 0) {
      addTableVariable();
    }
  });

  const navigate = useNavigate();

  let tableDTO = () => {
    const variablesDTO = table.variables.map(variable => {
      return { ...variable, id: undefined };
    });
    return { ...table, variables: variablesDTO };
  };

  const handleSubmit = event => {
    event.preventDefault();
    handlePost(vocabUrl, 'Table', tableDTO()).then(data =>
      navigate(`/table/${data?.id}`),
    );
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
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
        {table?.variables?.map((variable, index) => (
          <AdditionalVariableInput
            variable={variable}
            index={index}
            form={form}
          />
        ))}
      </Form>
    </>
  );
};
{
  /* <article className="form_container">
  <div className="image_container">
    <img className="background_image_results" src={Background} />
  </div>
  <h2>New Table</h2>
  <div className="name form_wrapper">
    <label className="input_label" htmlFor="terminology_name">
      Name
    </label>
    <input
      autoFocus
      id="name"
      className="add_term_input"
      type="text"
      value={table?.name}
      onChange={evt => {
        setTable({
          ...table,
          name: evt.target.value,
        });
      }}
    />
  </div>

  <div className="description form_wrapper">
    <label className="input_label" htmlFor="table_description">
      Description
    </label>
    <input
      id="display"
      className="add_term_input description_input"
      type="text"
      value={table?.description}
      onChange={evt => {
        setTable({
          ...table,
          description: evt.target.value,
        });
      }}
    />
  </div>

  <div className="url form_wrapper">
    <label className="input_label" htmlFor="table_url">
      URL
    </label>
    <input
      required
      id="url"
      className="add_term_input url_input"
      type="text"
      value={table?.url}
      onChange={evt => {
        setTable({
          ...table,
          url: evt.target.value,
        });
      }}
    />
  </div>
  {table?.variables?.map((variable, index) => (
    <AdditionalVariableInput variable={variable} index={index} />
  ))}

  <button className="manage_term_button" onClick={handleSubmit}>
    Save
  </button>
  {/* <button
          className="manage_term_button"
          onClick={() => navigate('/projects')}
        >
          Cancel
        </button> 
  </article>; */
}
