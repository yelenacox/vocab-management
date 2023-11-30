import { useContext, useState } from 'react';
import { myContext } from '../../App';
import DeleteTrash from '../../../assets/delete_icon_trash.png';

export const DeleteCode = ({
  index,
  terminology,
  setTerminology,
  terminologyId,
}) => {
  const { vocabUrl } = useContext(myContext);

  const handleDelete = index => {
    terminology.codes.splice(index, 1);
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
    })
      .then(response => response.json())
      .then(updatedTerminology => {
        setTerminology(updatedTerminology);
      });
  };

  return (
    <img
      className="delete_image"
      onClick={() => handleDelete(index)}
      src={DeleteTrash}
    />
  );
};
