import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myContext } from '../../../App';
import './Terminology.scss';
import { Spinner } from '../../Manager/Spinner';
import Background from '../../../../assets/Background.png';
import BackArrow from '../../../../assets/back_arrow.png';
import { DeleteCode } from './DeleteCode';
import { AddCode } from './AddCode';

export const Terminology = () => {
  const [termEdit, setTermEdit] = useState(false);
  const { terminologyId } = useParams();
  const {
    terminology,
    setTerminology,
    vocabUrl,
    loading,
    setLoading,
    codeId,
    setCodeId,
    initialTerminology,
  } = useContext(myContext);
  const [newCodes, setNewCodes] = useState([]);

  useEffect(() => {
    getTerminologyById();
  }, []);

  const getTerminologyById = () => {
    setLoading(true);
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTerminology(data))
      .then(() => {
        setLoading(false);
      });
  };

  const handleInputAdd = () => {
    const newCode = { code: '', description: '', id: getCodeId() };
    setNewCodes([...newCodes, newCode]);
  };

  const getCodeId = () => {
    const current = codeId;
    setCodeId(codeId + 1);
    return current;
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="terminology_container">
          <div className="image_container">
            <img className="background_image_results" src={Background} />
          </div>
          {!termEdit ? (
            <div className="terminology_back_wrapper">
              <Link to="/projects">
                <img className="terminology_back" src={BackArrow} />
                Back
              </Link>
            </div>
          ) : (
            ''
          )}
          {!termEdit ? (
            <>
              {' '}
              <div className="terminology_sub_nav">
                <h1>
                  {terminology?.name ? terminology?.name : terminology?.id}
                </h1>
                <div className="add_code_link">
                  <button onClick={handleInputAdd}>Add New Code</button>
                </div>
                <div className="add_code_link">
                  <button onClick={() => setTermEdit(true)}>Edit</button>
                </div>
              </div>
              <h4>{terminology.description}</h4>
              <div className="table_container">
                <table className="table">
                  <thead className="header">
                    <tr className="header_row">
                      <th>Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terminology?.codes?.map((r, index) => {
                      return (
                        <tr key={r?.code}>
                          <td>{r?.code}</td>
                          <td>{r?.description}</td>
                          {/* <td className="delete_cell">
                            <DeleteCode
                              index={index}
                              terminology={terminology}
                              setTerminology={setTerminology}
                              terminologyId={terminologyId}
                            />
                          </td> */}
                        </tr>
                      );
                    })}
                    {newCodes?.map((newCode, i) => (
                      <tr key={`newCode${newCode.id}`}>
                        <AddCode
                          code={newCode}
                          i={i}
                          newCode={newCode}
                          newCodes={newCodes}
                          setNewCodes={setNewCodes}
                          terminologyId={terminologyId}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* {newCodes?.length > 0 ? (
              <button onClick={handleAddCode}>Save</button>
            ) : (
              ''
            )} */}
                {terminology.url}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setTermEdit(false)}>
                Back to Terminology
              </button>
              <div className="terminology_sub_nav">
                <label htmlFor="terminology_name">Name</label>{' '}
                <input
                  autoFocus
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
                <button>Save</button>
                <div className="description">
                  <label htmlFor="terminology_description">Description</label>
                  <input
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
                  <button>Save</button>
                </div>{' '}
              </div>
              <div className="table_container">
                <table className="table">
                  <thead className="header">
                    <tr className="header_row">
                      <th>Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terminology?.codes?.map((r, index) => {
                      return (
                        <tr key={r?.code}>
                          <td>
                            {' '}
                            <input
                              required
                              id="code"
                              className="code_input"
                              type="text"
                              value={r.code}
                              onChange={evt => {
                                setThisCode({
                                  ...thisCode,
                                  code: evt.target.value,
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              required
                              id="code_description"
                              className="code_description_input"
                              type="text"
                              value={r.description}
                              onChange={evt => {
                                setThisCode({
                                  ...thisCode,
                                  description: evt.target.value,
                                });
                              }}
                            />
                          </td>
                          <td className="delete_cell">
                            <DeleteCode
                              index={index}
                              terminology={terminology}
                              setTerminology={setTerminology}
                              terminologyId={terminologyId}
                            />
                          </td>
                          <td className="edit_cell">
                            {' '}
                            <button>Save</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
