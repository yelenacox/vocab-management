import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AddTerminology.scss';

export const AdditionalCodeInput = props => {
  const { terminology, setTerminology, handleCodeAdd } = useContext(myContext);
  const [thisCode, setThisCode] = useState(props.code);

  useEffect(() => {
    let codeIndex;
    terminology.codes.forEach((code, index) => {
      if (code.id === thisCode.id) {
        codeIndex = index;
      }
    });
    let newTerminology = terminology;
    newTerminology.codes[codeIndex] = thisCode;
    setTerminology(newTerminology);
  }, [thisCode]);

  return (
    <>
      <div className="additional_code_container">
        <div className="code form_wrapper">
          <label className="input_label" htmlFor="terminology_code">
            Code
          </label>
          <input
            required
            id="code"
            className="add_code_input"
            type="text"
            value={terminology.code}
            onChange={evt => {
              setThisCode({
                ...thisCode,
                code: evt.target.value,
              });
            }}
          />
        </div>
        <div className="code_description form_wrapper">
          <label className="input_label" htmlFor="terminology_code_description">
            Display
          </label>
          <input
            required
            id="code_description"
            className="code_display_input"
            type="text"
            value={terminology.display}
            onChange={evt => {
              setThisCode({
                ...thisCode,
                display: evt.target.value,
              });
            }}
          />
        </div>
        <div className="code_button_wrapper">
          <div className="above_btn"></div>
          <button className="manage_code_button" onClick={handleCodeAdd}>
            +
          </button>
        </div>
      </div>
    </>
  );
};
