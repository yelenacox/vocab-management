import { useEffect, useRef, useState, useContext } from 'react';
import { Pagination, Spin } from 'antd';
import './OntologySearchStyle.scss';
import { myContext } from '../../App';

export const OntologySearch = () => {
  const [loading, setLoading] = useState(false);
  const {
    results,
    setResults,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    rows,
    setRows,
    current,
    setCurrent,
  } = useContext(myContext);

  const searchBar = useRef();

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
  }, [searchTerm, rows, page]);

  const displayResults = (rows, page) => {
    return requestSearch(rows, (page - 1) * rows);
  };

  const requestSearch = (rowCount, firstRowDisplayed) => {
    setLoading(true);
    fetch(
      `${URL}q=${searchTerm}&ontology=mondo,hp&rows=${rowCount}&start=${firstRowDisplayed}`,
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
      <div className="search_page_bg">
        <div
          className={`search_page_bg_image ${searchTerm ? 'results' : ''}`}
        ></div>
      </div>
      <div className={searchTerm ? 'results_page' : 'search_page'}>
        <div className={searchTerm ? 'display_none' : 'text_above_search'}>
          Text about something...
        </div>
        <div className="search_field">
          <div className="text_input">
            <input
              id="search_input"
              type="text"
              placeholder="Search"
              ref={searchBar}
            />
          </div>

          <button
            className="search_button"
            onClick={() => {
              setSearchTerm(searchBar.current.value), setPage(1), setCurrent(1);
            }}
          >
            SEARCH
          </button>
        </div>
        <div className={searchTerm ? 'display_none' : 'text_below_search'}>
          More text about something else...
        </div>
      </div>

      <>
        {searchTerm !== '' ? (
          loading === false ? (
            <>
              {' '}
              <div className="search_results">
                <div className="search_results_header">
                  Search results for: {searchTerm}
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
          )
        ) : (
          ''
        )}
      </>

      {searchTerm !== '' && loading === false && results?.docs.length > 0 ? (
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
      )}
    </>
  );
};
