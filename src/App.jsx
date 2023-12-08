import { useState, createContext } from 'react';
import viteLogo from '/vite.svg';
import { OntologySearch } from './components/Search/OntologySearch';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar';
import { Switch } from 'antd';
import { Footer } from './components/Nav/Footer';
import { SearchResults } from './components/Search/SearchResults';
import { Projects } from './components/Projects/Projects';
import { Terminology } from './components/Projects/Terminologies/Terminology';
import { AddTerminology } from './components/Projects/Terminologies/AddTerminology';

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
  const [codeId, setCodeId] = useState(0);

  const [terminology, setTerminology] = useState(initialTerminology);

  const [loading, setLoading] = useState(false);

  const updateTerminology = () =>
    fetch(`${vocabUrl}/terminologies/${terminology.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(terminology),
    })
      .then(res => res.json())
      .then(data => setTerminology(data));

  console.log(terminology);
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
          <Route
            path="/terminologies/:terminologyId"
            element={<Terminology />}
          />
          <Route path="/add" element={<AddTerminology />} />
        </Route>
      </Routes>
    </myContext.Provider>
  );
}

export default App;
