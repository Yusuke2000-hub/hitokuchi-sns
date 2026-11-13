import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './contexts/AuthProvider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TimelinePage from './pages/TimelinePage';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* 未認証専用（ログイン済みなら / へ） */}
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* 認証必須 */}
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="/" element={<TimelinePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
