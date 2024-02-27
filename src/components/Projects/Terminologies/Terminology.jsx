import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { myContext } from '../../../App';
import './Terminology.scss';
import { Spinner } from '../../Manager/Spinner';
import Background from '../../../../assets/Background.png';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import { DeleteCode } from './DeleteCode';
import { AddCode } from './AddCode';
import { EditCode } from './EditCode';
import { EditName } from './EditName';
import { EditDescription } from './EditDescription';
import { EditUrl } from './EditUrl';
import { getById } from '../../Manager/FetchManager';
import { Table } from 'antd';

export const Terminology = () => {
  const [terminologyEdit, setTerminologyEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [active, setActive] = useState(-1);

  const { terminologyId } = useParams();
  const {
    terminology,
    setTerminology,
    vocabUrl,
    loading,
    setLoading,
    codeId,
    setCodeId,
  } = useContext(myContext);

  const [mapping, setMapping] = useState({});
  const [newCodes, setNewCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getById(vocabUrl, 'Terminology', terminologyId).then(data =>
      setTerminology(data),
    );
    getById(vocabUrl, 'Terminology', `${terminologyId}/mapping`).then(data =>
      setMapping(data.codes),
    );
    setLoading(false);
  }, []);

  console.log('mapping', mapping);
  const handleInputAdd = () => {
    const newCode = { code: '', display: '', id: getCodeId() };
    setNewCodes([...newCodes, newCode]);
  };

  const getCodeId = () => {
    const current = codeId;
    setCodeId(codeId + 1);
    return current;
  };

  const onEdit = index => {
    setActive(index);
  };

  const onCancel = () => {
    setActive(-1);
  };

  const columns = [
    { title: 'Code', dataIndex: 'code' },
    { title: 'Display', dataIndex: 'display' },
    { title: 'Mapped Terms', dataIndex: 'mapped_terms' },
    { title: '', dataIndex: 'get_mappings' },
  ];

  const dataSource = terminology?.codes?.map((code, index) => {
    return {
      key: index,
      code: code.code,
      display: code.display,
      mapped_terms:
        mapping?.length > 0
          ? mapping?.map(item =>
              item.code === code.code ? item.mappings.length : '',
            )
          : '',
      get_mappings:
        mapping.length > 0 ? (
          mapping.some(m => m.code === code.code) ? (
            <button key={index}>Edit Mappings</button>
          ) : (
            <button>Get Mappings</button>
          )
        ) : (
          <button>Get Mappings</button>
        ),
    };
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="terminology_container">
          <div className="image_container">
            <img className="background_image_results" src={Background} />
          </div>
          {/* <div className="terminology_sub_nav">
            <div className="add_code_link">
              <button
                className="manage_term_button"
                onClick={() => {
                  setTerminologyEdit(!terminologyEdit),
                    onCancel(),
                    setNameEdit(false);
                  setDescriptionEdit(false);
                  setUrlEdit(false);
                }}
              >
                {terminologyEdit ? 'View' : 'Manage'}
              </button>
            </div>
            {/* <div>Terminology</div> */}
          {/* {terminologyEdit ? (
              <div className="add_code_link">
                <button className="manage_term_button" onClick={handleInputAdd}>
                  Add Code
                </button>
              </div>
            ) : (
              <div className="add_code_link"></div>
            )}
          </div>  */}
          <div className="terminology_details terminology_name">
            <h3> {terminology?.name ? terminology?.name : terminology?.id}</h3>
            {/* </>
            ) : terminologyEdit && nameEdit === false ? (
              <>
                <div className="edit_div">
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setNameEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  {terminology?.name ? terminology?.name : terminology?.id}
                </div>
              </>
            ) : terminologyEdit && nameEdit === true ? (
              <EditName
                terminology={terminology}
                setTerminology={setTerminology}
                setNameEdit={setNameEdit}
              />
            ) : (
              ''
            )} */}
          </div>
          <div className="terminology_details">
            {/* {!terminologyEdit ? (
                <>
                  <div className="initial_div"></div> */}
            {terminology?.url}
            {/* </>
              ) : terminologyEdit && urlEdit === false ? (
                <>
                  <div className="initial_div">
                    <img
                      className="small_icon"
                      onClick={() => setUrlEdit(true)}
                      src={PencilIcon}
                    />
                  </div>
                  {terminology?.url}
                </>
              ) : terminologyEdit && urlEdit === true ? (
                <EditUrl
                  terminology={terminology}
                  setTerminology={setTerminology}
                  setUrlEdit={setUrlEdit}
                />
              ) : (
                ''
              )} */}
          </div>
          <div className="terminology_details terminology_desc">
            {/* {!terminologyEdit ? (
              <>
                <div className="initial_div empty_description"></div> */}
            {terminology?.description ? (
              terminology?.description
            ) : (
              <span className="no_description">No description provided.</span>
            )}
            {/* </>
            ) : terminologyEdit && descriptionEdit === false ? (
              <>
                <div className="initial_div empty_description">
                  <img
                    className="small_icon"
                    onClick={() => setDescriptionEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {terminology?.description ? (
                  terminology?.description
                ) : (
                  <span className="no_description">
                    No description provided.
                  </span>
                )}
              </>
            ) : terminologyEdit && descriptionEdit === true ? (
              <EditDescription
                terminology={terminology}
                setTerminology={setTerminology}
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
                  <th className="first_cell">Code</th>
                  <th className="second_cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {terminology?.codes?.map((r, index) => {
                  return (
                    <tr key={r?.code}>
                      {active !== index ? (
                        <>
                          <td className="icon_cell">
                            {' '}
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
                            )}
                          </td>
                          <td className="first_cell">{r?.code}</td>
                          <td className="second_cell">{r?.display}</td>
                        </>
                      ) : terminologyEdit && active === index ? (
                        <EditCode
                          codeObject={r}
                          index={index}
                          onCancel={onCancel}
                          setActive={setActive}
                        />
                      ) : (
                        ''
                      )}
                    </tr>
                  );
                })}
                {newCodes?.map((newCode, i) => (
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
