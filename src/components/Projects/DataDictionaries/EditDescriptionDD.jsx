import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './DDStyling.scss';
import { updateDD } from '../../Manager/DDManager';

export const EditDescriptionDD = ({
  dataDictionary,
  setDataDictionary,
  setDescriptionEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    dataDictionary.description,
  );
  const { vocabUrl } = useContext(myContext);

  const updateDescription = () => {
    updateDD(vocabUrl, dataDictionary);
    setDescriptionEdit(false);
  };
  return (
    <>
      <img className="small_icon" onClick={updateDescription} src={SaveIcon} />
      <img
        className="small_icon"
        onClick={() => {
          setDataDictionary({
            ...dataDictionary,
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
        value={dataDictionary.description}
        onChange={evt => {
          setDataDictionary({
            ...dataDictionary,
            description: evt.target.value,
          });
        }}
      />
    </>
  );
};
