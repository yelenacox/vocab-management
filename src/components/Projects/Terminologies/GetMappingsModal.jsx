import { Modal, Pagination } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';

export const GetMappingsModal = ({ getMappings, setGetMappings }) => {
  const { results, setResults, current, setCurrent, loading, setLoading, URL } =
    useContext(myContext);

  const [page, setPage] = useState(1);

  const onChange = page => {
    setCurrent(page);
    setPage(page);
  };

  useEffect(() => {
    descriptionResults(page);
  }, [getMappings, page]);

  const descriptionResults = page => {
    return requestSearch((page - 1) * 5);
  };

  const requestSearch = firstRowDescription => {
    getMappings
      ? fetch(
          `${URL}q=${getMappings?.code}&ontology=mondo,hp,maxo,ncit&rows=5&start=${firstRowDescription}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then(res => res.json())
          .then(data => setResults(data.response))
      : '';
  };

  return (
    <>
      <Modal
        open={!!getMappings}
        width={'60%'}
        onOk={() => {
          setGetMappings(null), setPage(1), setCurrent(1);
        }}
        onCancel={() => {
          setGetMappings(null), setPage(1), setCurrent(1);
        }}
        maskClosable={true}
        destroyOnClose={true}
      >
        <div className="results_modal_container">
          <div className="search_modal_container">
            <div className="search_modal_results"></div>
          </div>

          <>
            {loading === false ? (
              <>
                <div className="modal_search_results">
                  <div className="modal_search_results_header">
                    <h3>Search results for: {getMappings?.code}</h3>
                  </div>
                  {results?.docs?.length > 0 ? (
                    results?.docs.map((d, index) => {
                      return (
                        <>
                          <div key={index} className="modal_search_result">
                            <div className="modal_term_ontology">
                              <div>
                                <b>{d.label}</b>
                              </div>
                              <div>{d.obo_id}</div>
                            </div>
                            <div>{d.description}</div>
                            {/* <div>Ontology: {d.ontology_prefix}</div> */}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <h3>No results found.</h3>
                  )}
                </div>
              </>
            ) : (
              <div className="loading_spinner">
                <Spinner />
              </div>
            )}
          </>

          {loading === false && results?.numFound > 0 ? (
            <div className="modal_pagination">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                total={results?.numFound}
                onChange={onChange}
                current={current}
                showSizeChanger={false}
                // onShowSizeChange={onShowSizeChange}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </Modal>
    </>
  );
};
