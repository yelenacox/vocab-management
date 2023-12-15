import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myContext } from '../../../App';
import './Terminology.scss';
import { Spinner } from '../../Manager/Spinner';
import Background from '../../../../assets/Background.png';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
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
    fetch(`${vocabUrl}/Terminology/${terminologyId}`, {
      // fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
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
    const newCode = { code: '', display: '', id: getCodeId() };
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
          <div className="terminology_sub_nav">
            {/* <Link to="/projects">
              <img className="terminology_back" src={BackArrow} />
            </Link> */}
            <div className="add_code_link">
              <button
                className="manage_term_button"
                onClick={() => {
                  setTerminologyEdit(!terminologyEdit),
                    onCancel(),
                    setNameEdit(false);
                  setDescriptionEdit(false);
                  setUrlEdit(false);
                }}
              >
                {terminologyEdit ? 'View' : 'Manage'}
              </button>
            </div>
            {terminologyEdit ? (
              <div className="add_code_link">
                <button className="manage_term_button" onClick={handleInputAdd}>
                  Add Code
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="terminology_details terminology_name">
            {!terminologyEdit ? (
              <>
                <div className="initial_div"></div>

                {terminology?.name ? terminology?.name : terminology?.id}
              </>
            ) : terminologyEdit && nameEdit === false ? (
              <>
                <div className="initial_div">
                  <img
                    className="small_icon"
                    onClick={() => setNameEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {terminology?.name ? terminology?.name : terminology?.id}
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
          </div>
          <div className="terminology_details terminology_desc">
            {!terminologyEdit ? (
              <>
                <div className="initial_div empty_description"></div>
                {terminology?.description}
              </>
            ) : terminologyEdit && descriptionEdit === false ? (
              <>
                <div className="initial_div empty_description">
                  <img
                    className="small_icon"
                    onClick={() => setDescriptionEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {terminology?.description}
                {/* {terminology?.description ? (
                  terminology.description
                ) : (
                  <>
                    <img className="terminology_back" src={BackArrow} />
                    description
                  </>
                )} */}
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
                  <th></th>
                  <th className="first_cell">Code</th>
                  <th className="second_cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {terminology?.codes?.map((r, index) => {
                  return (
                    <tr key={r?.code}>
                      {active !== index ? (
                        <>
                          <td className="icon_cell">
                            {' '}
                            {terminologyEdit && active !== index ? (
                              <>
                                <img
                                  className="small_icon"
                                  onClick={() => onEdit(index)}
                                  src={PencilIcon}
                                />
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
                          </td>
                          <td className="first_cell">{r?.code}</td>
                          <td className="second_cell">{r?.display}</td>
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
            <div className="terminology_details">
              {!terminologyEdit ? (
                <>
                  <div className="initial_div"></div>
                  {terminology?.url}
                </>
              ) : terminologyEdit && urlEdit === false ? (
                <>
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setUrlEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  {terminology?.url}
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
        </div>
      )}
    </>
  );
};
