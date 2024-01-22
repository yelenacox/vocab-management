import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

import './StudyStyling.scss';

import { Checkbox } from 'antd';
import { getAll, getById, handleUpdate } from '../../Manager/FetchManager';
import { EditStudyDescription } from './EditStudyDescription';
import { EditStudyDD } from './EditStudyDD';
import { EditStudyUrl } from './EditStudyUrl';
import { EditStudyIdentifierPrefix } from './EditStudyIdentifierPrefix';
import { EditStudyName } from './EditStudyName';

export const StudyDetails = () => {
  const [studyEdit, setStudyEdit] = useState(false);
  const [studyDDEdit, setStudyDDEdit] = useState(false);
  const [studyNameEdit, setStudyNameEdit] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [identifierEdit, setIdentifierEdit] = useState(false);
  const {
    study,
    setStudy,
    vocabUrl,
    loading,
    studyDDs,
    setStudyDDs,
    setLoading,
  } = useContext(myContext);
  const { studyId } = useParams();

  useEffect(() => {
    setLoading(true);
    getById(vocabUrl, 'Study', studyId).then(data => setStudy(data));
    getAll(vocabUrl, 'DataDictionary').then(data => setStudyDDs(data));

    setLoading(false);
  }, []);

  useEffect(
    () => () => {
      setStudy({});
    },
    [],
  );

  const updateStudyDD = selectedIds => {
    const studyIds = selectedIds.filter(obj => !!obj);
    const studyDTO = studyIds.map(dd => {
      return { reference: `DataDictionary/${dd}` };
    });
    handleUpdate(vocabUrl, 'Study', {
      ...study,
      datadictionary: studyDTO,
    }).then(data => setStudy(data));
  };

  const arrayOfIds = study?.datadictionary?.map(r => {
    return r.reference.split('/')[1];
  });

  const selectedObjs = studyDDs.filter(dd => {
    return arrayOfIds?.includes(dd.id);
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
                  setStudyEdit(!studyEdit);
                  setStudyNameEdit(false);
                  setDescriptionEdit(false);
                  setStudyDDEdit(false);
                }}
              >
                {studyEdit ? 'View' : 'Manage'}
              </button>
            </div>
          </div>
          <div className="terminology_details terminology_name">
            {!studyEdit ? (
              <>
                <div className="initial_div"></div>

                {study?.name ? study?.name : study?.id}
              </>
            ) : studyEdit && studyNameEdit === false ? (
              <>
                <div className="edit_div">
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setStudyNameEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  <div>{study?.name ? study?.name : study?.id}</div>
                </div>
              </>
            ) : studyEdit && studyNameEdit === true ? (
              <EditStudyName
                study={study}
                setStudy={setStudy}
                setStudyNameEdit={setStudyNameEdit}
              />
            ) : (
              ''
            )}
          </div>
          <div className="terminology_details terminology_desc">
            {!studyEdit ? (
              <>
                <div className="initial_div empty_description"></div>
                {study?.description ? (
                  study?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : studyEdit && descriptionEdit === false ? (
              <>
                <div className="initial_div empty_description">
                  <img
                    className="small_icon"
                    onClick={() => setDescriptionEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {study?.description ? (
                  study?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : studyEdit && descriptionEdit === true ? (
              <EditStudyDescription
                study={study}
                setStudy={setStudy}
                setDescriptionEdit={setDescriptionEdit}
              />
            ) : (
              ''
            )}
          </div>
          <div className="table_container">
            <table className="table">
              <EditStudyDD
                selectedObjs={selectedObjs}
                studyDDs={studyDDs}
                edit={studyDDEdit}
                setEdit={setStudyDDEdit}
                studyEdit={studyEdit}
                updateStudyDD={updateStudyDD}
              />
            </table>
          </div>
          <div className="terminology_details">
            {!studyEdit ? (
              <>
                <div className="initial_div"></div>
                Identifier prefix: {study?.identifier_prefix}
              </>
            ) : studyEdit && identifierEdit === false ? (
              <>
                <div className="initial_div">
                  <img
                    className="small_icon"
                    onClick={() => setIdentifierEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {study?.identifier_prefix}
              </>
            ) : studyEdit && identifierEdit === true ? (
              <EditStudyIdentifierPrefix
                study={study}
                setStudy={setStudy}
                setIdentifierEdit={setIdentifierEdit}
              />
            ) : (
              ''
            )}
          </div>
          <div className="terminology_details">
            {!studyEdit ? (
              <>
                <div className="initial_div"></div>
                URL: {study?.url}
              </>
            ) : studyEdit && urlEdit === false ? (
              <>
                <div className="initial_div">
                  <img
                    className="small_icon"
                    onClick={() => setUrlEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {study?.url}
              </>
            ) : studyEdit && urlEdit === true ? (
              <EditStudyUrl
                study={study}
                setStudy={setStudy}
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
