import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './Terminology.scss';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditUrl = ({ terminology, setTerminology, setUrlEdit }) => {
  const [initialUrl, setInitialUrl] = useState(terminology.url);
  const { vocabUrl } = useContext(myContext);

  const updateUrl = () => {
    handleUpdate(vocabUrl, 'Terminology', terminology)
      .then(res => res.json())
      .then(data => setTerminology(data));
    setUrlEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateUrl} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setTerminology({ ...terminology, url: initialUrl });
          setUrlEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="url"
        className="terminology_input url input_field"
        type="text"
        value={terminology.url}
        onChange={evt => {
          setTerminology({ ...terminology, url: evt.target.value });
        }}
      />
    </>
  );
};
