import { Modal } from 'antd';

export const EditMappingsModal = ({ editMappings, setEditMappings }) => {
  return (
    <Modal
      open={!!editMappings}
      width={'60%'}
      onOk={() => setEditMappings(null)}
      onCancel={() => {
        setEditMappings(null);
      }}
      maskClosable={true}
      destroyOnClose={true}
    >
      <div>Code: {editMappings?.code}</div>
      <div>Display: {editMappings?.display}</div>
    </Modal>
  );
};
