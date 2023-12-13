import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';

export const DeleteTerminology = ({ terminology, setTerminologies }) => {
  const [updatedTerminologies, setupdatedTerminologies] = useState([]);
  const { vocabUrl } = useContext(myContext);

  const handleDelete = evt => {
    fetch(`${vocabUrl}/terminologies/${terminology.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        return fetch(`${vocabUrl}/terminologies/`);
      })
      .then(response => response.json())
      .then(updatedTerminologies => {
        setTerminologies(updatedTerminologies);
      });
  };

  return (
    <img className="small_icon" onClick={handleDelete} src={DeleteTrash} />
  );
};
