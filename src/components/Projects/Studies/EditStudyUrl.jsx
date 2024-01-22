import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import { handleUpdate } from '../../Manager/FetchManager';

export const EditStudyUrl = ({ study, setStudy, setUrlEdit }) => {
  const [initialUrl, setInitialUrl] = useState(study.url);
  const { vocabUrl } = useContext(myContext);

  const updateUrl = () => {
    handleUpdate(vocabUrl, 'Study', study);
    setUrlEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateUrl} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setStudy({ ...study, url: initialUrl });
          setUrlEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="url"
        className="terminology_input url input_field"
        type="text"
        value={study.url}
        onChange={evt => {
          setStudy({ ...study, url: evt.target.value });
        }}
      />
    </>
  );
};
