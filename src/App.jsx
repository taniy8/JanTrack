import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SimpleFooter from './components/SimpleFooter';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DetailsPage from './pages/DetailsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import CitizenRegisterPage from './pages/CitizenRegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import SuccessPage from './pages/SuccessPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/ProtectedRoute';
import FeatureDetailPage from './pages/features/FeatureDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ToastProvider from './components/ToastProvider';
import { BackToTopButton, FloatingQuickActions, ScrollProgress } from './components/ModernComponents';
import { featureDetails } from './utils/data';

function App() {
  const location = useLocation();
  const showHomeFooter = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <ToastProvider />
      <ScrollProgress />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/register" element={<CitizenRegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/complaint/new" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/features/ai-classification" element={<FeatureDetailPage feature={featureDetails.aiClassification} />} />
          <Route path="/features/live-tracking" element={<ProtectedRoute message="Please login to access live complaint tracking."><FeatureDetailPage feature={featureDetails.liveTracking} /></ProtectedRoute>} />
          <Route path="/features/proof-resolution" element={<FeatureDetailPage feature={featureDetails.proofResolution} />} />
          <Route path="/features/duplicate-detection" element={<FeatureDetailPage feature={featureDetails.duplicateDetection} />} />
          <Route path="/features/automatic-escalation" element={<FeatureDetailPage feature={featureDetails.automaticEscalation} />} />
          <Route path="/features/citizen-feedback" element={<FeatureDetailPage feature={featureDetails.citizenFeedback} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showHomeFooter ? <Footer /> : <SimpleFooter />}
      <BackToTopButton />
      <FloatingQuickActions />
    </div>
  );
}

export default App;
