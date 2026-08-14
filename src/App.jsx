import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SimpleFooter from './components/SimpleFooter';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminLayout from './components/AdminLayout';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCitizensPage from './pages/admin/AdminCitizensPage';
import AdminOfficersPage from './pages/admin/AdminOfficersPage';
import AdminDepartmentsPage from './pages/admin/AdminDepartmentsPage';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminAnnouncementsPage from './pages/admin/AdminAnnouncementsPage';
import AdminFeedbackPage from './pages/admin/AdminFeedbackPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
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
import RoleProtectedRoute from './components/RoleProtectedRoute';
import FeatureDetailPage from './pages/features/FeatureDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ToastProvider from './components/ToastProvider';
import PageAnimations from './components/PageAnimations';
import { BackToTopButton, FloatingQuickActions, ScrollProgress } from './components/ModernComponents';
import OfficerDashboardPage from './pages/OfficerDashboardPage';
import DepartmentDashboardPage from './pages/DepartmentDashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { featureDetails } from './utils/data';
import { useAuth } from './contexts/AuthContext';
import { getRoleDashboardPath } from './utils/dashboardData';

function DashboardRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getRoleDashboardPath(user?.role)} replace />;
}

function App() {
  const location = useLocation();
  const showHomeFooter = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ToastProvider />
      <ScrollProgress />
      <Navbar />
      <PageAnimations />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/register" element={<CitizenRegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
          <Route path="/citizen/dashboard" element={<RoleProtectedRoute allowedRoles={['Citizen']} redirectTo="/unauthorized"><DashboardPage /></RoleProtectedRoute>} />
          <Route path="/officer/dashboard" element={<RoleProtectedRoute allowedRoles={['Officer']} redirectTo="/unauthorized"><OfficerDashboardPage /></RoleProtectedRoute>} />
          <Route path="/officer-dashboard" element={<RoleProtectedRoute allowedRoles={['Officer']} redirectTo="/unauthorized"><OfficerDashboardPage /></RoleProtectedRoute>} />
          <Route path="/department-dashboard" element={<RoleProtectedRoute allowedRoles={['Department Head', 'Supervisor']} redirectTo="/unauthorized"><DepartmentDashboardPage /></RoleProtectedRoute>} />
          <Route path="/admin" element={<RoleProtectedRoute allowedRoles={['Admin']} redirectTo="/unauthorized"><AdminLayout /></RoleProtectedRoute>}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="dashboard" element={<AdminOverviewPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="citizens" element={<AdminCitizensPage />} />
            <Route path="officers" element={<AdminOfficersPage />} />
            <Route path="departments" element={<AdminDepartmentsPage />} />
            <Route path="complaints" element={<AdminComplaintsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="announcements" element={<AdminAnnouncementsPage />} />
            <Route path="feedback" element={<AdminFeedbackPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>
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
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
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
