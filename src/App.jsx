import { useState, createContext } from 'react';
import viteLogo from '/vite.svg';
import { OntologySearch } from './components/Search/OntologySearch';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar';
import { Switch } from 'antd';
import { Footer } from './components/Nav/Footer';
import { SearchResults } from './components/Search/SearchResults';

export const myContext = createContext();

function App() {
  const [results, setResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(20);
  const [current, setCurrent] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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
        </Route>
      </Routes>
    </myContext.Provider>
  );
}

export default App;
