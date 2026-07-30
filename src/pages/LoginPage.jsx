import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      showToast.warning('Missing credentials', 'Please enter both email and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      showToast.error('Invalid email', 'Please enter a valid email address.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('jtrack-users') || '[]');
    const matchedUser = existingUsers.find((user) => user.email === form.email.trim().toLowerCase() && user.password === form.password);

    if (!matchedUser) {
      setError('No account found for this email and password. Please register first.');
      showToast.error('Invalid credentials', 'Email or password is incorrect.');
      return;
    }

    login({
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      citizenId: matchedUser.citizenId,
      profile: matchedUser.profile,
    });
    showToast.success('Login Successful!', `Welcome back, ${matchedUser.name}.`);
    const redirectPath = location.state?.from?.pathname || '/dashboard';
    window.setTimeout(() => navigate(redirectPath, { replace: true }), 700);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Authentication</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Access your JanTrack citizen account</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">Sign in to continue to your dashboard and register complaints securely.</p>
      </div>

      <Card className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Welcome back</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Continue your complaint journey with one secure sign in.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <p>• Track complaints in real time</p>
            <p>• Upload proof and monitor updates</p>
            <p>• Save your progress safely</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {location.state?.message && <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">{location.state.message}</div>}
          {error && <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{error}</div>}

          <div>
            <label className="block text-sm font-semibold text-slate-800">Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" placeholder="citizen@example.com" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">Password</label>
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} className="w-full bg-transparent text-slate-700 focus:outline-none" placeholder="Enter password" />
              <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} className="ml-2 text-slate-500">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300" />
              <span>Remember me</span>
            </label>
            <a href="#" className="font-semibold text-brand-600">Forgot password?</a>
          </div>

          <Button className="w-full">Login</Button>

          <div className="text-center text-sm text-slate-600">
            New to JanTrack? <Link to="/register" className="font-semibold text-brand-600">Create account</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
