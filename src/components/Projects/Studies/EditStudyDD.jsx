import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
import SaveIcon from '../../../../assets/cloud_save.png';
import CancelIcon from '../../../../assets/cancel_icon.png';

export const EditStudyDD = ({
  selectedObjs,
  studyDDs,
  edit,
  setEdit,
  studyEdit,
  updateStudyDD,
}) => {
  let [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const ids = studyDDs.map(o => {
      if (selectedObjs.includes(o)) {
        return o.id;
      } else {
        return null;
      }
    });
    setSelectedIds(ids);
  }, [selectedObjs]);

  const handleOnChange = e => {
    const checked = e.target.checked;
    const value = e.target.id;
    const index = studyDDs.findIndex(obj => obj.id === value);
    if (index >= 0) {
      const tempIds = selectedIds;
      if (!checked) {
        tempIds[index] = null;
      } else {
        tempIds[index] = value;
      }
      setSelectedIds(tempIds);
    }
  };

  return (
    <>
      <thead className="header">
        <tr className="header_row">
          <div className="initial_div">
            {studyEdit && !edit ? (
              <img
                className="small_icon"
                onClick={() => setEdit(true)}
                src={PencilIcon}
              />
            ) : studyEdit && edit ? (
              <>
                {' '}
                <img
                  className="small_icon"
                  onClick={() => {
                    updateStudyDD(selectedIds);
                    setEdit(false);
                  }}
                  src={SaveIcon}
                />
                <img
                  className="small_icon"
                  onClick={() => setEdit(false)}
                  src={CancelIcon}
                />
              </>
            ) : (
              ''
            )}
          </div>

          <th className="first_cell">Data Dictionary</th>
        </tr>
      </thead>
      <tbody>
        {!edit
          ? selectedObjs.map((r, index) => {
              const checked = selectedIds?.includes(r.id);
              return (
                <tr key={index}>
                  <td className="initial_cell">
                    {edit ? (
                      <Checkbox
                        id={r.id}
                        defaultChecked={checked}
                        onChange={handleOnChange}
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  {
                    <td className="first_cell">
                      <Link to={`/DataDictionary/${r.id}`}>
                        {r?.name ? r.name : r.id}
                      </Link>
                    </td>
                  }
                </tr>
              );
            })
          : studyEdit && edit
          ? studyDDs.map((r, index) => {
              const checked = selectedIds?.includes(r.id);
              return (
                <tr key={index}>
                  <td className="initial_cell">
                    {edit ? (
                      <Checkbox
                        id={r.id}
                        defaultChecked={checked}
                        onChange={handleOnChange}
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  {
                    <td className="first_cell">
                      <Link to={`/DataDictionary/${r.id}`}>
                        {r?.name ? r.name : r.id}
                      </Link>
                    </td>
                  }
                </tr>
              );
            })
          : ''}{' '}
      </tbody>
    </>
  );
};

// import { useEffect, useState } from 'react';
// import { Checkbox } from 'antd';
// import { Link } from 'react-router-dom';
// import PencilIcon from '../../../../assets/pencil_yellow_transparent.png';
// import SaveIcon from '../../../../assets/cloud_save.png';
// import CancelIcon from '../../../../assets/cancel_icon.png';

// export const EditStudyDD = ({
//   selectedObjs,
//   studyDDs,
//   edit,
//   setEdit,
//   studyEdit,
//   updateStudyDD,
// }) => {
//   let [selectedIds, setSelectedIds] = useState([]);

//   useEffect(() => {
//     const ids = studyDDs.map(o => {
//       if (selectedObjs.includes(o)) {
//         return o.id;
//       } else {
//         return null;
//       }
//     });
//     setSelectedIds(ids);
//   }, [selectedObjs]);

//   const handleOnChange = e => {
//     const checked = e.target.checked;
//     const value = e.target.id;
//     const index = studyDDs.findIndex(obj => obj.id === value);
//     if (index >= 0) {
//       const tempIds = selectedIds;
//       if (!checked) {
//         tempIds[index] = null;
//       } else {
//         tempIds[index] = value;
//       }
//       setSelectedIds(tempIds);
//     }
//   };

//   return (
//     <>
//       <thead className="header">
//         <tr className="header_row">
//           <div className="initial_div">
//             {studyEdit && !edit ? (
//               <img
//                 className="small_icon"
//                 onClick={() => setEdit(true)}
//                 src={PencilIcon}
//               />
//             ) : studyEdit && edit ? (
//               <>
//                 {' '}
//                 <img
//                   className="small_icon"
//                   onClick={() => {
//                     updateStudyDD(selectedIds);
//                     setEdit(false);
//                   }}
//                   src={SaveIcon}
//                 />
//                 <img
//                   className="small_icon"
//                   onClick={() => setEdit(false)}
//                   src={CancelIcon}
//                 />
//               </>
//             ) : (
//               ''
//             )}
//           </div>

//           <th className="first_cell">Data Dictionary</th>
//         </tr>
//       </thead>
//       <tbody>
//         {studyDDs.map((r, index) => {
//           const checked = selectedIds?.includes(r.id);
//           return (
//             <tr key={index}>
//               <td className="initial_cell">
//                 {edit ? (
//                   <Checkbox
//                     id={r.id}
//                     defaultChecked={checked}
//                     onChange={handleOnChange}
//                   />
//                 ) : (
//                   ''
//                 )}
//               </td>
//               {
//                 <td className="first_cell">
//                   <Link to={`/DataDictionary/${r.id}`}>
//                     {r?.name ? r.name : r.id}
//                   </Link>
//                 </td>
//               }
//             </tr>
//           );
//         })}{' '}
//       </tbody>
//     </>
//   );
// };
