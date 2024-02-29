import { Checkbox, Modal, Pagination, Form } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../../App';
import { ellipsisString } from '../../Manager/Utilitiy';
import { ModalSpinner } from '../../Manager/Spinner';

export const GetMappingsModal = ({ getMappings, setGetMappings }) => {
  const [form] = Form.useForm();
  const { results, setResults, current, setCurrent, URL } =
    useContext(myContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCodes, setSelectedCodes] = useState([]);

  const onChange = page => {
    setCurrent(page);
    setPage(page);
  };

  useEffect(() => {
    descriptionResults(page);
  }, [getMappings, page]);

  useEffect(
    () => () => {
      setGetMappings(null);
    },
    [],
  );

  const checkboxHandler = e => {
    let isSelected = e?.target?.checked;
    if (isSelected) {
      setSelectedCodes([...selectedCodes, e.target.value]);
    } else {
      setSelectedCodes(prevData => {
        return prevData?.filter(code => {
          return code !== e.target.value;
        });
      });
    }
  };

  const handleSubmit = values => {
    values = selectedCodes?.map(item => {
      return { code: item.obo_id, display: item.label };
    });
    console.log('WHAT IS THIS', values);
    // handleUpdate(vocabUrl, 'Terminology', values)
    // .then(data => navigate(`/Terminology/${data?.id}`),
    // );
  };
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
          .then(() => setLoading(false))
      : '';
  };

  const checkBoxDisplay = (d, index) => {
    return (
      <>
        <div key={index} className="modal_search_result">
          <div>
            <div className="modal_term_ontology">
              <div>
                <b>{d.label}</b>
              </div>
              <div>{d.obo_id}</div>
            </div>
            <div>{ellipsisString(d?.description, '100')}</div>
            {/* <div>Ontology: {d.ontology_prefix}</div> */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        open={!!getMappings}
        width={'50%'}
        onOk={() => {
          form.validateFields().then(values => {
            handleSubmit(values);
            form.resetFields();
            setGetMappings(null);
            setPage(1);
            setCurrent(1);
          });
        }}
        onCancel={() => {
          form.resetFields();
          setGetMappings(null);
          setPage(1);
          setCurrent(1);
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
                <Form form={form}>
                  <Form.Item name={['mappings']}>
                    <div className="modal_search_results">
                      <div className="modal_search_results_header">
                        <h3>Search results for: {getMappings?.code}</h3>
                      </div>
                      {results?.docs?.length > 0 ? (
                        <Checkbox.Group
                          className="mappings_checkbox"
                          // checked={selectedCodes.includes()}
                          options={results?.docs.map((d, index) => {
                            return {
                              value: d,
                              label: checkBoxDisplay(d),
                            };
                          })}
                          onChange={checkboxHandler}
                        />
                      ) : (
                        <h3>No results found.</h3>
                      )}
                    </div>
                  </Form.Item>
                </Form>
              </>
            ) : (
              <div className="loading_spinner">
                <ModalSpinner />
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
