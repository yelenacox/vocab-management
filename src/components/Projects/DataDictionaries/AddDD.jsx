import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { getTables } from '../../Manager/TableManager';
import './DDStyling.scss';
import { postDD } from '../../Manager/DDManager';

export const AddDD = () => {
  const {
    vocabUrl,
    dataDictionary,
    setDataDictionary,
    initialDD,
    tablesDD,
    setTablesDD,
    setTables,
  } = useContext(myContext);

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

  let DDDTO = () => {
    const tablesDTO = dataDictionary.tables.map(table => {
      return { reference: table.reference };
    });
    return { ...dataDictionary, tables: tablesDTO };
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const tableNames = [];
    evt.target.tablesDD.forEach(t => {
      if (t.checked) {
        tableNames.push(t.name);
      }
    });
    postDD(vocabUrl, DDDTO)
      .then(res => res.json())
      .then(data => navigate(`/data_dictionary/${data?.id}`));
  };

  //   const handleSubmit = event => {
  //     event.preventDefault();
  //     fetch(`${vocabUrl}/DataDictionary`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(DDDTO()),
  //     })
  //       .then(res => res.json())
  //       .then(data => navigate(`/data_dictionary/${data?.id}`));
  //   };

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
            Tables
          </label>
          {tablesDD.map((t, index) => {
            return (
              <>
                <div>
                  <input
                    key={t.id}
                    id="tablesDD_checkbox"
                    name="tableDD"
                    className="tablesDD_checkbox"
                    type="checkbox"
                  />
                  <label className="tableDD_reference" htmlFor="tableDD">
                    {t.name}
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
