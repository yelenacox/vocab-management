import { useContext, useEffect } from 'react';
import './StudyStyling.scss';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Spinner } from '../../Manager/Spinner';
import { DeleteStudy } from './DeleteStudy';
import { getAll, handlePost } from '../../Manager/FetchManager';
import { Modal, Form } from 'antd';
import { AddStudy } from './AddStudy';

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
    getAll(vocabUrl, 'Study').then(data => setStudies(data));
    setLoading(false);
  }, []);

  const handleSubmit = values => {
    // console.log(values);
    values.datadictionary = values.datadictionary?.map(ref => {
      return { reference: `DataDictionary/${ref}` };
    });
    handlePost(vocabUrl, 'Study', values).then(data =>
      navigate(`/study/${data?.id}`),
    );
  };

  return (
    <>
      <div className="projects_sub_nav">
        <h2>Studies</h2>
        <div className="menu_buttons_container">
          <button
            className="manage_term_button"
            onClick={() => setAddStudy(true)}
            // onClick={() => navigate('/add_study')}
          >
            Add Study
          </button>{' '}
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table_container">
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
                        <Link to={`/study/${r?.id}`}>
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
        </div>
      )}
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
    </>
  );
};
