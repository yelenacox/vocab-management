import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';
import './DDStyling.scss';
import { EditNameDD } from './EditNameDD';
import { EditDescriptionDD } from './EditDescriptionDD';
import { getDDById } from '../../Manager/DDManager';
import { getTables } from '../../Manager/TableManager';
import { EditTablesDD } from './EditTablesDD';

export const DDDetails = () => {
  const [DDEdit, setDDEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [tablesDDEdit, setTablesDDEdit] = useState(false);
  const [active, setActive] = useState(-1);
  const [newVars, setNewVars] = useState([]);
  const {
    dataDictionary,
    setDataDictionary,
    vocabUrl,
    loading,
    setLoading,
    getVariableId,
    tablesDD,
    setTablesDD,
  } = useContext(myContext);
  const { DDId } = useParams();

  useEffect(() => {
    setLoading(true);
    getDDById(vocabUrl, DDId).then(data => setDataDictionary(data));
    getTables(vocabUrl).then(data => setTablesDD(data));
    setLoading(false);
  }, []);

  useEffect(
    () => () => {
      setDataDictionary({});
    },
    [],
  );
  const arrayOfIds = dataDictionary?.tables?.map(r => {
    return r.reference.split('/')[1];
  });

  const selectedObj = tablesDD.filter(table => {
    return arrayOfIds?.includes(table.id);
  });

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
                  <div className="initial_div">
                    {DDEdit && !tablesDDEdit ? (
                      <img
                        className="small_icon"
                        onClick={() => setTablesDDEdit(true)}
                        src={PencilIcon}
                      />
                    ) : DDEdit && tablesDDEdit ? (
                      <>
                        {' '}
                        <img
                          className="small_icon"
                          // onClick={() => setTablesDDEdit(true)}
                          src={SaveIcon}
                        />
                        <img
                          className="small_icon"
                          onClick={() => setTablesDDEdit(false)}
                          src={CancelIcon}
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </div>

                  <th className="first_cell">Table</th>
                </tr>
              </thead>
              <tbody>
                {selectedObj.map((r, index) => {
                  return (
                    <tr key={index}>
                      <td className="initial_cell"></td>
                      {!tablesDDEdit ? (
                        <td className="first_cell">
                          <Link to={`/Table/${r.id}`}>{r?.name}</Link>
                        </td>
                      ) : (
                        ''
                      )}
                    </tr>
                  );
                })}
                {DDEdit && tablesDDEdit ? (
                  <EditTablesDD selectedObj={selectedObj} tablesDD={tablesDD} />
                ) : (
                  ''
                )}{' '}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
