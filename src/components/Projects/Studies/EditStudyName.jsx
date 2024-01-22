import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './StudyStyling.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditStudyName = ({ study, setStudy, setStudyNameEdit }) => {
  const [initialStudyName, setInitialStudyName] = useState(study?.name);
  const { vocabUrl } = useContext(myContext);

  const updateStudyName = () => {
    handleUpdate(vocabUrl, 'Study', study);
    setStudyNameEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateStudyName} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setStudy({ ...study, name: initialStudyName });
          setStudyNameEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="name"
        className="terminology_input input_field"
        type="text"
        value={study?.name}
        onChange={evt => {
          setStudy({ ...study, name: evt.target.value });
        }}
      />
    </>
  );
};
