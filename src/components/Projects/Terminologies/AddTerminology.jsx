import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTerminology.scss';
import { myContext } from '../../../App';
import { AdditionalCodeInput } from './AdditionalCodeInput';
import Background from '../../../../assets/Background.png';
import { handlePost } from '../../Manager/FetchManager';
import { Button, Form, Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AddTerminology = ({ form }) => {
  const {
    vocabUrl,
    terminology,
    setTerminology,
    initialTerminology,
    handleCodeAdd,
  } = useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    setTerminology(initialTerminology);
  }, []);

  useEffect(
    () => () => {
      setTerminology(initialTerminology);
    },
    [],
  );

  useEffect(() => {
    if (terminology?.codes?.length === 0) {
      handleCodeAdd();
    }
  });

  let terminologyDTO = () => {
    const codesDTO = terminology.codes.map(code => {
      return { code: code.code, display: code.display };
    });
    return { ...terminology, codes: codesDTO };
  };

  const handleSubmit = event => {
    event.preventDefault();
    handlePost(vocabUrl, 'Terminology', terminologyDTO()).then(data =>
      navigate(`/terminology/${data?.id}`),
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      // initialValues={{ modifier: 'public' }}
    >
      <h2>Create Terminology</h2>
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
      <AdditionalCodeInput />
    </Form>

    // <>
    //   <article className="form_container">
    //     <div className="image_container">
    //       <img className="background_image_results" src={Background} />
    //     </div>
    //     <h2>New Terminology</h2>
    //     <div className="name form_wrapper">
    //       <label className="input_label" htmlFor="terminology_name">
    //         Name
    //       </label>
    //       <input
    //         autoFocus
    //         id="name"
    //         className="add_term_input"
    //         type="text"
    //         value={terminology.name}
    //         onChange={evt => {
    //           setTerminology({
    //             ...terminology,
    //             name: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>

    //     <div className="description form_wrapper">
    //       <label className="input_label" htmlFor="terminology_description">
    //         Description
    //       </label>
    //       <input
    //         id="display"
    //         className="add_term_input description_input"
    //         type="text"
    //         value={terminology.description}
    //         onChange={evt => {
    //           setTerminology({
    //             ...terminology,
    //             description: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>

    //     <div className="url form_wrapper">
    //       <label className="input_label" htmlFor="terminology_url">
    //         URL
    //       </label>
    //       <input
    //         required
    //         id="url"
    //         className="add_term_input url_input"
    //         type="text"
    //         value={terminology.url}
    //         onChange={evt => {
    //           setTerminology({
    //             ...terminology,
    //             url: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>

    //     {terminology.codes.map(code => (
    //       <AdditionalCodeInput code={code} />
    //     ))}

    //     <button className="manage_term_button" onClick={handleSubmit}>
    //       Save
    //     </button>
    //   </article>
    // </>
  );
};
