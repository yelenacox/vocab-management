import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditStudyIdentifierPrefix = ({
  study,
  setStudy,
  setIdentifierEdit,
}) => {
  const { vocabUrl } = useContext(myContext);
  const [initialIdentifier, setInitialIdentifier] = useState(
    study.identifier_prefix,
  );

  const updateIdentifier = () => {
    handleUpdate(vocabUrl, 'Study', study);
    setIdentifierEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateIdentifier} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setStudy({ ...study, identifier_prefix: initialIdentifier });
          setIdentifierEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="url"
        className="terminology_input url input_field"
        type="text"
        value={study.identifier_prefix}
        onChange={evt => {
          setStudy({ ...study, identifier_prefix: evt.target.value });
        }}
      />
    </>
  );
};
