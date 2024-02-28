import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './TableStyling.scss';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import { TableRow } from './TableRow';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import { EditNameTable } from './EditNameTable';
import { EditDescriptionTable } from './EditDescriptionTable';
import { EditUrlTable } from './EditUrlTable';
import { AddVariable } from './AddVariable';
import { getById } from '../../Manager/FetchManager';
import { Table, Dropdown, Button, Space, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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

  const items = [
    {
      label: 'Edit',
      key: '0',
    },
    {
      label: 'Delete',
      key: '2',
      danger: true,
    },
  ];

  const handleMenuClick = e => {
    // message.info('Click on menu item.');
    console.log('click', e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Data Type', dataIndex: 'data_type' },
    { title: 'Enumerations', dataIndex: 'enumeration' },
  ];

  const dataSource = table?.variables?.map((v, index) => {
    return {
      key: index,
      name: v.name,
      description: v.description,
      data_type: v.data_type,
      enumeration:
        v.data_type === 'ENUMERATION' ? (
          <Link to={`/${v.enumerations.reference}`}>View/Edit</Link>
        ) : (
          ''
        ),
    };
  });

  const expandedRowRender = record => {
    const columns = [
      {
        title: 'Min',
        dataIndex: 'min',
        key: 'min',
      },
      {
        title: 'Max',
        dataIndex: 'max',
        key: 'max',
      },
      {
        title: 'Units',
        dataIndex: 'units',
        key: 'units',
      },
    ];
    const data = {
      min: record.min,
      max: record.max,
      units: record.units,
    };
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

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
          <Row gutter={30}>
            <div className="study_details_container">
              <Col span={15}>
                <div className="study_details">
                  <div className="study_name">
                    <h2>{table?.name ? table?.name : table?.id}</h2>
                  </div>
                  <div className="study_desc">
                    {table?.description ? (
                      table?.description
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
                  {/* <div className="study_url">URL: {study.url}</div> */}
                </div>
              </Col>
            </div>
          </Row>
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
            <Table
              columns={columns}
              dataSource={dataSource}
              expandable={{
                expandedRowRender: record => (
                  <p
                    style={{
                      marginLeft: 50,
                    }}
                  >
                    min: {record.min} max: {record.max} units:{record.units}
                  </p>
                ),
                rowExpandable: record =>
                  record.data_type === 'INTEGER' ||
                  record.data_type === 'QUANTITY',
              }}
            />

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
