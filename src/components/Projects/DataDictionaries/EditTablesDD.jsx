import { useState } from 'react';

export const EditTablesDD = ({ selectedObj, tablesDD }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(tablesDD);
  //   const selectedObj = tablesDD.filter(table => {
  //     return arrayOfIds?.includes(table.id);
  //   });

  const checkboxHandler = e => {
    let isSelected = e.target.checked;
    let checkboxValue = e.target.value;
    // let alreadyChecked = selectedObj.includes(checkboxValue)
    if (isSelected) {
      setSelectedItems([...selectedItems, checkboxValue]);
    } else {
      setSelectedItems(prevData => {
        return prevData?.filter(id => {
          return id !== checkboxValue;
        });
      });
    }
  };
  return (
    <>
      <div className="tables_dd_edit">
        {tablesDD.map((table, index) => {
          return (
            <>
              <tr key={index}>
                <td className="initial_cell"></td>
                <td className="first_cell">
                  <input
                    key={index}
                    id="tablesDD_checkbox"
                    name="tableDD"
                    className="tablesDD_checkbox"
                    type="checkbox"
                    value={table.id}
                    checked={selectedItems?.includes(table.id)}
                    onChange={checkboxHandler}
                  />
                  <label className="tableDD_reference" htmlFor="tableDD">
                    {table.name}
                  </label>
                </td>
              </tr>
            </>
          );
        })}
      </div>
    </>
  );
};
