import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import './TableStyling.scss';
import { Link, useParams } from 'react-router-dom';
import Background from '../../../../assets/Background.png';
import { Spinner } from '../../Manager/Spinner';
import { Enumerations } from './Enumerations';
import { render } from 'react-dom';

export const TableDetails = () => {
  const { table, setTable, vocabUrl, loading, setLoading } =
    useContext(myContext);
  const { tableId } = useParams();
  const [open, setOpen] = useState(false);
  const [activeRows, setActiveRows] = useState([]);
  console.log('active ROws', activeRows);
  const addActiveRows = index => {
    setActiveRows([...activeRows, index]);
  };

  const removeActiveRow = index => {
    const rows = activeRows;
    const indexOfRowIndex = rows.indexOf(index);
    rows.splice(indexOfRowIndex, 1);
    setActiveRows(rows);
  };

  useEffect(() => {
    getTableById();
  }, []);

  const renderDecider = index => {
    console.log('EVALUATING ', activeRows.includes(index));
    return activeRows.includes(index);
  };
  const rowIsOpen = index => {
    return activeRows.includes(index);
  };
  const handleRowClick = evt => {
    const rowIndex = evt.target.id;
    console.log('HANDLE ROW CLICK EVALUATION', rowIsOpen(rowIndex));
    if (rowIsOpen(rowIndex)) {
      removeActiveRow(rowIndex);
    } else {
      addActiveRows(rowIndex);
    }
    console.log('POST ROW CLICK EVALUATION', rowIsOpen(rowIndex));
  };

  const getTableById = () => {
    fetch(`${vocabUrl}/Table/${tableId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTable(data));
  };

  const getTerminologyById = v => {
    setLoading(true);
    fetch(`${vocabUrl}/Terminology/${v?.reference}`, {
      // fetch(`${vocabUrl}/terminologies/${terminologyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTerminology(data))
      .then(() => {
        setLoading(false);
      });
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
            {/* <div className="add_code_link">
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
            </div> */}
            {/* {terminologyEdit ? (
              <div className="add_code_link">
                <button className="manage_term_button" onClick={handleInputAdd}>
                  Add Code
                </button>
              </div>
            ) : (
              ''
            )} */}
          </div>
          <div className="terminology_details terminology_name">
            {/* {!terminologyEdit ? (
              <> */}
            <div className="initial_div"></div>

            {table?.name ? table?.name : table?.id}
            {/* </>
            ) : terminologyEdit && nameEdit === false ? (
              <>
                <div className="initial_div">
                  <img
                    className="small_icon"
                    onClick={() => setNameEdit(true)}
                    src={PencilIcon}
                  />
                </div>
                {terminology?.name ? terminology?.name : terminology?.id}
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
          <div className="terminology_details terminology_desc">
            {/* {!terminologyEdit ? (
              <> */}
            <div className="initial_div empty_description"></div>
            {table?.description ? (
              table?.description
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
                {terminology?.description}
                {/* {terminology?.description ? (
                  terminology.description
                ) : (
                  <>
                    <img className="terminology_back" src={BackArrow} />
                    description
                  </>
                )} */}
            {/* </>
            ) : terminologyEdit && descriptionEdit === true ? (
              <EditDescription
                terminology={terminology}
                setTerminology={setTerminology}
                setDescriptionEdit={setDescriptionEdit}
              />
            ) : (
              ''
            )}  */}
          </div>
          <div className="table_container">
            <table className="table">
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
                      <tr key={index}>
                        {/* {active !== index ? (
                        <> */}
                        <td className="icon_cell">
                          {/* {' '}
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
                            )} */}
                        </td>
                        <td className="first_cell">{v?.name}</td>
                        <td className="second_cell">{v?.description}</td>
                        <td className="third_cell">
                          {v?.data_type !== 'STRING' ? (
                            <div
                              className="row_header"
                              id={index}
                              onClick={handleRowClick}
                            >
                              {v?.data_type}
                            </div>
                          ) : (
                            v?.data_type
                          )}
                        </td>
                        {/* </>
                      ) : terminologyEdit && active === index ? (
                        <EditCode
                          codeObject={r}
                          index={index}
                          onCancel={onCancel}
                          setActive={setActive}
                        />
                      ) : (
                        ''
                      )} */}
                      </tr>
                      {renderDecider(index) ? (
                        // active === index && open ? (
                        <>
                          {v?.data_type === 'QUANTITY' ||
                          v?.data_type === 'INTEGER' ? (
                            <tr key={`subrow-${index}`}>
                              <td className="icon_cell"></td>
                              <td className="first_cell"></td>
                              <div className="integer_div">
                                <th>min: {v?.min}</th>
                                <th>max: {v?.max}</th>
                                <th>units: {v?.units}</th>
                              </div>
                            </tr>
                          ) : v?.data_type === 'ENUMERATION' ? (
                            <Enumerations terminologyReference={v} />
                          ) : undefined}
                        </>
                      ) : undefined}
                    </>
                  );
                })}
                {/* {newCodes?.map((newCode, i) => (
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
                ))} */}
              </tbody>
            </table>
            {/* {newCodes?.length > 0 ? (
            <button onClick={handleAddCode}>Save</button>
          ) : (
            ''
          )} */}
            <div className="terminology_details">
              {/* {!terminologyEdit ? (
                <> */}
              <div className="initial_div"></div>
              {table?.url}
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
          </div>
        </div>
      )}
    </>
  );
};
