import { useContext, useState } from 'react';
import { myContext } from '../../../App';

export const EditUrl = ({ terminology, setTerminology, setUrlEdit }) => {
  const [initialUrl, setInitialUrl] = useState(terminology.url);
  const { updateTerminology } = useContext(myContext);

  const updateUrl = () => {
    updateTerminology();
    setUrlEdit(false);
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
          setUrlEdit(false);
        }}
      >
        Cancel
      </button>
    </>
  );
};
