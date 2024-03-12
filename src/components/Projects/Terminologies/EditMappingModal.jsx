import { Checkbox, Modal, Form } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { myContext } from '../../../App';
import { ModalSpinner } from '../../Manager/Spinner';

export const EditMappingsModal = ({
  editMappings,
  setEditMappings,
  mapping,
  terminologyId,
}) => {
  const [form] = Form.useForm();
  const [termMappings, setTermMappings] = useState([]);
  const [options, setOptions] = useState([]);
  const { vocabUrl } = useContext(myContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('EM', editMappings);
    fetchMappings();
  }, [editMappings]);

  const clearData = () => {
    setTermMappings([]);
    setOptions([]);
  };
  const fetchMappings = () => {
    if (editMappings) {
      setLoading(true);
      return fetch(
        `${vocabUrl}/Terminology/${terminologyId}/mapping/${editMappings.code}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('An unknown error occurred.');
          }
        })
        .then(data => {
          if (data.mappings.length < 1) {
            return undefined;
          }
          const mappings = [];
          const options = [];
          data.mappings.forEach((m, index) => {
            const val = JSON.stringify({
              code: m.code,
              display: m.display,
              // description: d.description[0],
              system: m?.system,
            });
            mappings.push(val);
            options.push({ value: val, label: editMappingsLabel(m, index) });
          });
          setTermMappings(mappings);
          setOptions(options);
        })
        .then(() => setLoading(false));
    }
  };

  const getOptions = () => {
    if (termMappings.length < 1) {
      return undefined;
    }
    return termMappings.map((t, index) => {
      return { value: t, label: editMappingsLabel(t, index) };
    });
  };

  console.log('MPPINGS', termMappings);
  console.log('options', options);

  const editMappingsLabel = (item, index) => {
    return (
      <>
        <div key={index} className="modal_search_result">
          <div>
            <div className="modal_term_ontology">
              <div>
                <b>{item?.display}</b>
              </div>
              <div>
                {/* <a href={item.iri} target="_blank"> */}
                {item?.code}
                {/* </a> */}
              </div>
            </div>
            {/* <div>{ellipsisString(item?.description[0], '100')}</div> */}
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal
      open={!!editMappings}
      width={'51%'}
      styles={{ body: { height: '60vh', overflowY: 'auto' } }}
      okText="Save"
      onOk={() => {
        form.validateFields().then(values => {
          handleSubmit(values);
          clearData();
          form.resetFields();
          setEditMappings(null);
        });
      }}
      onCancel={() => {
        clearData();
        form.resetFields();
        setEditMappings(null);
      }}
      maskClosable={true}
      destroyOnClose={true}
    >
      {loading ? (
        <ModalSpinner />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name={['mappings']}
            valuePropName="value"
            rules={[{ required: true, message: 'Please make a selection.' }]}
            initialValue={termMappings}
          >
            <Checkbox.Group className="mappings_checkbox" options={options} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
