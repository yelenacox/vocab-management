import { useContext, useEffect, useState } from 'react';
import './StudyStyling.scss';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Spinner } from '../../Manager/Spinner';
import { DeleteStudy } from './DeleteStudy';
import { getAll, handlePost } from '../../Manager/FetchManager';
import { Modal, Form, Row, Col, Card, Button, Skeleton } from 'antd';
import { AddStudy } from './AddStudy';
import Background from '../../../../assets/Background.png';
import { ellipsisString } from '../../Manager/Utilitiy';
import { AddNewCard } from '../../Manager/AddNewCard';
const { Meta } = Card;

export const StudyList = () => {
  const [form] = Form.useForm();
  const {
    loading,
    setLoading,
    studies,
    setStudies,
    addStudy,
    setAddStudy,
    vocabUrl,
  } = useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAll(vocabUrl, 'Study')
      .then(data => setStudies(data))
      .then(() => setLoading(false));
  }, []);

  const handleSubmit = values => {
    values.datadictionary = values.datadictionary?.map(ref => {
      return { reference: `DataDictionary/${ref}` };
    });
    handlePost(vocabUrl, 'Study', values).then(data =>
      navigate(`/study/${data?.id}`),
    );
  };

  return (
    <>
      <div className="studies_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <div className="projects_sub_nav">
          <h2>My Studies</h2>
          {/* <div className="menu_buttons_container">
            <button
              className="manage_term_button"
              onClick={() => setAddStudy(true)}
            >
              Add Study
            </button>{' '}
          </div> */}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="cards_container">
            <Row gutter={[20, 24]}>
              {/* <AddNewCard setAddStudy={setAddStudy} /> */}
              <Col span={6}>
                <span onClick={() => setAddStudy(true)}>
                  <Card
                    hoverable
                    bordered={true}
                    style={{
                      border: '1px solid darkgray',
                      height: '42vh',
                    }}
                  >
                    <div className="new_study_card_container">
                      <div className="new_study_card">Create New Study</div>
                    </div>
                  </Card>
                </span>
              </Col>
              {studies?.map((study, index) => {
                return (
                  <Col span={6} key={index}>
                    <Card
                      // loading={loading}
                      title={study?.name ? study?.name : study?.id}
                      bordered={true}
                      style={{
                        border: '1px solid darkgray',
                        height: '42vh',
                      }}
                      actions={[
                        <Link to={`/Study/${study?.id}`}>
                          <button
                            className="manage_term_button"
                            // /                          style={{}}
                          >
                            Edit
                          </button>
                        </Link>,
                      ]}
                    >
                      {/* <div className="card_content">
                      {ellipsisString(study?.description)}
                    </div> */}
                      <Skeleton loading={loading}>
                        <Meta
                          style={{
                            height: '21vh',
                            border: '1px lightgray solid',
                            borderRadius: '5px',
                            padding: '5px',
                          }}
                          description={ellipsisString(
                            study?.description,
                            '240',
                          )}
                        />
                      </Skeleton>

                      {/* <DeleteStudy study={study} setStudies={setStudies} /> */}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}

        {/* <div className="table_container">
          <table className="table">
            <thead className="header">
              <tr className="header_row">
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {studies?.map((r, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="project_first_cell">
                        <Link to={`/Study/${r?.id}`}>
                          {r?.name ? r?.name : r?.id}
                        </Link>
                      </td>
                      <td className="project_second_cell">{r?.description}</td>
                      <td className="delete_cell">
                        <DeleteStudy study={r} setStudies={setStudies} />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div> */}
        {/* )} */}
        <Modal
          open={addStudy}
          width={'70%'}
          onOk={() =>
            form.validateFields().then(values => {
              handleSubmit(values);
              form.resetFields();
              setAddStudy(false);
            })
          }
          onCancel={() => {
            form.resetFields();
            setAddStudy(false);
          }}
          maskClosable={false}
        >
          <AddStudy form={form} />
        </Modal>
      </div>
    </>
  );
};
