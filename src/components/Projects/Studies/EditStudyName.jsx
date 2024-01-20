import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './DDStyling.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditStudyName = ({ study, setStudy, setNameEdit }) => {
  const [initialName, setInitialName] = useState(study.name);
  const { vocabUrl } = useContext(myContext);

  const updateName = () => {
    handleUpdate(vocabUrl, 'Study', study);
    setNameEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateName} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setStudy({ ...study, name: initialName });
          setNameEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="name"
        className="terminology_input input_field"
        type="text"
        value={study.name}
        onChange={evt => {
          setStudy({ ...study, name: evt.target.value });
        }}
      />
    </>
  );
};
