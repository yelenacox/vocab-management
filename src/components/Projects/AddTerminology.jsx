import { React, useContext, useEffect, useState } from 'react';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import './AddTerminology.scss';
import { myContext } from '../../App';
import { AdditionalCodeInput } from './AdditionalCodeInput';
import BackArrow from '../../../assets/back_arrow.png';

export const AddTerminology = () => {
  const {
    loading,
    setLoading,
    vocabUrl,
    terminology,
    setTerminology,
    initialTerminology,
  } = useContext(myContext);
  const [codeId, setCodeId] = useState(0);

  const handleCodeAdd = () => {
    setTerminology({
      ...terminology,
      codes: [
        ...terminology.codes,
        { id: getCodeId(), code: '', description: '' },
      ],
    });
  };

  useEffect(
    () => () => {
      setTerminology(initialTerminology);
    },
    [],
  );

  useEffect(() => {
    // console.log('ADD FIRST CODE', terminology.codes.length);
    if (terminology?.codes?.length === 0) {
      // console.log('ADD FIRST CODE PLZ', terminology.codes.length);
      handleCodeAdd();
    }
  });

  // console.log('TERMINOLOGY: ', JSON.stringify(terminology));
  const navigate = useNavigate();

  let terminologyDTO = () => {
    const codesDTO = terminology.codes.map(code => {
      return { code: code.code, description: code.description };
    });
    return { ...terminology, codes: codesDTO };
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${vocabUrl}/terminologies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminologyDTO()),
    })
      .then(res => res.json())
      .then(data => navigate(`/terminologies/${data?.id}`));
  };

  // console.log('code id', codeId);
  const getCodeId = () => {
    const current = codeId;
    setCodeId(codeId + 1);
    return current;
  };

  return (
    <>
      <article className="form_container">
        <div className="terminology_back_wrapper back_margin">
          <Link to="/projects">
            <img className="terminology_back" src={BackArrow} />
            Back
          </Link>
        </div>
        <div className="name">
          <label htmlFor="terminology_name">Name</label>
          <input
            id="name"
            className="name_input"
            type="text"
            value={terminology.name}
            onChange={evt => {
              setTerminology({
                ...terminology,
                name: evt.target.value,
              });
            }}
          />
        </div>

        <div className="description">
          <label htmlFor="terminology_description">Description</label>
          <textarea
            id="description"
            className="description_input"
            type="text"
            value={terminology.description}
            onChange={evt => {
              setTerminology({
                ...terminology,
                description: evt.target.value,
              });
            }}
          />
        </div>

        <div className="url">
          <label htmlFor="terminology_url">URL</label>
          <input
            required
            id="url"
            className="url_input"
            type="text"
            value={terminology.url}
            onChange={evt => {
              setTerminology({
                ...terminology,
                url: evt.target.value,
              });
            }}
          />
        </div>

        {terminology.codes.map(code => (
          <AdditionalCodeInput code={code} />
        ))}
        <div className="new_code_input">
          <button onClick={handleCodeAdd}>Add New Code</button>
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </article>
    </>
  );
};
