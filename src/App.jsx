import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { OntologySearch } from './components/OntologySearch';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OntologySearch />} />
    </Routes>
  );
}

export default App;
