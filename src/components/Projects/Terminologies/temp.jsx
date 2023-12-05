const test = () => {
  return (
    <>
      <div className="terminology_sub_nav">
        <label htmlFor="terminology_name">Name</label>
        <input
          autoFocus
          id="name"
          className="name_input"
          type="text"
          value={terminology.name}
          onChange={evt => {
            setTerminology({
              ...terminology,
              name: evt.target.value,
            });
          }}
        />
        <div className="description">
          <label htmlFor="terminology_description">Description</label>
          <textarea
            id="description"
            className="description_input"
            type="text"
            value={terminology.description}
            onChange={evt => {
              setTerminology({
                ...terminology,
                description: evt.target.value,
              });
            }}
          />
        </div>{' '}
      </div>
      <div className="table_container">
        <table className="table">
          <thead className="header">
            <tr className="header_row">
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {terminology?.codes?.map((r, index) => {
              return (
                <tr key={r?.code}>
                  <td>
                    {' '}
                    <input
                      required
                      id="code"
                      className="code_input"
                      type="text"
                      value={r.code}
                      onChange={evt => {
                        setThisCode({
                          ...thisCode,
                          code: evt.target.value,
                        });
                      }}
                    />
                  </td>
                  <td>
                    <textarea
                      required
                      id="code_description"
                      className="code_description_input"
                      type="text"
                      value={r.description}
                      onChange={evt => {
                        setThisCode({
                          ...thisCode,
                          description: evt.target.value,
                        });
                      }}
                    />
                  </td>
                  <td className="delete_cell">
                    <DeleteCode
                      index={index}
                      terminology={terminology}
                      setTerminology={setTerminology}
                      terminologyId={terminologyId}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input
          required
          id="url"
          className="url_input"
          type="text"
          value={terminology.url}
          onChange={evt => {
            setTerminology({
              ...terminology,
              url: evt.target.value,
            });
          }}
        />
      </div>
    </>
  );
};
