import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './TableStyling.scss';
import { useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import { TableRow } from './TableRow';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import { EditNameTable } from './EditNameTable';
import { EditDescriptionTable } from './EditDescriptionTable';
import { EditUrlTable } from './EditUrlTable';
import { AddVariable } from './AddVariable';
import { getById } from '../../Manager/FetchManager';
import { Table } from 'antd';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Description', dataIndex: 'description' },
  { title: 'Data Type', dataIndex: 'data_type' },
];

export const TableDetails = () => {
  const [tableEdit, setTableEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [active, setActive] = useState(-1);
  const [newVars, setNewVars] = useState([]);
  const { table, setTable, vocabUrl, loading, setLoading, getVariableId } =
    useContext(myContext);
  const { tableId } = useParams();

  useEffect(() => {
    setLoading(true);
    getById(vocabUrl, 'Table', tableId).then(data => setTable(data));
    setLoading(false);
  }, []);

  useEffect(
    () => () => {
      setTable({});
    },
    [],
  );

  const dataSource = table?.variables?.map((v, index) => {
    return {
      key: index,
      name: v.name,
      description: v.description,
      data_type: v.data_type,
    };
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
          {/* <div className="terminology_sub_nav">
            <div className="add_code_link">
              <button
                className="manage_term_button"
                onClick={() => {
                  setTableEdit(!tableEdit);
                  onCancel(), setNameEdit(false);
                  setDescriptionEdit(false);
                  setUrlEdit(false);
                }}
              >
                {tableEdit ? 'View' : 'Manage'}
              </button>
            </div>
            {tableEdit ? (
              <div className="add_code_link">
                <button className="manage_term_button" onClick={handleInputAdd}>
                  Add Variable
                </button>
              </div>
            ) : (
              ''
            )}
          </div> */}
          <div className="terminology_details terminology_name">
            {/* {!tableEdit ? (
              <>
                <div className="initial_div"></div> */}

            {table?.name ? table?.name : table?.id}
            {/* </>
            ) : tableEdit && nameEdit === false ? (
              <>
                <div className="edit_div">
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setNameEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  <div>{table?.name ? table?.name : table?.id}</div>
                </div>
              </>
            ) : tableEdit && nameEdit === true ? (
              <EditNameTable
                table={table}
                setTable={setTable}
                setNameEdit={setNameEdit}
              />
            ) : (
              ''
            )} */}
          </div>
          {table?.filename ? (
            <>
              <div className="terminology_details terminology_desc">
                <div className="initial_div"></div>
                File name: {table?.filename}
              </div>
            </>
          ) : (
            ''
          )}
          <div className="terminology_details">
            {/* {!tableEdit ? (
                <>
                  <div className="initial_div"></div> */}
            {table?.url}
            {/* </>
              ) : tableEdit && urlEdit === false ? (
                <>
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setUrlEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  {table?.url}
                </>
              ) : tableEdit && urlEdit === true ? (
                <EditUrlTable
                  table={table}
                  setTable={setTable}
                  setUrlEdit={setUrlEdit}
                />
              ) : (
                ''
              )} */}
          </div>
          <div className="terminology_details terminology_desc">
            {/* {!tableEdit ? (
              <>
                <div className="initial_div empty_description"></div> */}
            {table?.description ? (
              table?.description
            ) : (
              <span className="no_description">No description provided.</span>
            )}
            {/* </>
            ) : tableEdit && descriptionEdit === false ? (
              <>
                <div className="initial_div empty_description">
                  <img
                    className="small_icon"
                    onClick={() => setDescriptionEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {table?.description ? (
                  table?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : tableEdit && descriptionEdit === true ? (
              <EditDescriptionTable
                table={table}
                setTable={setTable}
                setDescriptionEdit={setDescriptionEdit}
              />
            ) : (
              ''
            )} */}
          </div>
          <div className="table_container">
            <Table columns={columns} dataSource={dataSource} />

            {/* <table className="table">
              <thead className="header">
                <tr className="header_row">
                  <th></th>
                  <th className="first_cell">Name</th>
                  <th className="second_cell">Description</th>
                  <th className="third_cell">Data Type</th>
                </tr>
              </thead>
              <tbody>
                {table?.variables?.map((v, index) => {
                  return (
                    <>
                      <TableRow
                        v={v}
                        index={index}
                        key={index}
                        handleOpen={handleOpen}
                        tableEdit={tableEdit}
                        active={active}
                        setActive={setActive}
                        table={table}
                        setTable={setTable}
                        tableId={tableId}
                        onEdit={onEdit}
                        onCancel={onCancel}
                      />
                    </>
                  );
                })}

                {newVars?.map((newVar, i) => (
                  <>
                    <AddVariable
                      variable={newVar}
                      i={i}
                      newVar={newVar}
                      newVars={newVars}
                      setNewVars={setNewVars}
                      tableId={tableId}
                    />
                  </>
                ))}
              </tbody>
            </table> */}
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
