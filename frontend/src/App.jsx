import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DrivePage from './pages/DrivePage';
import ProtectedRoute from './components/ProtectedRoute';
import TrashPage from './pages/TrashPage';
import StarredPage from './pages/StarredPage';
import SharedPage from './pages/SharedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/drive"
          element={
            <ProtectedRoute>
              <DrivePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drive/:folderId"
          element={
            <ProtectedRoute>
              <DrivePage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/trash"
  element={
    <ProtectedRoute>
      <TrashPage />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<Navigate to="/login" replace />} />

        <Route
  path="/starred"
  element={
    <ProtectedRoute>
      <StarredPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/shared"
  element={
    <ProtectedRoute>
      <SharedPage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;