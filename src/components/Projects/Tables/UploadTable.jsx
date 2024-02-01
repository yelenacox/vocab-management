import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import Background from '../../../../assets/Background.png';
import { handlePost } from '../../Manager/FetchManager';
import Papa from 'papaparse';

export const UploadTable = () => {
  const { vocabUrl, table, setTable, resetTable } = useContext(myContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
    resetTable();
  }, []);

  useEffect(
    () => () => {
      resetTable();
    },
    [],
  );

  const navigate = useNavigate();

  const handleOnChange = e => {
    setFile(e.target.files[0]);
  };

  let tableDTO = item => {
    return { ...table, filename: file.name, csvContents: item };
  };

  const handleSubmit = e => {
    e.preventDefault();
    Papa.parse(file, {
      header: true,
      complete: function (result) {
        console.log(tableDTO(result.data));
        // handlePost(vocabUrl, 'Table', tableDTO(result.data)).then(data =>
        //   navigate(`/table/${data?.id}`),
        // );
      },
    });
  };

  return (
    <>
      <article className="form_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <h2>New Table</h2>
        <div className="name form_wrapper">
          <label className="input_label" htmlFor="terminology_name">
            Name
          </label>
          <input
            autoFocus
            id="name"
            className="add_term_input"
            type="text"
            value={table?.name}
            onChange={evt => {
              setTable({
                ...table,
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
            value={table?.description}
            onChange={evt => {
              setTable({
                ...table,
                description: evt.target.value,
              });
            }}
          />
        </div>

        <div className="url form_wrapper">
          <label className="input_label" htmlFor="table_url">
            URL
          </label>
          <input
            required
            id="url"
            className="add_term_input url_input"
            type="text"
            value={table?.url}
            onChange={evt => {
              setTable({
                ...table,
                url: evt.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleOnChange}
          />
        </div>
        <button
          className="manage_term_button"
          onClick={e => {
            handleSubmit(e);
          }}
        >
          Upload{' '}
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
