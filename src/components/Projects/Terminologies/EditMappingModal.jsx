import { Modal } from 'antd';

export const EditMappingsModal = ({
  editMappings,
  setEditMappings,
  mapping,
}) => {
  const mappingMatch = () => {
    if (mapping.length > 0) {
      return mapping.map((m, index) => {
        if (m?.code === editMappings?.code) {
          return m?.mappings?.map((item, innerIndex) => (
            <>
              <div key={innerIndex} className="mappings_container">
                <div key={innerIndex}>Code: {item.code}</div>
                <div>Display: {item.display}</div>
              </div>
            </>
          ));
        }
        return null; // Returning null if condition doesn't match
      });
    }
    return null; // Returning null if mapping length is 0
  };

  return (
    <Modal
      open={!!editMappings}
      width={'50%'}
      onOk={() => setEditMappings(null)}
      onCancel={() => {
        setEditMappings(null);
      }}
      maskClosable={true}
      destroyOnClose={true}
    >
      {mappingMatch()}
    </Modal>
  );
};
