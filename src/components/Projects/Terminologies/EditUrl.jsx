import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './Terminology.scss';

export const EditUrl = ({ terminology, setTerminology, setUrlEdit }) => {
  const [initialUrl, setInitialUrl] = useState(terminology.url);
  const { updateTerminology } = useContext(myContext);

  const updateUrl = () => {
    updateTerminology();
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
