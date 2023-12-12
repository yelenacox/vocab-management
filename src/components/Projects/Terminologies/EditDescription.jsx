import { useContext, useState } from 'react';
import { myContext } from '../../../App';

export const EditDescription = ({
  terminology,
  setTerminology,
  setDetailsEdit,
}) => {
  const [initialDescription, setInitialDescription] = useState(
    terminology.description,
  );
  const { updateTerminology } = useContext(myContext);

  const updateDescription = () => {
    updateTerminology();
    setDetailsEdit(false);
  };
  return (
    <>
      <input
        id="description"
        className="description_input"
        type="text"
        value={terminology.description}
        onChange={evt => {
          setTerminology({ ...terminology, description: evt.target.value });
        }}
      />
      <button onClick={updateDescription}>Save</button>
      <button
        onClick={() => {
          setTerminology({ ...terminology, description: initialDescription });
          setDetailsEdit(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};
