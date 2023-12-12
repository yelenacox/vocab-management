import { useContext, useState } from 'react';
import { myContext } from '../../../App';

export const EditUrl = ({ terminology, setTerminology, setDetailsEdit }) => {
  const [initialUrl, setInitialUrl] = useState(terminology.url);
  const { updateTerminology } = useContext(myContext);

  const updateUrl = () => {
    updateTerminology();
    setDetailsEdit(false);
  };
  return (
    <>
      <input
        id="url"
        className="url"
        type="text"
        value={terminology.url}
        onChange={evt => {
          setTerminology({ ...terminology, url: evt.target.value });
        }}
      />
      <button onClick={updateUrl}>Save</button>
      <button
        onClick={() => {
          setTerminology({ ...terminology, url: initialUrl });
          setDetailsEdit(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};
