import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';
import { handleDelete } from '../../Manager/FetchManager';

export const DeleteStudy = ({ study, setStudies }) => {
  const { vocabUrl } = useContext(myContext);

  return (
    <img
      className="small_icon"
      onClick={evt =>
        handleDelete(evt, vocabUrl, 'Study', study).then(data =>
          setStudies(data),
        )
      }
      src={DeleteTrash}
    />
  );
};
