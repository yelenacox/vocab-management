import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'antd';

export const OntologySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(20);

  const searchBar = useRef();
  const onChange = page => {
    setPage(page);
  };

  const onShowSizeChange = (current, rows) => {
    setRows(rows);
  };

  const URL = import.meta.env.VITE_API_ENDPOINT;

  useEffect(() => {
    displayResults(rows, page);
  }, [searchTerm, page, rows]);

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
      .then(data => setSearchResults(data.response));
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
            onClick={() => setSearchTerm(searchBar.current.value)}
          >
            Search
          </button>
        </div>
        <div className="search_results">
          {searchResults?.docs?.map((d, index) => {
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
          })}
        </div>
        {console.log(searchTerm)}
        {searchTerm !== '' ? (
          <div>
            <Pagination
              defaultCurrent={0}
              defaultPageSize={20}
              total={searchResults?.numFound}
              onChange={onChange}
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
