import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Horror from './pages/Horror';
import Action from './pages/Action';
import SciFi from './pages/SciFi';
import MyList from './pages/MyList';
import Search from './pages/Search';
import Series from './pages/Series';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

function MainLayout({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col md:flex-row bg-dark-bg min-h-screen text-text-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto w-full px-4 md:px-6 pb-24 md:pb-6">
           {children}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Application Routes */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/movies" element={<MainLayout><Movies /></MainLayout>} />
          <Route path="/horror" element={<MainLayout><Horror /></MainLayout>} />
          <Route path="/action" element={<MainLayout><Action /></MainLayout>} />
          <Route path="/scifi" element={<MainLayout><SciFi /></MainLayout>} />
          <Route path="/mylist" element={<MainLayout><MyList /></MainLayout>} />
          <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
          <Route path="/series" element={<MainLayout><Series /></MainLayout>} />
          <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
