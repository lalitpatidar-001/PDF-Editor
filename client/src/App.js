import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './layout/AuthLayout';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DashboardLayout from './layout/DashboardLayout';
import SinglePdfPage from './pages/SinglePdfPage';
import EditPdfPage from './pages/EditPdfPage';

/*
  App.js component:
    * Provide routing 
    * DashboardLayout and AuthLayout are providing nested routes
    * render Toaster for feedback 
*/

function App() {
  return (

    <>
      <Routes>
        <Route path='/' element={<DashboardLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="pdf/:id" element={<SinglePdfPage />} />
          <Route path="edit-pdf/:id" element={<EditPdfPage />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path='login' element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

      </Routes>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
