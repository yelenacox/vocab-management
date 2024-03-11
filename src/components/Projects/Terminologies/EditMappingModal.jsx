import { Checkbox, Modal, Form } from 'antd';

export const EditMappingsModal = ({
  editMappings,
  setEditMappings,
  mapping,
}) => {
  const [form] = Form.useForm();

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
            {/* <div>Ontology: {d.ontology_prefix}</div> */}
          </div>
        </div>
        {/* <div key={innerIndex} className="mappings_container">
                   <div key={innerIndex}>Code: {item.code}</div>
                   <div>Display: {item.display}</div>
                 </div> */}
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
          form.resetFields();
          setEditMappings(null);
        });
      }}
      onCancel={() => {
        form.resetFields();
        setEditMappings(null);
      }}
      maskClosable={true}
      destroyOnClose={true}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name={['mappings']}
          valuePropName="value"
          rules={[{ required: true, message: 'Please make a selection.' }]}
        >
          {mapping.length > 0
            ? mapping.map((m, index) => {
                if (m?.code === editMappings?.code) {
                  return (
                    <Checkbox.Group
                      className="mappings_checkbox"
                      options={m?.mappings?.map((item, index) => {
                        return {
                          value: JSON.stringify({
                            code: item.code,
                            display: item.display,
                            // description: d.description[0],
                            system: item?.system,
                          }),
                          label: editMappingsLabel(item, index),
                        };
                      })}
                    />
                  );
                }
              })
            : ''}
        </Form.Item>
      </Form>
    </Modal>
  );
};

//  <Checkbox.Group
//       className="mappings_checkbox"
//       options={m?.mappings?.map((m, index) => {
//         return {
//           value: {
//             code: m?.code,
//             display: m?.display,
//             system: m?.system,
//           },
//           label: (
//             <>
//               <div key={index} className="modal_search_result">
//                 <div>
//                   <div className="modal_term_ontology">
//                     <div>
//                       <b>{m.display}</b>
//                     </div>
//                     <div>
//                       {/* <a href={item.iri} target="_blank"> */}
//                       {m.code}
//                       {/* </a> */}
//                     </div>
//                   </div>
//                   {/* <div>{ellipsisString(item?.description[0], '100')}</div> */}
//                   {/* <div>Ontology: {d.ontology_prefix}</div> */}
//                 </div>
//               </div>
//               {/* <div key={innerIndex} className="mappings_container">
//                 <div key={innerIndex}>Code: {item.code}</div>
//                 <div>Display: {item.display}</div>
//               </div> */}
//             </>
//           ),
//         };
//       })}
//     />
