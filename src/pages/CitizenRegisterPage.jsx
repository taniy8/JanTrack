import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { createCitizenId, validateCitizenRegistration } from '../utils/validation';
import { showToast } from '../utils/toast';

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  state: '',
  district: '',
  city: '',
  address: '',
  pincode: '',
  identityType: '',
  identityNumber: '',
  terms: false,
};

export default function CitizenRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRole = location.state?.selectedRole;
  const { login } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: '' });
    setMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const nextErrors = validateCitizenRegistration(form);
    const existingUsers = JSON.parse(localStorage.getItem('jtrack-users') || '[]');

    const duplicate = existingUsers.find((user) => user.email.toLowerCase() === form.email.trim().toLowerCase() || user.mobile === form.mobile.trim());
    if (duplicate) {
      nextErrors.duplicate = duplicate.email.toLowerCase() === form.email.trim().toLowerCase()
        ? 'An account with this email already exists.'
        : 'An account with this mobile number already exists.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitting(false);
      showToast.warning('Please complete the form', 'Please resolve the highlighted validation issues before continuing.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));

      const citizenId = createCitizenId(existingUsers.length);
      const userRecord = {
        id: Date.now(),
        name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        password: form.password,
        role: 'Citizen',
        citizenId,
        createdAt: new Date().toISOString(),
        profile: {
          gender: form.gender,
          dob: form.dob,
          state: form.state.trim(),
          district: form.district.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          pincode: form.pincode.trim(),
          identityType: form.identityType,
          identityNumber: form.identityNumber.trim(),
        },
      };

      const updatedUsers = [...existingUsers, userRecord];
      localStorage.setItem('jtrack-users', JSON.stringify(updatedUsers));
      login({
        name: userRecord.name,
        email: userRecord.email,
        role: userRecord.role,
        citizenId: userRecord.citizenId,
        profile: userRecord.profile,
      });
      setMessage(`Registration successful! Your Citizen ID is ${citizenId}`);
      showToast.success('Registration Successful!', `Welcome to JanTrack.\nYour Citizen ID: ${citizenId}\nRedirecting to Login...`);

      window.setTimeout(() => {
        navigate('/login', { replace: true, state: { message: `Registration successful! Your Citizen ID is ${citizenId}`, selectedRole } });
      }, 1200);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
      showToast.error('Registration Failed', 'We could not create your account right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Citizen Registration</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Create your JanTrack account</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">Register to submit complaints, track updates, and access your citizen dashboard.</p>
      </div>

      <Card>
        {message && <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
        {errors.submit && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{errors.submit}</div>}
        <form onSubmit={handleRegister} className="grid gap-5 md:grid-cols-2" noValidate>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.fullName && <p className="mt-2 text-sm text-amber-700">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.email && <p className="mt-2 text-sm text-amber-700">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Mobile Number</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.mobile && <p className="mt-2 text-sm text-amber-700">{errors.mobile}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.password && <p className="mt-2 text-sm text-amber-700">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.confirmPassword && <p className="mt-2 text-sm text-amber-700">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="mt-2 text-sm text-amber-700">{errors.gender}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Date of Birth</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.dob && <p className="mt-2 text-sm text-amber-700">{errors.dob}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">State</label>
            <input name="state" value={form.state} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.state && <p className="mt-2 text-sm text-amber-700">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">District</label>
            <input name="district" value={form.district} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.district && <p className="mt-2 text-sm text-amber-700">{errors.district}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.city && <p className="mt-2 text-sm text-amber-700">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.pincode && <p className="mt-2 text-sm text-amber-700">{errors.pincode}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800">Complete Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} rows="3" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.address && <p className="mt-2 text-sm text-amber-700">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Government ID Type</label>
            <select name="identityType" value={form.identityType} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none">
              <option value="">Select</option>
              <option>Aadhaar</option>
              <option>Pan Card</option>
              <option>Voter ID</option>
              <option>Driving License</option>
            </select>
            {errors.identityType && <p className="mt-2 text-sm text-amber-700">{errors.identityType}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Government ID Number</label>
            <input name="identityNumber" value={form.identityNumber} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none" />
            {errors.identityNumber && <p className="mt-2 text-sm text-amber-700">{errors.identityNumber}</p>}
          </div>

          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-1 rounded border-slate-300" />
              <span>I agree to the terms and privacy policy for using JanTrack services.</span>
            </label>
            {errors.terms && <p className="mt-2 text-sm text-amber-700">{errors.terms}</p>}
            {errors.duplicate && <p className="mt-2 text-sm text-amber-700">{errors.duplicate}</p>}
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4">
            <Button type="submit" isLoading={isSubmitting}>{isSubmitting ? 'Creating Account...' : 'Register'}</Button>
            <p className="text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-brand-600">Login</Link></p>
          </div>
        </form>
      </Card>
    </div>
  );
}
