import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';

export const AdditionalCodeInput = props => {
  const { terminology, setTerminology } = useContext(myContext);
  const [thisCode, setThisCode] = useState(props.code);

  useEffect(() => {
    let codeIndex;
    terminology.codes.forEach((code, index) => {
      // console.log('THIS CODE ID: ', code.id === props.code.id);
      if (code.id === thisCode.id) {
        // console.log('FOUND IT', index);
        codeIndex = index;
      }
    });
    // console.log('EXISTING CODE INDEX:', codeIndex);
    let newTerminology = terminology;
    newTerminology.codes[codeIndex] = thisCode;
    setTerminology(newTerminology);
  }, [thisCode]);
  // console.log('THISCODE ', thisCode);

  return (
    <>
      <div className="code">
        <label htmlFor="terminology_code">Code</label>
        <input
          required
          id="code"
          className="code_input"
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
      <div className="code_description">
        <label htmlFor="terminology_code_description">Code Description</label>
        <input
          required
          id="code_description"
          className="code_description_input"
          type="text"
          value={terminology.codeDescription}
          onChange={evt => {
            setThisCode({
              ...thisCode,
              description: evt.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
