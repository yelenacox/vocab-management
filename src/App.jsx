import { useState, createContext } from 'react';
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
  const [codeId, setCodeId] = useState(0);
  const [variableId, setVariableId] = useState(0);
  const [table, setTable] = useState(initialTable);

  const [terminology, setTerminology] = useState(initialTerminology);
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(false);

  const updateTerminology = () =>
    fetch(`${vocabUrl}/Terminology/${terminology.id}`, {
      // fetch(`${vocabUrl}/terminologies/${terminology.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
    })
      .then(res => res.json())
      .then(data => setTerminology(data));

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

  const handleVariableAdd = () => {
    setTable({
      ...table,
      variables: [
        ...table.variables,
        { id: getVariableId(), name: '', description: '', data_type: '' },
      ],
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
        codeId,
        setCodeId,
        updateTerminology,
        getCodeId,
        handleCodeAdd,
        tables,
        setTables,
        table,
        setTable,
        handleVariableAdd,
        getVariableId,
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
        </Route>
      </Routes>
    </myContext.Provider>
  );
}

export default App;
