export const EditCodeButtons = ({
  terminologyEdit,
  active,
  index,
  onCancel,
  setUpdatedCode,
  codeObject,
}) => {
  return terminologyEdit && active === index ? (
    <>
      <button>Save</button>
      <button
        onClick={() => {
          onCancel(index), setUpdatedCode(codeObject.code);
        }}
      >
        Cancel
      </button>
    </>
  ) : (
    ''
  );
};
