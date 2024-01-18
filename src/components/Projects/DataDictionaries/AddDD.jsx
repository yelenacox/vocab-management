import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { getTables } from '../../Manager/TableManager';
import { postDD } from '../../Manager/DDManager';
import { Checkbox } from 'antd';
import './DDStyling.scss';

export const AddDD = () => {
  const {
    vocabUrl,
    dataDictionary,
    setDataDictionary,
    initialDD,
    tablesDD,
    setTablesDD,
  } = useContext(myContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const getTablesDD = () => {
    getTables(vocabUrl).then(data => setTablesDD(data));
  };

  useEffect(() => {
    setDataDictionary(initialDD);
    getTablesDD();
  }, []);

  useEffect(
    () => () => {
      setDataDictionary(initialDD);
    },
    [],
  );

  const navigate = useNavigate();

  const checkboxHandler = e => {
    let isSelected = e.target.checked;
    let checkboxValue = e.target.id;
    if (isSelected) {
      setSelectedItems([...selectedItems, checkboxValue]);
    } else {
      setSelectedItems(prevData => {
        return prevData?.filter(id => {
          return id !== checkboxValue;
        });
      });
    }
  };

  const checkAllHandler = () => {
    const tableIds = tablesDD.map(item => {
      return item.id;
    });
    setSelectedItems(tableIds);
    if (tablesDD.length === selectedItems.length) {
      setSelectedItems([]);
    }
  };

  let DDDTO = () => {
    const tablesDTO = selectedItems.map(table => {
      return { reference: `Table/${table}` };
    });
    return { ...dataDictionary, tables: tablesDTO };
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    postDD(vocabUrl, DDDTO).then(data =>
      navigate(`/data_dictionary/${data?.id}`),
    );
  };

  return (
    <>
      <article className="form_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <h2>New Data Dictionary</h2>
        <div className="name form_wrapper">
          <label className="input_label" htmlFor="terminology_name">
            Name
          </label>
          <input
            autoFocus
            id="name"
            className="add_term_input"
            type="text"
            value={dataDictionary?.name}
            onChange={evt => {
              setDataDictionary({
                ...dataDictionary,
                name: evt.target.value,
              });
            }}
          />
        </div>

        <div className="description form_wrapper">
          <label className="input_label" htmlFor="table_description">
            Description
          </label>
          <input
            id="display"
            className="add_term_input description_input"
            type="text"
            value={dataDictionary?.description}
            onChange={evt => {
              setDataDictionary({
                ...dataDictionary,
                description: evt.target.value,
              });
            }}
          />
        </div>
        <div className="tables_dd">
          <label className="input_label" htmlFor="dd_tables">
            Tables{' '}
            <button onClick={checkAllHandler}>
              {tablesDD.length === selectedItems.length
                ? 'Uncheck All'
                : 'Check All'}
            </button>
          </label>
          {tablesDD.map((table, index) => {
            return (
              <>
                <div>
                  <Checkbox
                    key={index}
                    name="tableDD"
                    className="tablesDD_checkbox"
                    type="checkbox"
                    id={table.id}
                    checked={selectedItems?.includes(table.id)}
                    onChange={checkboxHandler}
                  />

                  <label className="tableDD_reference" htmlFor="tableDD">
                    {table.name}
                  </label>
                </div>
              </>
            );
          })}
        </div>

        <button className="manage_term_button" onClick={handleSubmit}>
          Save
        </button>
        {/* <button
          className="manage_term_button"
          onClick={() => navigate('/projects')}
        >
          Cancel
        </button> */}
      </article>
    </>
  );
};
