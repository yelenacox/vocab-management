import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import './StudyStyling.scss';
import { getAll, getById, handleUpdate } from '../../Manager/FetchManager';
import { EditStudyDescription } from './EditStudyDescription';
import { EditStudyDD } from './EditStudyDD';
import { EditStudyUrl } from './EditStudyUrl';
import { EditStudyIdentifierPrefix } from './EditStudyIdentifierPrefix';
import { EditStudyName } from './EditStudyName';
import { DownOutlined } from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Space,
  Row,
  Col,
  Divider,
  Skeleton,
  Card,
} from 'antd';
import { ellipsisString } from '../../Manager/Utilitiy';
import useFormItemStatus from 'antd/es/form/hooks/useFormItemStatus';
const { Meta } = Card;

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

  const arrayOfIds = study?.datadictionary?.map(r => {
    return r.reference.split('/')[1];
  });

  // const selectedObjs = studyDDs.filter(dd => {
  //   return arrayOfIds?.includes(dd.id);
  // });

  const getStudyDDs = () => {
    let dDPromises = [];
    arrayOfIds?.forEach(id =>
      dDPromises.push(getById(vocabUrl, 'DataDictionary', id)),
    );
    Promise.all(dDPromises).then(data => setStudyDDs(data));
  };

  useEffect(() => {
    setLoading(true);
    getById(vocabUrl, 'Study', studyId)
      .then(data => setStudy(data))
      .then(() => setLoading(false));
  }, []);
  useEffect(() => {
    setLoading(true);
    getStudyDDs();
    // getAll(vocabUrl, 'DataDictionary').then(data => setStudyDDs(data));
    setLoading(false);
  }, [study]);

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

  // const items = [
  //   { key: '0', label: 'Edit' },
  //   { key: '1', label: 'Invite collaborators' },
  //   { key: '2', danger: true, label: 'Delete' },
  // ];
  const handleMenuClick = e => {
    // message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: 'Edit',
      key: '0',
    },
    {
      label: 'Invite collaborators',
      key: '1',
    },
    {
      label: 'Delete',
      key: '2',
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      <div className="studies_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <Row gutter={30}>
          <div className="study_details_container">
            <Col span={15}>
              <div className="study_details">
                <div className="study_name">
                  <h2>{study?.name ? study?.name : study?.id}</h2>
                </div>
                <div className="study_desc">
                  {study?.description ? (
                    study?.description
                  ) : (
                    <span className="no_description">
                      No description provided.
                    </span>
                  )}
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className="study_details_right">
                <div className="study_dropdown">
                  <Dropdown menu={menuProps} style={{ width: '30vw' }}>
                    <Button>
                      <Space
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: 100,
                        }}
                      >
                        Settings
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>
                <div className="study_url">URL: {study.url}</div>
              </div>
            </Col>
          </div>
        </Row>
        <Divider
          orientation="left"
          orientationMargin="0"
          className="divider"
          // style={{
          //   fontFamily: "'Wix Madefor Display' sans-serif'",
          //   fontSize: '24px',
          // }}
        >
          <h4>Data Dictionaries</h4>
        </Divider>
        <div className="study_details_cards_container">
          <Row gutter={[20, 24]}>
            {studyDDs?.map((dd, index) => (
              <Col span={6} key={index}>
                <Card
                  key={index}
                  // loading={loading}
                  title={dd?.name ? dd?.name : dd?.id}
                  bordered={true}
                  style={{
                    border: '1px solid darkgray',
                    height: '42vh',
                  }}
                  actions={[
                    <Link to={`/DataDictionary/${dd?.id}`}>
                      <button className="manage_term_button">
                        View / Edit
                      </button>
                      ,
                    </Link>,
                  ]}
                >
                  <Skeleton loading={loading}>
                    <Meta
                      style={{
                        height: '15vh',
                        border: '1px lightgray solid',
                        borderRadius: '5px',
                        padding: '5px',
                      }}
                      description={ellipsisString(dd?.description, '180')}
                    />
                    <Meta
                      style={{
                        padding: '0 5px',
                        margin: '3vh 0 0 0',
                      }}
                      description={'# of Tables: ' + dd?.tables.length}
                    />
                  </Skeleton>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* {loading ? (
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
      )} */}
    </>
  );
};
