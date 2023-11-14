import { useEffect, useRef, useState, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import { myContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchResults.scss';
import Background from '../../../assets/Background.png';

export const SearchResults = () => {
  const {
    results,
    setResults,
    page,
    setPage,
    rows,
    setRows,
    current,
    setCurrent,
    loading,
    setLoading,
  } = useContext(myContext);

  const { query } = useParams();
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

  useEffect(() => {
    displayResults(rows, page);
  }, [rows, page, query]);

  const displayResults = (rows, page) => {
    return requestSearch(rows, (page - 1) * rows);
  };

  const requestSearch = (rowCount, firstRowDisplayed) => {
    setLoading(true);
    fetch(
      `${URL}q=${query}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowDisplayed}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(data => setResults(data.response))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="search_field_container">
        <div className="image_container">
          <img className="background_image_results" src={Background} />
        </div>
        <div className="search_field_results">
          <div className="text_input_results">
            <input
              id="search_input_results"
              type="text"
              placeholder="Search"
              defaultValue={query}
              ref={ref}
            />
          </div>

          <button
            className="search_button_results"
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

      <>
        {loading === false ? (
          <>
            {' '}
            <div className="search_results">
              <div className="search_results_header">
                <h2>Search results for: {query}</h2>
              </div>
              {results?.docs?.length > 0
                ? results?.docs.map((d, index) => {
                    return (
                      <>
                        <div key={index} className="search_result">
                          <div className="term_ontology">
                            <div>
                              <b>{d.label}</b>
                            </div>
                            <div>{d.obo_id}</div>
                          </div>
                          <div>{d.description}</div>
                          <div>Ontology: {d.ontology_prefix}</div>
                        </div>
                      </>
                    );
                  })
                : 'No results found.'}
            </div>
          </>
        ) : (
          <Spin />
        )}
      </>

      {/* {loading === false && results?.docs.length > 0 ? (
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={rows}
            total={results?.numFound}
            onChange={onChange}
            current={current}
            onShowSizeChange={onShowSizeChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      ) : (
        ''
      )} */}
    </>
  );
};