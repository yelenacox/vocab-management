import { React, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Button, Form, Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import Background from '../../../../assets/Background.png';
import { handlePost } from '../../Manager/FetchManager';
import Papa from 'papaparse';
import './TableStyling.scss';

export const UploadTable = ({ form }) => {
  const {
    vocabUrl,
    table,
    setTable,
    resetUpload,
    buttonDisabled,
    setButtonDisabled,
  } = useContext(myContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
    resetUpload();
  }, []);

  useEffect(
    () => () => {
      resetUpload();
    },
    [],
  );

  const navigate = useNavigate();

  const fileRef = useRef(null);
  const handleFileReset = () => {
    fileRef.current.value = null;
  };

  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };

  let tableDTO = item => {
    return { ...table, filename: file.name, csvContents: item };
  };

  const handleSubmit = e => {
    e.preventDefault();
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        console.log(tableDTO(result.data));
        handlePost(vocabUrl, 'LoadTable', tableDTO(result.data)).then(data =>
          navigate(`/table/${data?.id}`),
        );
      },
    });
  };

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
      </Form>
    </>
  );
  // <>
  //   <article className="form_container">
  //     <div className="image_container">
  //       <img className="background_image_results" src={Background} />
  //     </div>
  //     <h2>New Table</h2>
  //     <div className="name form_wrapper">
  //       <label className="input_label" htmlFor="terminology_name">
  //         Name
  //       </label>
  //       <input
  //         autoFocus
  //         id="name"
  //         className="add_term_input"
  //         type="text"
  //         value={table?.name}
  //         onChange={evt => {
  //           setTable({
  //             ...table,
  //             name: evt.target.value,
  //           });
  //         }}
  //       />
  //     </div>

  //     <div className="description form_wrapper">
  //       <label className="input_label" htmlFor="table_description">
  //         Description
  //       </label>
  //       <input
  //         id="display"
  //         className="add_term_input description_input"
  //         type="text"
  //         value={table?.description}
  //         onChange={evt => {
  //           setTable({
  //             ...table,
  //             description: evt.target.value,
  //           });
  //         }}
  //       />
  //     </div>

  //     <div className="url form_wrapper">
  //       <label className="input_label" htmlFor="table_url">
  //         URL
  //       </label>
  //       <input
  //         required
  //         id="url"
  //         className="add_term_input url_input"
  //         type="text"
  //         value={table?.url}
  //         onChange={evt => {
  //           setTable({
  //             ...table,
  //             url: evt.target.value,
  //           });
  //         }}
  //       />
  //     </div>
  //     <div>
  //       <form>
  //         <input
  //           type={'file'}
  //           ref={fileRef}
  //           id={'csvFileInput'}
  //           className="csv_input"
  //           accept={'.csv'}
  //           onChange={handleOnChange}
  //         />
  //         {/* {file ? (
  //           <button className="transparent_button" onClick={handleFileReset}>
  //             <img className="small_icon" src={DeleteTrash} />
  //           </button>
  //         ) : (
  //           ''
  //         )} */}
  //       </form>
  //     </div>
  //     {table.name !== '' && table.url !== '' && file
  //       ? setButtonDisabled(false)
  //       : setButtonDisabled(true)}

  //     <button
  //       className={!buttonDisabled ? 'manage_term_button' : 'button_disabled'}
  //       onClick={e => {
  //         !buttonDisabled ? handleSubmit(e) : '';
  //       }}
  //     >
  //       Upload{' '}
  //     </button>

  //     {/* <button
  //       className="manage_term_button"
  //       onClick={() => navigate('/projects')}
  //     >
  //       Cancel
  //     </button> */}
  //   </article>
  // </>
};
