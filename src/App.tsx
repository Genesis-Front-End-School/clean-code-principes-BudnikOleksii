import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layouts/Layout';
import Courses from './pages/Courses';
import Course from './pages/Course';
import { PATHS } from './constants';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Courses />} />

        <Route path={PATHS.courses}>
          <Route index element={<Courses />} />
          <Route path=":courseId" element={<Course />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
