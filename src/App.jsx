import { useState, createContext } from 'react';
import viteLogo from '/vite.svg';
import { OntologySearch } from './components/Search/OntologySearch';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar';
import { Switch } from 'antd';
import { Footer } from './components/Nav/Footer';
import { SearchResults } from './components/Search/SearchResults';
import { Projects } from './components/Projects/Projects';
import { Terminology } from './components/Projects/Terminology';
import { AddTerminology } from './components/Projects/AddTerminology';

export const myContext = createContext();

function App() {
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(20);
  const [current, setCurrent] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const URL = import.meta.env.VITE_SEARCH_ENDPOINT;
  const vocabUrl = import.meta.env.VITE_VOCAB_ENDPOINT;

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
