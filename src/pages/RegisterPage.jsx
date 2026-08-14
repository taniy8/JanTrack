import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUploadCloud, FiCheckCircle, FiX, FiAlertCircle } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { authRegister, createComplaintRemote } from '../services/jantrackApi';
import { showToast } from '../utils/toast';

const steps = ['Complaint Details', 'Evidence Upload', 'Review & Submit'];
const categories = ['Road Damage', 'Street Light', 'Water Supply', 'Garbage Collection', 'Electricity', 'Drainage', 'Illegal Construction', 'Transport', 'Government Office', 'Other'];

const initialForm = {
  category: '',
  description: '',
  state: '',
  district: '',
  city: '',
  area: '',
  pincode: '',
  location: '',
  priority: 'Medium',
  terms: false,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const [step, setStep] = useState(1);
  // derive initial category from navigation state or url param
  const incomingCategory = (location && (location.state?.complaintType || location.state?.defaultComplaintCategory)) || (location && new URLSearchParams(location.search).get('category')) || '';

  const normalizeCategory = (val) => {
    if (!val) return '';
    if (categories.includes(val)) return val;
    const alt = val.replace(/s$/i, '');
    if (categories.includes(alt)) return alt;
    const officeAlt = val.replace(/Offices$/i, 'Office');
    if (categories.includes(officeAlt)) return officeAlt;
    return val;
  };

  const [form, setForm] = useState({ ...initialForm, category: normalizeCategory(incomingCategory) });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [uploadState, setUploadState] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    const nextErrors = {};
    if (!form.category) nextErrors.category = 'Please select a complaint category.';
    if (!form.description.trim()) nextErrors.description = 'Please describe the issue.';
    if (!form.description.trim() || form.description.trim().length < 20) nextErrors.description = 'Description should be at least 20 characters.';
    if (!form.state.trim()) nextErrors.state = 'State is required.';
    if (!form.district.trim()) nextErrors.district = 'District is required.';
    if (!form.city.trim()) nextErrors.city = 'City is required.';
    if (!form.area.trim()) nextErrors.area = 'Area or landmark is required.';
    if (!/\d{6}/.test(form.pincode)) nextErrors.pincode = 'Pincode must be 6 digits.';
    if (!form.terms) nextErrors.terms = 'Please accept the terms to continue.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter((file) => file.size <= 10 * 1024 * 1024);
    if (validFiles.length !== selectedFiles.length) {
      setUploadState('Some files exceed the 10 MB limit.');
      return;
    }

    const formatted = validFiles.map((file) => ({ file, name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '' }));
    setFiles((current) => [...current, ...formatted]);
    setUploadState('Files uploaded successfully.');
    setProgress(100);
  };

  const removeFile = (name) => {
    setFiles((current) => current.filter((item) => item.name !== name));
    setUploadState('File removed.');
  };

  const handleSubmit = async () => {
    if (!user) {
      showToast.warning('Login required', 'Please login or create an account before registering a complaint.');
      navigate('/login', { state: { message: 'Please login or create an account before registering a complaint.' } });
      return;
    }
    if (!validateStep()) {
      showToast.warning('Please complete the form', 'Fill in all required fields before submitting your complaint.');
      return;
    }

    const complaint = {
      title: `${form.category} complaint in ${form.area}`,
      description: form.description.trim(),
      category: form.category,
      location: `${form.city}, ${form.area}`,
      priority: form.priority,
      attachments: files.map((item) => item.name),
      status: 'Pending',
      department: 'Pending Assignment',
      assignedOfficer: 'Unassigned',
      citizenId: user?.citizenId || 'CTZ0000',
      citizenName: user?.name || 'Citizen',
      userId: user?.id,
    };

    try {
      const { data } = await createComplaintRemote(complaint);
      showToast.success('Complaint Submitted Successfully!', `Complaint ID: ${data.complaint.id}. You can now track your complaint in real time.`);
      window.setTimeout(() => navigate('/success', { state: { complaintId: data.complaint.id } }), 700);
    } catch (error) {
      if (!error.response) {
        showToast.error('Server Unavailable', 'Cannot reach JanTrack backend. Please start the server and try again.');
      } else {
        showToast.error('Submission Failed', error.response?.data?.error || 'Unable to submit complaint right now.');
      }
    }
  };

  const descriptionLength = useMemo(() => form.description.length, [form.description]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Registration</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">File a complaint with confidence</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">A clear, guided experience for citizens to submit service requests with evidence and priority.</p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-wrap gap-3">
            {steps.map((item, index) => (
              <div key={item} className={`rounded-full px-4 py-2 text-sm font-medium ${step === index + 1 ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300'}`}>
                {index + 1}. {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <option value="">Select category</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
            {errors.category && <p className="mt-2 text-sm text-amber-700">{errors.category}</p>}

            <label className="mt-6 block text-sm font-semibold text-slate-800 dark:text-slate-200">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="5" maxLength="500" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" placeholder="Describe the issue clearly and include nearby landmarks." />
            <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
              <span>{descriptionLength}/500 characters</span>
              {errors.description && <span className="text-amber-700">{errors.description}</span>}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">State</label>
                <input name="state" value={form.state} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
                {errors.state && <p className="mt-2 text-sm text-amber-700">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">District</label>
                <input name="district" value={form.district} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
                {errors.district && <p className="mt-2 text-sm text-amber-700">{errors.district}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">City</label>
                <input name="city" value={form.city} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
                {errors.city && <p className="mt-2 text-sm text-amber-700">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Area / Landmark</label>
                <input name="area" value={form.area} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
                {errors.area && <p className="mt-2 text-sm text-amber-700">{errors.area}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Pin Code</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
              {errors.pincode && <p className="mt-2 text-sm text-amber-700">{errors.pincode}</p>}
            </div>
            <p className="mt-3 text-sm text-slate-500">Google Maps location placeholder</p>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white p-3 text-brand-600 dark:bg-slate-900"><FiUploadCloud size={22} /></div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Upload image or video evidence</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Attach before/after proof for faster resolution.</p>
              </div>
            </div>
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
              <FiUploadCloud size={26} className="text-brand-600" />
              <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Click to upload or drag and drop</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">PNG, JPG, JPEG, WEBP, MP4 • Max 10 MB</p>
              <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp,video/mp4" multiple className="hidden" onChange={handleUpload} />
            </label>

            {uploadState && <p className="mt-3 text-sm text-emerald-700">{uploadState}</p>}
            {progress > 0 && <div className="mt-3 h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-brand-600" style={{ width: `${progress}%` }} /></div>}

            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                {files.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                      {item.preview ? <img src={item.preview} alt={item.name} className="h-12 w-12 rounded-xl object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-700">VID</div>}
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.size}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(item.name)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-3">
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mt-1 rounded border-slate-300" />
              <span>I agree to the terms and confirm the information provided is accurate.</span>
            </label>
            {errors.terms && <p className="mt-2 text-sm text-amber-700">{errors.terms}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <FiCheckCircle className="text-emerald-600" /> Required fields, validation, and uploads are active
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(Math.max(1, step - 1))}>Back</Button>
            <Button onClick={() => { if (validateStep()) { setStep(2); handleSubmit(); } }}>Submit</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
