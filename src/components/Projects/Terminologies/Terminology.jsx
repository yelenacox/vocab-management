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
import { EditTerminology } from './EditTerminology';

export const Terminology = () => {
  const [terminologyEdit, setTerminologyEdit] = useState(false);
  const [codeEdit, setCodeEdit] = useState(false);
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

  useEffect(() => {
    getTerminologyById();
  }, []);
  const editTerminology = (codeObject, index) => {
    console.log('INDY!!!!!', index);
    if (index) {
      const updatedCodes = terminology.codes;
      updatedCodes[index] = codeObject;
      setTerminology({ ...terminology, codes: updatedCodes });
    }
  };
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
    // activeRows.push(index);
    // setActiveRows(...activeRows, index);
    // console.log('active rows: ', activeRows);
  };

  const onCancel = () => {
    setActive(-1);
    // activeRows.splice(index, 1);
    // setActiveRows(...activeRows, activeRows.splice(index, 1))
    // console.log('removing active: ', index);
  };

  // const updateCode = (term) => {
  // const newTerm = {...terminology, name: term.name}
  //  setTerminology(newTerm)\
  //updateTerminology();
  //}
  const updateCode = (code, index) => {
    terminology.codes[index] = code;
    updateTerminology();
    setActive(-1);
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
            <div className="add_code_link">
              <button
                onClick={() => {
                  setTerminologyEdit(!terminologyEdit), onCancel();
                }}
              >
                {terminologyEdit ? 'View' : 'Edit'}
              </button>
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
                        //   <EditCodeButtons
                        //   terminologyEdit={terminologyEdit}
                        //   active={active}
                        //   index={index}
                        //   onCancel={}
                        //   codeObject={r}
                        // />
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
            {terminology.url}
          </div>
        </div>
      )}
    </>
  );
};
