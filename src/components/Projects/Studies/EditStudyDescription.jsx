import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './StudyStyling.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditStudyDescription = ({
  study,
  setStudy,
  setDescriptionEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    study.description,
  );
  const { vocabUrl } = useContext(myContext);

  const updateDescription = () => {
    handleUpdate(vocabUrl, 'Study', study);
    setDescriptionEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateDescription} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setStudy({
            ...study,
            description: initialDescription,
          });
          setDescriptionEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="description"
        className="terminology_input input_field"
        type="text"
        value={study.description}
        onChange={evt => {
          setStudy({
            ...study,
            description: evt.target.value,
          });
        }}
      />
    </>
  );
};
