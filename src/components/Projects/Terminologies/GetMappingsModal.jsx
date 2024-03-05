import { Checkbox, Modal, Pagination } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { ellipsisString } from '../../Manager/Utilitiy';
import { ModalSpinner } from '../../Manager/Spinner';
import Link from 'antd/es/typography/Link';

export const GetMappingsModal = ({ getMappings, setGetMappings }) => {
  const { current, setCurrent, URL } = useContext(myContext);
  const [page, setPage] = useState(0);
  const entriesPerPage = 15;
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);

  useEffect(() => {
    if (!!getMappings) {
      fetchResults(page);
    }
  }, [page, getMappings]);

  useEffect(
    () => () => {
      setGetMappings(null);
    },
    [],
  );

  const fetchResults = page => {
    if (!!getMappings) {
      setLoading(true);
      const bunch = page * entriesPerPage;
      fetch(
        `${URL}q=${getMappings?.code}&ontology=mondo,hp,maxo,ncit&rows=${entriesPerPage}&start=${bunch}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => res.json())
        .then(data => {
          console.log('fetched', data?.response?.docs);
          let res = data?.response?.docs;
          if (page > 0 && results.length > 0) {
            res = results.concat(res);
          }
          setResults(res);
        })
        .then(() => setLoading(false));
    }
  };

  const handleViewMore = e => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <>
      <Modal
        open={!!getMappings}
        closeIcon={false}
        width={'51%'}
        styles={{ body: { height: '60vh', overflowY: 'auto' } }}
        onOk={() => {
          console.log('WHAT IS THIS', selectedCodes);

          setSelectedCodes([]);
          setGetMappings(null);
          setPage(1);
          setCurrent(1);
          setResults([]);
          setLoading(true);
        }}
        onCancel={() => {
          setGetMappings(null);
          setSelectedCodes([]);
          setPage(1);
          setCurrent(1);
          setResults([]);
          setLoading(true);
        }}
        maskClosable={false}
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
                  {results?.length > 0 ? (
                    <div>
                      {results?.map((d, index) => {
                        return (
                          <div key={index} className="modal_search_result">
                            <div>
                              <div className="modal_term_ontology">
                                <div>
                                  <b>{d.label}</b>
                                </div>
                                <div>
                                  <a href={d?.iri} target="_blank">
                                    {d.obo_id}
                                  </a>
                                </div>
                              </div>
                              <div>
                                {ellipsisString(d?.description[0], '100')}
                              </div>
                              {/* <div>Ontology: {d.ontology_prefix}</div> */}
                            </div>
                            <div className="modal_checkbox">
                              <Checkbox
                                key={index}
                                className="mapping_checkbox"
                                type="checkbox"
                                // value={d}
                                id={d}
                                // checked={selectedCodes.includes(d)}
                                // onChange={checkboxHandler}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={e => handleViewMore(e)}>
                        View More
                      </button>
                    </div>
                  ) : (
                    <h3>No results found.</h3>
                  )}
                </div>
              </>
            ) : (
              <div className="loading_spinner">
                <ModalSpinner />
              </div>
            )}
          </>
        </div>
      </Modal>
    </>
  );
};
