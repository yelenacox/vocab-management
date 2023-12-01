import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myContext } from '../../../App';
import './Terminology.scss';
import { Spinner } from '../../Manager/Spinner';
import Background from '../../../../assets/Background.png';
import BackArrow from '../../../../assets/back_arrow.png';
import DeleteTrash from '../../../../assets/delete_icon_trash.png';
import { DeleteCode } from './DeleteCode';
import { AddCode } from './AddCode';

export const Terminology = () => {
  const { terminologyId } = useParams();
  const {
    terminology,
    setTerminology,
    vocabUrl,
    loading,
    setLoading,
    codeId,
    setCodeId,
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

  const handleAddCode = () => {
    const newCodesDTO = newCodes.map(code => {
      return { description: code.description, code: code.code };
    });
    const newTerminology = {
      ...terminology,
      codes: [...terminology.codes, ...newCodesDTO],
    };
    fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTerminology),
    })
      .then(response => response.json())
      .then(updatedTerminology => {
        setTerminology(updatedTerminology);
        setNewCodes([]);
      });
  };
  console.log(newCodes);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="terminology_container">
          <div className="image_container">
            <img className="background_image_results" src={Background} />
          </div>
          <div className="terminology_back_wrapper">
            <Link to="/projects">
              <img className="terminology_back" src={BackArrow} />
              Back
            </Link>
          </div>
          <div className="terminology_sub_nav">
            <h1>{terminology?.name ? terminology?.name : terminology?.id}</h1>
            <div className="add_code_link">
              <button onClick={handleInputAdd}>Add New Code</button>
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
                    <tr key={index}>
                      <td>{r?.code}</td>
                      <td>{r?.description}</td>
                      <td className="delete_cell">
                        <DeleteCode
                          index={index}
                          terminology={terminology}
                          setTerminology={setTerminology}
                          terminologyId={terminologyId}
                        />
                      </td>
                    </tr>
                  );
                })}
                {newCodes?.map(newCode => (
                  <tr key={`newCode${newCode.id}`}>
                    <AddCode
                      code={newCode}
                      newCodes={newCodes}
                      setNewCodes={setNewCodes}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            {newCodes?.length > 0 ? (
              <button onClick={handleAddCode}>Save</button>
            ) : (
              ''
            )}
            {terminology.url}
          </div>
        </div>
      )}
    </>
  );
};
