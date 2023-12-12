import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myContext } from '../../../App';
import './Terminology.scss';
import { Spinner } from '../../Manager/Spinner';
import Background from '../../../../assets/Background.png';
import BackArrow from '../../../../assets/back_arrow.png';
import { DeleteCode } from './DeleteCode';
import { AddCode } from './AddCode';
import { EditCode } from './EditCode';
import { EditName } from './EditName';
import { EditDescription } from './EditDescription';
import { EditUrl } from './EditUrl';

export const Terminology = () => {
  const [terminologyEdit, setTerminologyEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [active, setActive] = useState(-1);
  // const [activeRows, setActiveRows] = useState([]);

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
    updateTerminology,
  } = useContext(myContext);

  const [newCodes, setNewCodes] = useState([]);
  const [newName, setNewName] = useState(terminology.name);
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

  const activeRows = [];

  const onEdit = index => {
    setActive(index);
  };

  const onCancel = () => {
    setActive(-1);
  };

  // const updateCode = (code, index) => {
  //   terminology.codes[index] = code;
  //   updateTerminology();
  //   setActive(-1);
  // };

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
            {!terminologyEdit ? (
              <h2>{terminology?.name ? terminology?.name : terminology?.id}</h2>
            ) : terminologyEdit && nameEdit === false ? (
              <>
                <h2>
                  {terminology?.name ? terminology?.name : terminology?.id}
                </h2>

                <button
                  onClick={() => {
                    setNameEdit(true);
                  }}
                >
                  Edit Name
                </button>
              </>
            ) : terminologyEdit && nameEdit === true ? (
              <EditName
                terminology={terminology}
                setTerminology={setTerminology}
                setNameEdit={setNameEdit}
              />
            ) : (
              ''
            )}

            <div className="add_code_link">
              <button onClick={handleInputAdd}>Add New Code</button>
            </div>
            <div className="add_code_link">
              <button
                onClick={() => {
                  setTerminologyEdit(!terminologyEdit),
                    onCancel(),
                    setNameEdit(false);
                  setDescriptionEdit(false);
                  setUrlEdit(false);
                }}
              >
                {terminologyEdit ? 'View' : 'Edit'}
              </button>
            </div>
          </div>
          <div className="description_wrapper">
            {!terminologyEdit ? (
              <h4>{terminology?.description}</h4>
            ) : terminologyEdit && descriptionEdit === false ? (
              <>
                <h4>{terminology?.description}</h4>

                <button
                  onClick={() => {
                    setDescriptionEdit(true);
                  }}
                >
                  Edit
                </button>
              </>
            ) : terminologyEdit && descriptionEdit === true ? (
              <EditDescription
                terminology={terminology}
                setTerminology={setTerminology}
                setDescriptionEdit={setDescriptionEdit}
              />
            ) : (
              ''
            )}
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
                      {active !== index ? (
                        <>
                          <td>{r?.code}</td>
                          <td>{r?.description}</td>
                        </>
                      ) : terminologyEdit && active === index ? (
                        <EditCode
                          codeObject={r}
                          index={index}
                          onCancel={onCancel}
                          setActive={setActive}
                        />
                      ) : (
                        ''
                      )}
                      {terminologyEdit && active !== index ? (
                        <>
                          <button onClick={() => onEdit(index)}>Edit</button>
                          <DeleteCode
                            index={index}
                            terminology={terminology}
                            setTerminology={setTerminology}
                            terminologyId={terminologyId}
                          />
                        </>
                      ) : (
                        ''
                      )}
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
            {!terminologyEdit ? (
              terminology?.url
            ) : terminologyEdit && urlEdit === false ? (
              <>
                {terminology?.url}
                <button
                  onClick={() => {
                    setUrlEdit(true);
                  }}
                >
                  Edit
                </button>
              </>
            ) : terminologyEdit && urlEdit === true ? (
              <EditUrl
                terminology={terminology}
                setTerminology={setTerminology}
                setUrlEdit={setUrlEdit}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  );
};
