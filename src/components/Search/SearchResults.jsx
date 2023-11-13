import { Pagination, Spin } from 'antd';
import { useState, useContext } from 'react';
import { myContext } from '../../App';
import { useParams } from 'react-router-dom';

export const SearchResults = () => {
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
  const { searchQuery } = useParams();

  return (
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
          <Spin />
        )
      ) : (
        ''
      )}

      {searchTerm !== '' && loading === false && results?.docs.length > 0 ? (
        <div>
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
