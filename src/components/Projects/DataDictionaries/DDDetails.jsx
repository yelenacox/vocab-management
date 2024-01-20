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
import { EditTablesDD } from './EditTablesDD';
import { Checkbox } from 'antd';
import { getAll, getById, handleUpdate } from '../../Manager/FetchManager';

export const DDDetails = () => {
  const [DDEdit, setDDEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [tablesDDEdit, setTablesDDEdit] = useState(false);
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
    getById(vocabUrl, 'DataDictionary', DDId).then(data =>
      setDataDictionary(data),
    );
    getAll(vocabUrl, 'Table').then(data => setTablesDD(data));
    setLoading(false);
  }, []);

  useEffect(
    () => () => {
      setDataDictionary({});
    },
    [],
  );

  const updateTablesDD = selectedIds => {
    const dataDictionaryIds = selectedIds.filter(obj => !!obj);
    console.log('PEEPEE', dataDictionaryIds);
    const tablesDTO = dataDictionaryIds.map(dd => {
      return { reference: `Table/${dd}` };
    });
    handleUpdate(vocabUrl, 'DataDictionary', {
      ...dataDictionary,
      tables: tablesDTO,
    }).then(data => setDataDictionary(data));
  };

  const arrayOfIds = dataDictionary?.tables?.map(r => {
    return r.reference.split('/')[1];
  });

  const selectedObjs = tablesDD.filter(table => {
    return arrayOfIds?.includes(table.id);
  });

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
                  setNameEdit(false);
                  setDescriptionEdit(false);
                  setTablesDDEdit(false);
                }}
              >
                {DDEdit ? 'View' : 'Manage'}
              </button>
            </div>
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
              <EditTablesDD
                selectedObjs={selectedObjs}
                tablesDD={tablesDD}
                edit={tablesDDEdit}
                setEdit={setTablesDDEdit}
                DDEdit={DDEdit}
                updateTablesDD={updateTablesDD}
              />
            </table>
          </div>
        </div>
      )}
    </>
  );
};
