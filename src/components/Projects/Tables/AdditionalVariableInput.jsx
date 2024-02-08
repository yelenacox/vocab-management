import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AdditionalVariableInputs.scss';
import { getAll } from '../../Manager/FetchManager';
import { Button, Form, Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

export const AdditionalVariableInput = props => {
  const { variable, index, form } = props;
  const {
    vocabUrl,
    table,
    // addTableVariable,
    terminologies,
    setTerminologies,
    updateTableVariable,
    setLoading,
    getVariableId,
    removeTableVariable,
  } = useContext(myContext);
  const [thisVariable, setThisVariable] = useState(variable);

  const addTableVariable = () => {
    const tableVars = table.variables;
    tableVars.push({ id: getVariableId() });
    setTable({
      ...table,
      variables: tableVars,
    });
  };

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
      <Form.List
        name="variables"
        rules={[
          {
            validator: async (_, variables) => {
              if (!variables || variables.length < 1) {
                return Promise.reject(
                  new Error('At least 1 variable is required.'),
                );
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ field, index }) => (
              <Space
                key={index}
                style={{
                  display: 'flex',
                  marginBottom: 3,
                }}
                align="baseline"
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  label="Variable name"
                  value={table.varName}
                  rules={[
                    {
                      required: true,
                      // whitespace: true,
                      message: 'Variable name is required.',
                    },
                  ]}
                  onChange={evt => {
                    setThisVariable({
                      ...thisVariable,
                      name: evt.target.value,
                    });
                  }}
                >
                  <Input
                    style={{
                      width: '15vw',
                      flexShrink: 1,
                    }}
                    placeholder="Variable Name"
                  />
                </Form.Item>
                <Form.Item
                  {...field}
                  label="Variable description"
                  value={table.varDescription}
                  rules={[
                    {
                      required: true,
                      message: 'Variable description is required.',
                    },
                  ]}
                  onChange={evt => {
                    setThisVariable({
                      ...thisVariable,
                      description: evt.target.value,
                    });
                  }}
                >
                  <Input
                    style={{
                      width: '39vw',
                    }}
                    placeholder="Variable Description"
                  />
                </Form.Item>

                <Form.Item
                  label="Data Type"
                  value={table.data_type}
                  rules={[
                    {
                      required: true,
                      message: 'Data type is required.',
                    },
                  ]}
                  onChange={evt => {
                    setThisVariable({
                      ...thisVariable,
                      data_type: evt.target.value,
                    });
                  }}
                >
                  <Select
                    style={{ width: '9vw' }}
                    placeholder="Select data type"
                    allowClear
                  >
                    <Option value="string">String</Option>
                    <Option value="integer">Integer</Option>
                    <Option value="quantity">Quantity</Option>
                    <Option value="enumeration">Enumeration</Option>
                  </Select>
                </Form.Item>
                {fields.length === 1 ? null : (
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                )}
              </Space>
            ))}

            <Form.Item>
              <Button
                style={{ width: 250 }}
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add variable
              </Button>
            </Form.Item>
            <Form.ErrorList errors={errors} />
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
