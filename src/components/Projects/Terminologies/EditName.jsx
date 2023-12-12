import { useContext, useState } from 'react';
import { myContext } from '../../../App';

export const EditName = ({ terminology, setTerminology, setDetailsEdit }) => {
  const [initialName, setInitialName] = useState(terminology.name);
  const { updateTerminology } = useContext(myContext);

  const updateName = () => {
    updateTerminology();
    setDetailsEdit(false);
  };
  return (
    <>
      <input
        id="name"
        className="name_input"
        type="text"
        value={terminology.name}
        onChange={evt => {
          setTerminology({ ...terminology, name: evt.target.value });
        }}
      />
      <button onClick={updateName}>Save</button>
      <button
        onClick={() => {
          setTerminology({ ...terminology, name: initialName });
          setDetailsEdit(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};
