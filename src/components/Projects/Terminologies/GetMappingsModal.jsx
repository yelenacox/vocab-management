import { Modal } from 'antd';

export const GetMappingsModal = ({
  getMappings,
  mapping,
  setGetMappings,
  code,
}) => {
  return (
    <Modal
      open={getMappings}
      width={'50%'}
      onOk={() => setGetMappings(false)}
      onCancel={() => {
        setGetMappings(false);
      }}
      maskClosable={true}
    >
      POOPIES
    </Modal>
  );
};
