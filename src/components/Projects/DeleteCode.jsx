import { useContext, useState } from 'react';
import { myContext } from '../../App';
import DeleteTrash from '../../../assets/delete_icon_trash.png';

export const DeleteCode = ({ index, terminology, terminologyId }) => {
  const { vocabUrl } = useContext(myContext);

  const handleDelete = index => {
    terminology.codes.splice(index, 1);
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
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
