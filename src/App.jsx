import { useState } from 'react';
import viteLogo from '/vite.svg';
import { OntologySearch } from './components/Search/OntologySearch';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Nav/NavBar';
import { Switch } from 'antd';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<OntologySearch />} />
      </Route>
    </Routes>
  );
}

export default App;
