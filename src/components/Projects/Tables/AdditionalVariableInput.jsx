import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AdditionalVariableInputs.scss';
import { getAll } from '../../Manager/FetchManager';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AdditionalVariableInput = props => {
  const { variable, index, form } = props;
  const {
    vocabUrl,
    table,
    addTableVariable,
    terminologies,
    setTerminologies,
    updateTableVariable,
    setLoading,
    removeTableVariable,
  } = useContext(myContext);
  const [thisVariable, setThisVariable] = useState(variable);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };

  useEffect(() => {
    updateTableVariable(thisVariable);
  }, [thisVariable, table.variables]);

  useEffect(() => {
    thisVariable.data_type === 'ENUMERATION' ? getTerminologies() : '';
  }, [thisVariable.data_type]);

  const getTerminologies = () => {
    setLoading(true);
    getAll(vocabUrl, 'Terminology')
      .then(res => res.json())
      .then(data => setTerminologies(data))
      .then(() => setLoading(false));
  };

  return (
    <>
      <Form.List name="variables">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 30,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[variable, 'variable']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing variable name.',
                    },
                  ]}
                >
                  <Input placeholder="Variable Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[variable, 'description']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing variable description.',
                    },
                  ]}
                >
                  <Input placeholder="Variable Description" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add variable
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
// <div>
//   <div className="additional_code_container">
//     <div className="code form_wrapper">
//       <label className="input_label" htmlFor="variable_name">
//         Variable Name
//       </label>
//       <input
//         required
//         id="variable_name"
//         className="add_variable_input"
//         type="text"
//         value={table.varName}
//         onChange={evt => {
//           setThisVariable({
//             ...thisVariable,
//             name: evt.target.value,
//           });
//         }}
//       />
//     </div>
//     <div className="variable_description form_wrapper">
//       <label className="input_label" htmlFor="variable_description">
//         Description
//       </label>
//       <input
//         required
//         id="variable_description"
//         className="variable_display_input"
//         type="text"
//         value={table.varDescription}
//         onChange={evt => {
//           setThisVariable({
//             ...thisVariable,
//             description: evt.target.value,
//           });
//         }}
//       />
//     </div>
//     <div className="data_type form_wrapper">
//       <label className="input_label" htmlFor="variable_data_type">
//         Data Type
//       </label>
//       <select
//         className="data_type_select"
//         value={table.data_type}
//         onChange={evt => {
//           setThisVariable({
//             ...thisVariable,
//             data_type: evt.target.value,
//           });
//         }}
//       >
//         <option value="0">Select...</option>
//         <option value="STRING">String</option>
//         <option value="INTEGER">Integer</option>
//         <option value="QUANTITY">Quantity</option>
//         <option value="ENUMERATION">Enumeration</option>
//       </select>
//     </div>
//     <div className="code_button_wrapper">
//       <div className="above_btn"></div>
//       <button className="manage_code_button" onClick={addTableVariable}>
//         +
//       </button>
//       {/* {table.variables.length > 1 ? (
//         <button
//           className="manage_code_button"
//           onClick={() => removeTableVariable(thisVariable)}
//         >
//           -
//         </button>
//       ) : (
//         ''
//       )} */}
//     </div>
//   </div>
//   <div className="data_type_inputs">
//     {thisVariable.data_type === 'INTEGER' ||
//     thisVariable.data_type === 'QUANTITY' ? (
//       <>
//         <div className="code form_wrapper">
//           <label className="input_label" htmlFor="variable_min">
//             Min
//           </label>
//           <input
//             id="variable_min"
//             className="add_code_input"
//             type="text"
//             value={table.min}
//             onChange={evt => {
//               setThisVariable({
//                 ...thisVariable,
//                 min: evt.target.value,
//               });
//             }}
//           />
//         </div>
//         <div className="code form_wrapper">
//           <label className="input_label" htmlFor="variable_max">
//             Max
//           </label>
//           <input
//             id="variable_max"
//             className="add_code_input"
//             type="text"
//             value={table.max}
//             onChange={evt => {
//               setThisVariable({
//                 ...thisVariable,
//                 max: evt.target.value,
//               });
//             }}
//           />
//         </div>
//         <div className="code form_wrapper">
//           <label className="input_label" htmlFor="variable_units">
//             Units
//           </label>
//           <input
//             id="variable_units"
//             className="add_code_input"
//             type="text"
//             value={table.units}
//             onChange={evt => {
//               setThisVariable({
//                 ...thisVariable,
//                 units: evt.target.value,
//               });
//             }}
//           />
//         </div>
//       </>
//     ) : thisVariable.data_type === 'ENUMERATION' ? (
//       <>
//         {' '}
//         <div className="data_type form_wrapper">
//           <label className="input_label" htmlFor="variable_data_type">
//             Terminology
//           </label>
//           <select
//             className="data_type_select"
//             value={table?.enumerations?.reference}
//             onChange={evt => {
//               setThisVariable({
//                 ...thisVariable,
//                 enumerations: {
//                   reference: evt.target.value,
//                 },
//               });
//             }}
//           >
//             <option value="0">Select...</option>
//             {terminologies.map(term => {
//               return (
//                 <>
//                   <option value={`Terminology/${term.id}`} key={term.id}>
//                     {term.name ? term.name : term.id}
//                   </option>
//                 </>
//               );
//             })}
//           </select>
//         </div>
//       </>
//     ) : (
//       ''
//     )}
//   </div>
// </div>
