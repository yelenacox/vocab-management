import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './Terminology.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditName = ({ terminology, setTerminology, setNameEdit }) => {
  const [initialName, setInitialName] = useState(terminology.name);
  const { vocabUrl } = useContext(myContext);

  const updateName = () => {
    handleUpdate(vocabUrl, 'Terminology', terminology).then(data =>
      setTerminology(data),
    );
    setNameEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateName} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTerminology({ ...terminology, name: initialName });
          setNameEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="name"
        className="terminology_input input_field"
        type="text"
        value={terminology.name}
        onChange={evt => {
          setTerminology({ ...terminology, name: evt.target.value });
        }}
      />
    </>
  );
};
