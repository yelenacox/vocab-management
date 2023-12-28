import { useContext, useState } from 'react';
import { myContext } from '../../../App';

export const AdditionalVariableInput = ({ variable }) => {
  const { table, setTable, handleVariableAdd } = useContext(myContext);
  const [thisVariable, setThisVariable] = useState(variable);

  //   useEffect(() => {
  //     let variableIndex;
  //     table.variables.forEach((variable, index) => {
  //       // console.log('THIS CODE ID: ', code.id === props.code.id);
  //       if (variable.id === thisVariable.id) {
  //         // console.log('FOUND IT', index);
  //         variableIndex = index;
  //       }
  //     });
  //     // console.log('EXISTING CODE INDEX:', codeIndex);
  //     let newTable = table;
  //     newTable.variables[variableIndex] = thisVariable;
  //     setTable(newTable);
  //   }, [thisVariable]);
  //   // console.log('THISCODE ', thisCode);

  return (
    <>
      <div className="additional_code_container">
        <div className="code form_wrapper">
          <label className="input_label" htmlFor="variable_name">
            Name
          </label>
          <input
            required
            id="name"
            className="add_code_input"
            type="text"
            value={table.name}
            onChange={evt => {
              setThisVariable({
                ...thisVariable,
                name: evt.target.value,
              });
            }}
          />
        </div>
        <div className="code_description form_wrapper">
          <label className="input_label" htmlFor="variable_description">
            Description
          </label>
          <input
            required
            id="variable_description"
            className="code_display_input"
            type="text"
            value={table.description}
            onChange={evt => {
              setThisVariable({
                ...thisVariable,
                description: evt.target.value,
              });
            }}
          />
        </div>
        <div className="code_button_wrapper">
          <div className="above_btn"></div>
          <button className="manage_code_button" onClick={handleVariableAdd}>
            +
          </button>
        </div>
      </div>
    </>
  );
};
