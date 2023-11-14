import { useEffect, useRef, useState, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import './OntologySearch.scss';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export const OntologySearch = () => {
  const [loading, setLoading] = useState(false);
  const { setPage, setRows, setCurrent } = useContext(myContext);

  const navigate = useNavigate();
  const ref = useRef();
  const onChange = page => {
    setCurrent(page);
    setPage(page);
  };

  const onShowSizeChange = (current, rows) => {
    setCurrent(current);
    setRows(rows);
  };

  const URL = import.meta.env.VITE_API_ENDPOINT;

  return (
    <>
      <div className="search_page">
        <div className="text_above_search">Text about something...</div>
        <div className="search_field">
          <div className="text_input">
            <input
              id="search_input"
              type="text"
              placeholder="Search"
              ref={ref}
            />
          </div>
          <div className="button_container">
            <button
              className="search_button"
              onClick={e => {
                setPage(1),
                  setCurrent(1),
                  navigate(`/search/${ref.current.value}`);
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div className="text_below_search">
          More text about something else...
        </div>
      </div>
    </>
  );
};
