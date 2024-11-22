import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ModelDashboard } from './pages/dashboard/ModelDashboard';
import { ClientDashboard } from './pages/dashboard/ClientDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { CreateAd } from './pages/advertising/CreateAd';
import { ManageAds } from './pages/advertising/ManageAds';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ModelMediaUpload } from './pages/model/ModelMediaUpload';
import { handleGoogleRedirectResult } from './lib/services/auth';
import { useAuthStore } from './store/authStore';
import { auth } from './lib/firebase';

const queryClient = new QueryClient();

function App() {
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    // Handle Google Sign-in redirect result
    const handleRedirect = async () => {
      try {
        const userData = await handleGoogleRedirectResult();
        if (userData) {
          const token = await auth.currentUser?.getIdToken();
          if (token) {
            setAuth(userData, token);
          }
        }
      } catch (error) {
        console.error('Error handling redirect:', error);
      }
    };

    handleRedirect();
  }, [setAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/advertising/create" element={<CreateAd />} />
              
              {/* Protected Routes */}
              <Route
                path="/model/media"
                element={
                  <ProtectedRoute allowedRoles={['MODEL']}>
                    <ModelMediaUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advertising/manage"
                element={
                  <ProtectedRoute allowedRoles={['MODEL']}>
                    <ManageAds />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/model/dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['MODEL']}>
                    <ModelDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['CLIENT']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;