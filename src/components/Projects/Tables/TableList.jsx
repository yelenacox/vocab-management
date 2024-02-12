import { useContext, useEffect, useState } from 'react';
import './TableStyling.scss';
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { Spinner } from '../../Manager/Spinner';
import { DeleteTable } from './DeleteTable';
import { getAll } from '../../Manager/FetchManager';
import { AddTable } from './AddTable';
import { Modal, Form } from 'antd';

export const TableList = () => {
  const [form] = Form.useForm();
  const {
    loading,
    setLoading,
    vocabUrl,
    tables,
    setTables,
    table,
    setTable,
    addTable,
    setAddTable,
  } = useContext(myContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAll(vocabUrl, 'Table').then(data => setTables(data));
    setLoading(false);
  }, []);

  const handleSubmit = values => {
    // event.preventDefault();
    console.log('NEW TABLE PLEASE', values);
    // handlePost(vocabUrl, 'Table', tableDTO()).then(data =>
    //   navigate(`/table/${data?.id}`),
    // );
  };

  return (
    <>
      <div className="projects_sub_nav">
        <h2>Tables</h2>
        <div className="menu_buttons_container">
          <button
            className="manage_term_button"
            onClick={() => navigate('/upload_table')}
          >
            Upload Table
          </button>
          <button
            className="manage_term_button"
            onClick={() => setAddTable(true)}

            // onClick={() => navigate('/add_table')}
          >
            Create Table
          </button>
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
              {tables?.map((r, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="project_first_cell">
                        <Link to={`/table/${r?.id}`}>
                          {r?.name ? r?.name : r?.id}
                        </Link>
                      </td>
                      <td className="project_second_cell">{r?.description}</td>
                      <td className="delete_cell">
                        <DeleteTable table={r} setTables={setTables} />
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
        open={addTable}
        width={'70%'}
        onOk={() =>
          form.validateFields().then(values => {
            handleSubmit(values);
            form.resetFields();
          })
        }
        onCancel={() => {
          form.resetFields();
          setAddTable(false);
        }}
        maskClosable={true}
      >
        <AddTable form={form} />
      </Modal>
    </>
  );
};
