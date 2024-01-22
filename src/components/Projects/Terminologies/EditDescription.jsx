import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './Terminology.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditDescription = ({
  terminology,
  setTerminology,
  setDescriptionEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    terminology.description,
  );
  const { vocabUrl } = useContext(myContext);

  const updateDescription = () => {
    handleUpdate(vocabUrl, 'Terminology', terminology).then(data =>
      setTerminology(data),
    );
    setDescriptionEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateDescription} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTerminology({ ...terminology, description: initialDescription });
          setDescriptionEdit(false);
        }}
        src={CancelIcon}
      />
      <input
        id="description"
        className="terminology_input description_input input_field"
        type="text"
        value={terminology?.description}
        onChange={evt => {
          setTerminology({ ...terminology, description: evt.target.value });
        }}
      />
    </>
  );
};
