import { useEffect, useRef, useState } from 'react';
import { Pagination, Spin } from 'antd';

export const OntologySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(20);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    displayResults(rows, page);
  }, [searchTerm, rows, page]);

  const displayResults = (rows, page) => {
    return requestSearch(rows, (page - 1) * rows);
  };

  const requestSearch = (rowCount, firstRowDisplayed) => {
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
      .then(data => setSearchResults(data.response))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <div className="search_bar">
          <input
            id="search_input"
            type="text"
            placeholder="Search"
            ref={searchBar}
          />

          <button
            className="search_button"
            onClick={() => {
              setSearchTerm(searchBar.current.value), setPage(1), setCurrent(1);
            }}
          >
            Search
          </button>
        </div>
        {loading === true ? (
          <Spin size="large" />
        ) : (
          <>
            {searchTerm ? (
              <>
                {' '}
                <div className="search_results">
                  <div className="search_results_header">
                    Search results for: {searchTerm}
                  </div>
                  {searchResults?.docs?.length > 0
                    ? searchResults?.docs.map((d, index) => {
                        return (
                          <>
                            <div key={index} className="search_result">
                              <div>
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
              ''
            )}
          </>
        )}
        {searchTerm !== '' &&
        loading === false &&
        searchResults?.docs.length > 0 ? (
          <div>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={rows}
              total={searchResults?.numFound}
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
      </div>
    </>
  );
};
