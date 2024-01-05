import { useContext, useState } from 'react';
import { myContext } from '../../../App';
import DeleteTrash from '../../../../assets/trash_transparent.png';

export const DeleteVariable = ({ index, table, setTable, tableId }) => {
  const { vocabUrl } = useContext(myContext);

  const handleDelete = index => {
    table.variables.splice(index, 1);
    fetch(`${vocabUrl}/Table/${tableId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    })
      .then(response => response.json())
      .then(updatedTable => {
        setTable(updatedTable);
      });
  };

  return (
    <img
      className="small_icon"
      onClick={() => handleDelete(index)}
      src={DeleteTrash}
    />
  );
};
