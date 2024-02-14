import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { Checkbox } from 'antd';
import './StudyStyling.scss';
import { getAll, handlePost } from '../../Manager/FetchManager';
import { Form, Input, Select } from 'antd';

export const AddStudy = () => {
  const { vocabUrl, study, setStudy, initialStudy, studyDDs, setStudyDDs } =
    useContext(myContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const getStudyDD = () => {
    getAll(vocabUrl, 'DataDictionary').then(data => setStudyDDs(data));
  };

  useEffect(() => {
    setStudy(initialStudy);
    getStudyDD();
  }, []);

  useEffect(
    () => () => {
      setStudy(initialStudy);
    },
    [],
  );

  const navigate = useNavigate();

  const checkboxHandler = e => {
    let isSelected = e.target.checked;
    let checkboxValue = e.target.id;
    if (isSelected) {
      setSelectedItems([...selectedItems, checkboxValue]);
    } else {
      setSelectedItems(prevData => {
        return prevData?.filter(id => {
          return id !== checkboxValue;
        });
      });
    }
  };

  const checkAllHandler = () => {
    const DDIds = studyDDs.map(item => {
      return item.id;
    });
    setSelectedItems(DDIds);
    if (studyDDs.length === selectedItems.length) {
      setSelectedItems([]);
    }
  };

  let studyDTO = () => {
    const DDDTO = selectedItems.map(dd => {
      return { reference: `DataDictionary/${dd}` };
    });
    return { ...study, datadictionary: DDDTO };
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    handlePost(vocabUrl, 'Study', studyDTO()).then(data =>
      navigate(`/study/${data?.id}`),
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      // initialValues={{ modifier: 'public' }}
    >
      <h2>Create Data Dictionary</h2>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please input Data Dictionary name.' },
        ]}
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
        name={['tables']}
        label="Table"
        rules={[{ required: true, message: 'Please select at least 1 Table.' }]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select Table"
          // onChange={checkboxHandler}
          style={{ width: '50%' }}
          options={tablesDD.map(table => {
            return {
              value: table.id,
              label: table.name,
            };
          })}
        />
      </Form.Item>
    </Form>
    // <>
    //   <article className="form_container">
    //     <div className="image_container">
    //       <img className="background_image_results" src={Background} />
    //     </div>
    //     <h2>New Study</h2>
    //     <div className="name form_wrapper">
    //       <label className="input_label" htmlFor="study_identifier">
    //         Identifier Prefix
    //       </label>
    //       <input
    //         autoFocus
    //         id="identifier_prefix"
    //         className="add_term_input"
    //         type="text"
    //         value={study?.identifier_prefix}
    //         onChange={evt => {
    //           setStudy({
    //             ...study,
    //             identifier_prefix: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>
    //     <div className="name form_wrapper">
    //       <label className="input_label" htmlFor="terminology_name">
    //         Name
    //       </label>
    //       <input
    //         autoFocus
    //         id="name"
    //         className="add_term_input"
    //         type="text"
    //         value={study?.name}
    //         onChange={evt => {
    //           setStudy({
    //             ...study,
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
    //         value={study?.description}
    //         onChange={evt => {
    //           setStudy({
    //             ...study,
    //             description: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>
    //     <div className="description form_wrapper">
    //       <label className="input_label" htmlFor="table_description">
    //         Title
    //       </label>
    //       <input
    //         id="display"
    //         className="add_term_input description_input"
    //         type="text"
    //         value={study?.title}
    //         onChange={evt => {
    //           setStudy({
    //             ...study,
    //             title: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>
    //     <div className="name form_wrapper">
    //       <label className="input_label" htmlFor="study_url">
    //         URL
    //       </label>
    //       <input
    //         autoFocus
    //         id="identifier_prefix"
    //         className="add_term_input"
    //         type="text"
    //         value={study?.url}
    //         onChange={evt => {
    //           setStudy({
    //             ...study,
    //             url: evt.target.value,
    //           });
    //         }}
    //       />
    //     </div>
    //     <div className="tables_dd">
    //       <label className="input_label" htmlFor="dd_tables">
    //         Data Dictionaries
    //         <button onClick={checkAllHandler}>
    //           {studyDDs.length === selectedItems.length
    //             ? 'Uncheck All'
    //             : 'Check All'}
    //         </button>
    //       </label>
    //       {studyDDs.map((dd, index) => {
    //         return (
    //           <>
    //             <div>
    //               <Checkbox
    //                 key={index}
    //                 name="tableDD"
    //                 className="tablesDD_checkbox"
    //                 type="checkbox"
    //                 id={dd.id}
    //                 checked={selectedItems?.includes(dd.id)}
    //                 onChange={checkboxHandler}
    //               />

    //               <label className="tableDD_reference" htmlFor="tableDD">
    //                 {dd.name ? dd.name : dd.id}
    //               </label>
    //             </div>
    //           </>
    //         );
    //       })}
    //     </div>

    //     <button className="manage_term_button" onClick={handleSubmit}>
    //       Save
    //     </button>
    //   </article>
    // </>
  );
};
