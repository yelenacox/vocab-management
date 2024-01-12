import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './DDStyling.scss';
import { updateDD } from '../../Manager/DDManager';

export const EditNameDD = ({
  dataDictionary,
  setDataDictionary,
  setNameEdit,
}) => {
  const [initialName, setInitialName] = useState(dataDictionary.name);
  const { vocabUrl } = useContext(myContext);

  const updateName = () => {
    updateDD(vocabUrl, dataDictionary);
    setNameEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateName} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setDataDictionary({ ...dataDictionary, name: initialName });
          setNameEdit(false);
        }}
        src={CancelIcon}
      />

      <input
        id="name"
        className="terminology_input input_field"
        type="text"
        value={dataDictionary.name}
        onChange={evt => {
          setDataDictionary({ ...dataDictionary, name: evt.target.value });
        }}
      />
    </>
  );
};
