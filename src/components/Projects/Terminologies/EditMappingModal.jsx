import { Modal } from 'antd';

export const EditMappingsModal = ({ editMappings, setEditMappings }) => {
  console.log(editMappings);
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
      {/* {editMappings?.map(item => {
        return (
          <>
            <div>Code: {item.code}</div>
            <div>Display: {item.display}</div>
          </>
        );
      })} */}
    </Modal>
  );
};
