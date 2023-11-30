import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './AddCode.scss';

export const AddCode = props => {
  const { terminology, setTerminology } = useContext(myContext);
  const [thisCode, setThisCode] = useState(props.code);

  return (
    <>
      <div className="add_code_container">
        <div className="add_code">
          <input
            required
            id="code"
            className="code_input"
            type="text"
            value={terminology.code}
          />
        </div>
        <div className="add_code_description">
          <input
            required
            id="code_description"
            className="code_description_input"
            type="text"
            value={terminology.codeDescription}
          />
        </div>
      </div>
    </>
  );
};
