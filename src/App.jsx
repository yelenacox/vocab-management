import { useState, createContext, useEffect } from 'react';
import { OntologySearch } from './components/Search/OntologySearch';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar';
import { Footer } from './components/Nav/Footer';
import { SearchResults } from './components/Search/SearchResults';
import { Projects } from './components/Projects/Projects';
import { Terminology } from './components/Projects/Terminologies/Terminology';
import { AddTerminology } from './components/Projects/Terminologies/AddTerminology';
import { TableDetails } from './components/Projects/Tables/TableDetails';
import { AddTable } from './components/Projects/Tables/AddTable';
import { DDDetails } from './components/Projects/DataDictionaries/DDDetails';

export const myContext = createContext();

function App() {
  const URL = import.meta.env.VITE_SEARCH_ENDPOINT;
  const vocabUrl = import.meta.env.VITE_VOCAB_ENDPOINT;
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(20);
  const [current, setCurrent] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const initialTerminology = { url: '', description: '', name: '', codes: [] };
  const initialTable = { name: '', description: '', url: '', variables: [] };
  const initialDD = { name: '', description: '', tables: [] };
  const [codeId, setCodeId] = useState(0);
  const [variableId, setVariableId] = useState(0);
  const [table, setTable] = useState(initialTable);
  const [dataDictionary, setDataDictionary] = useState(initialDD);
  const resetTable = () => setTable(initialTable);
  const [terminologies, setTerminologies] = useState([]);

  const [terminology, setTerminology] = useState(initialTerminology);
  const [tables, setTables] = useState([]);
  const [dataDictionaries, setDataDictionaries] = useState([]);

  const [loading, setLoading] = useState(false);

  const addTableVariable = () => {
    const tableVars = table.variables;
    tableVars.push({ id: getVariableId() });
    setTable({
      ...table,
      variables: tableVars,
    });
  };
  const removeTableVariable = variable => {
    const varIndex = table.variables.findIndex(v => v.id === variable.id);
    const tableVars = table.variables;
    tableVars.splice(varIndex, 1);
    setTable({ ...table, variables: tableVars });

    console.log(table);
  };

  const resetTableVariables = () => {
    setTable({ ...table, variables: [] });
  };
  const updateTableVariable = variable => {
    if (variable.id !== undefined) {
      const tableVars = table.variables;
      const varIndex = tableVars.findIndex(v => v.id === variable.id);
      if (varIndex > -1) {
        tableVars[varIndex] = variable;
        setTable({ ...table, variables: tableVars });
      }
    }
  };
  const updateTerminology = () =>
    fetch(`${vocabUrl}/Terminology/${terminology.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
    })
      .then(res => res.json())
      .then(data => setTerminology(data));

  const updateTable = () =>
    fetch(`${vocabUrl}/Table/${table.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    })
      .then(res => res.json())
      .then(data => setTable(data));

  const getCodeId = () => {
    const current = codeId;
    setCodeId(codeId + 1);
    return current;
  };
  const getVariableId = () => {
    const current = variableId;
    setVariableId(variableId + 1);
    return current;
  };

  const handleCodeAdd = () => {
    setTerminology({
      ...terminology,
      codes: [...terminology.codes, { id: getCodeId(), code: '', display: '' }],
    });
  };

  return (
    <myContext.Provider
      value={{
        results,
        setResults,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        rows,
        setRows,
        current,
        setCurrent,
        buttonDisabled,
        setButtonDisabled,
        loading,
        setLoading,
        URL,
        vocabUrl,
        terminology,
        setTerminology,
        initialTerminology,
        terminologies,
        setTerminologies,
        codeId,
        setCodeId,
        updateTerminology,
        getCodeId,
        handleCodeAdd,
        tables,
        setTables,
        table,
        resetTable,
        setTable,
        updateTableVariable,
        resetTableVariables,
        removeTableVariable,
        addTableVariable,
        updateTable,
        getVariableId,
        dataDictionaries,
        setDataDictionaries,
        dataDictionary,
        setDataDictionary,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<OntologySearch />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/terminology/:terminologyId" element={<Terminology />} />
          <Route path="/addTerminology" element={<AddTerminology />} />
          <Route path="/table/:tableId" element={<TableDetails />} />
          <Route path="/addTable" element={<AddTable />} />
          <Route path="/data_dictionary/:DDId" element={<DDDetails />} />
        </Route>
      </Routes>
    </myContext.Provider>
  );
}

export default App;
