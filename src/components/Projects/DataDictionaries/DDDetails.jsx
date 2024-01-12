import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import './DDStyling.scss';
import { EditNameDD } from './EditNameDD';
import { EditDescriptionDD } from './EditDescriptionDD';

export const DDDetails = () => {
  const [DDEdit, setDDEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [active, setActive] = useState(-1);
  const [newVars, setNewVars] = useState([]);
  const {
    dataDictionary,
    setDataDictionary,
    vocabUrl,
    loading,
    setLoading,
    getVariableId,
  } = useContext(myContext);
  const { DDId } = useParams();

  useEffect(() => {
    getDDById();
  }, []);

  useEffect(
    () => () => {
      setDataDictionary({});
    },
    [],
  );

  const onEdit = index => {
    setActive(index);
  };

  const onCancel = () => {
    setActive(-1);
  };

  const handleOpen = (open, set) => {
    set(open);
  };

  const handleInputAdd = () => {
    const newVar = {
      name: '',
      description: '',
      data_type: '',
      id: getVariableId(),
    };
    setNewVars([...newVars, newVar]);
  };

  const getDDById = () => {
    setLoading(true);
    fetch(`${vocabUrl}/DataDictionary/${DDId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(it => {
        return it;
      })
      .then(data => setDataDictionary(data))
      .then(() => setLoading(false));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table_id_container">
          <div className="image_container">
            <img className="background_image_results" src={Background} />
          </div>
          <div className="terminology_sub_nav">
            <div className="add_code_link">
              <button
                className="manage_term_button"
                onClick={() => {
                  setDDEdit(!DDEdit);
                  onCancel();
                  //   setNameEdit(false);
                  //   setDescriptionEdit(false);
                }}
              >
                {DDEdit ? 'View' : 'Manage'}
              </button>
            </div>
            {/*  {tableEdit ? (
              <div className="add_code_link">
                <button className="manage_term_button" onClick={handleInputAdd}>
                  Add Variable
                </button>
              </div>
            ) : (
              ''
            )}*/}
          </div>
          <div className="terminology_details terminology_name">
            {!DDEdit ? (
              <>
                <div className="initial_div"></div>

                {dataDictionary?.name
                  ? dataDictionary?.name
                  : dataDictionary?.id}
              </>
            ) : DDEdit && nameEdit === false ? (
              <>
                <div className="edit_div">
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setNameEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  <div>
                    {dataDictionary?.name
                      ? dataDictionary?.name
                      : dataDictionary?.id}
                  </div>
                </div>
              </>
            ) : DDEdit && nameEdit === true ? (
              <EditNameDD
                dataDictionary={dataDictionary}
                setDataDictionary={setDataDictionary}
                setNameEdit={setNameEdit}
              />
            ) : (
              ''
            )}
          </div>
          <div className="terminology_details terminology_desc">
            {!DDEdit ? (
              <>
                <div className="initial_div empty_description"></div>
                {dataDictionary?.description ? (
                  dataDictionary?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : DDEdit && descriptionEdit === false ? (
              <>
                <div className="initial_div empty_description">
                  <img
                    className="small_icon"
                    onClick={() => setDescriptionEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {dataDictionary?.description ? (
                  dataDictionary?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : DDEdit && descriptionEdit === true ? (
              <EditDescriptionDD
                dataDictionary={dataDictionary}
                setDataDictionary={setDataDictionary}
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
                  <th className="first_cell">Table</th>
                </tr>
              </thead>
              <tbody>
                {dataDictionary?.tables?.map((r, index) => {
                  return (
                    <tr key={index}>
                      {/* {active !== index ? (
                        <> */}
                      <td className="initial_cell">
                        {/* {' '}
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
                            )} */}
                      </td>

                      <td className="first_cell">
                        <Link to={`/${r.reference}`}>
                          {r?.reference.split('/')[1]}
                        </Link>
                      </td>
                      {/* </>
                      ) : terminologyEdit && active === index ? (
                        <EditCode
                          codeObject={r}
                          index={index}
                          onCancel={onCancel}
                          setActive={setActive}
                        />
                      ) : (
                        ''
                      )} */}
                    </tr>
                  );
                })}
                {/* {newCodes?.map((newCode, i) => (
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
                ))} */}
              </tbody>
            </table>
            {/* {newCodes?.length > 0 ? (
            <button onClick={handleAddCode}>Save</button>
          ) : (
            ''
          )} */}
          </div>
        </div>
      )}
    </>
  );
};
