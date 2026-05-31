// src/pages/ProfilePage.jsx
// Two tabs: Edit Profile (name, phone, avatar) + Change Password
// USAGE in App.jsx:
//   import ProfilePage from './pages/ProfilePage';
//   <Route path="/profile" element={<ProfilePage />} />
// Make sure AuthContext exposes setUser

import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useToast } from '../components/Toast';
import api from '../utils/api';
import { User, Phone, Camera, Save, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const getInitials = (name = '') => name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

const strengthLabel = pwd => {
  if (!pwd) return null;
  let s = 0;
  if (pwd.length >= 8) s++; if (/[A-Z]/.test(pwd)) s++; if (/[0-9]/.test(pwd)) s++; if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s <= 1) return { label: 'Weak',   color: '#dc2626', pct: 25 };
  if (s === 2) return { label: 'Fair',   color: '#d97706', pct: 50 };
  if (s === 3) return { label: 'Good',   color: '#059669', pct: 75 };
  return             { label: 'Strong', color: '#065f46', pct: 100 };
};

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = useRef(null);
  const [tab, setTab] = useState('profile');

  const [profileForm, setProfileForm] = useState({ fullName: user?.fullName || '', phone: user?.phone || '' });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');

  const handleAvatarChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('File too large', 'Max 5 MB'); return; }
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    if (!profileForm.fullName.trim()) { toast.warning('Name required', 'Please enter your full name'); return; }
    setProfileLoading(true); setProfileSuccess(false);
    try {
      const data = new FormData();
      data.append('fullName', profileForm.fullName.trim());
      data.append('phone', profileForm.phone.trim());
      if (avatar) data.append('avatar', avatar);
      const res = await api.put('/api/users/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (setUser) setUser(prev => ({ ...prev, ...res.data }));
      const stored = localStorage.getItem('user');
      if (stored) localStorage.setItem('user', JSON.stringify({ ...JSON.parse(stored), ...res.data }));
      setProfileSuccess(true);
      toast.success('Profile updated!', 'Your changes have been saved');
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      toast.error('Update failed', err.response?.data?.message || 'Please try again');
    } finally { setProfileLoading(false); }
  };

  const handlePwSubmit = async e => {
    e.preventDefault(); setPwError('');
    if (!pwForm.currentPassword) { setPwError('Please enter your current password'); return; }
    if (pwForm.newPassword.length < 6) { setPwError('New password must be at least 6 characters'); return; }
    if (pwForm.newPassword !== pwForm.confirmPassword) { setPwError('New passwords do not match'); return; }
    if (pwForm.currentPassword === pwForm.newPassword) { setPwError('New password must be different from current'); return; }
    setPwLoading(true); setPwSuccess(false);
    try {
      await api.put('/api/users/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwSuccess(true);
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed!', 'Your password has been updated');
      setTimeout(() => setPwSuccess(false), 4000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to change password';
      setPwError(msg); toast.error('Failed', msg);
    } finally { setPwLoading(false); }
  };

  const strength = strengthLabel(pwForm.newPassword);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .pp-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;padding:32px 20px 60px;}
        .pp-container{max-width:600px;margin:0 auto;}
        .pp-back{display:inline-flex;align-items:center;gap:6px;font-size:.875rem;font-weight:600;color:#059669;background:none;border:none;cursor:pointer;margin-bottom:22px;padding:0;font-family:'DM Sans',sans-serif;transition:gap .15s;}
        .pp-back:hover{gap:10px;}
        .pp-card{background:#fff;border-radius:22px;border:1.5px solid #e6f7ef;box-shadow:0 4px 6px rgba(0,0,0,.04),0 20px 40px rgba(5,150,105,.08);overflow:hidden;}
        .pp-hero{background:linear-gradient(135deg,#064e3b,#065f46);padding:28px 28px 72px;position:relative;overflow:hidden;}
        .pp-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04)1px,transparent 1px);background-size:32px 32px;}
        .pp-hero-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:#fff;position:relative;z-index:1;}
        .pp-hero-sub{font-size:.82rem;color:#a7f3d0;margin-top:4px;position:relative;z-index:1;}
        .pp-avatar-wrap{display:flex;justify-content:center;margin-top:-46px;margin-bottom:20px;position:relative;z-index:2;}
        .pp-avatar-ring{position:relative;width:92px;height:92px;}
        .pp-avatar-img{width:92px;height:92px;border-radius:50%;object-fit:cover;border:4px solid #fff;box-shadow:0 4px 16px rgba(5,150,105,.2);display:block;}
        .pp-avatar-initials{width:92px;height:92px;border-radius:50%;background:linear-gradient(135deg,#059669,#047857);border:4px solid #fff;box-shadow:0 4px 16px rgba(5,150,105,.2);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;}
        .pp-avatar-edit{position:absolute;bottom:2px;right:2px;width:28px;height:28px;background:#fff;border:1.5px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(5,150,105,.2);transition:all .18s;}
        .pp-avatar-edit:hover{background:#ecfdf5;transform:scale(1.1);}
        .pp-tabs{display:flex;border-bottom:1.5px solid #e6f7ef;margin:0 28px;}
        .pp-tab{flex:1;text-align:center;padding:12px 0;font-size:.875rem;font-weight:600;color:#9ca3af;cursor:pointer;border-bottom:2.5px solid transparent;margin-bottom:-1.5px;transition:all .18s;display:flex;align-items:center;justify-content:center;gap:6px;}
        .pp-tab.on{color:#059669;border-bottom-color:#059669;}
        .pp-tab:hover:not(.on){color:#374151;}
        .pp-body{padding:24px 28px 32px;}
        .pp-field{margin-bottom:18px;}
        .pp-label{display:block;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#6b7280;margin-bottom:6px;}
        .pp-input-wrap{position:relative;}
        .pp-input-ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none;color:#9ca3af;}
        .pp-input{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:11px;padding:11px 14px 11px 40px;font-size:.9rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
        .pp-input.no-icon{padding-left:14px;}
        .pp-input::placeholder{color:#9ca3af;}
        .pp-input:focus{border-color:#34d399;background:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,.12);}
        .pp-eye{position:absolute;right:13px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;padding:0;display:flex;align-items:center;transition:color .15s;}
        .pp-eye:hover{color:#059669;}
        .pp-strength-bar{height:4px;border-radius:2px;background:#e5e7eb;margin-top:6px;overflow:hidden;}
        .pp-strength-fill{height:100%;border-radius:2px;transition:width .3s,background .3s;}
        .pp-strength-label{font-size:.72rem;font-weight:600;margin-top:4px;}
        .pp-rules{margin-top:8px;display:flex;flex-direction:column;gap:4px;}
        .pp-rule{display:flex;align-items:center;gap:6px;font-size:.75rem;color:#9ca3af;transition:color .18s;}
        .pp-rule.ok{color:#059669;}
        .pp-rule-dot{width:6px;height:6px;border-radius:50%;background:#e5e7eb;flex-shrink:0;transition:background .18s;}
        .pp-rule.ok .pp-rule-dot{background:#059669;}
        .pp-error{display:flex;align-items:flex-start;gap:8px;background:#fff1f2;border:1.5px solid #fecdd3;border-radius:10px;padding:11px 14px;font-size:.82rem;color:#be123c;margin-bottom:16px;line-height:1.5;}
        .pp-success{display:flex;align-items:center;gap:8px;background:#dcfce7;border:1.5px solid #a7f3d0;border-radius:10px;padding:11px 14px;font-size:.82rem;color:#065f46;font-weight:600;margin-bottom:16px;}
        .pp-info-row{display:flex;gap:10px;background:#f0fdf4;border:1px solid #d1fae5;border-radius:10px;padding:11px 14px;font-size:.8rem;color:#065f46;margin-bottom:18px;line-height:1.55;}
        .pp-submit{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border:none;border-radius:12px;padding:13px;font-size:.95rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;box-shadow:0 6px 18px rgba(5,150,105,.25);transition:all .2s;margin-top:6px;}
        .pp-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(5,150,105,.38);}
        .pp-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .pp-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:ppSpin .7s linear infinite;}
        @keyframes ppSpin{to{transform:rotate(360deg);}}
      `}</style>
      <div className="pp-root">
        <div className="pp-container">
          <button className="pp-back" onClick={() => navigate(-1)}><ArrowLeft size={16}/> Back</button>
          <div className="pp-card">
            <div className="pp-hero">
              <div className="pp-hero-title">My Account</div>
              <div className="pp-hero-sub">Manage your profile and security settings</div>
            </div>
            <div className="pp-avatar-wrap">
              <div className="pp-avatar-ring">
                {avatarPreview
                  ? <img src={avatarPreview} alt="Profile" className="pp-avatar-img" onError={() => setAvatarPreview(null)}/>
                  : <div className="pp-avatar-initials">{getInitials(profileForm.fullName)}</div>
                }
                <div className="pp-avatar-edit" onClick={() => fileRef.current?.click()} title="Change photo">
                  <Camera size={14} color="#059669"/>
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }}/>
              </div>
            </div>
            <div className="pp-tabs">
              <div className={`pp-tab ${tab === 'profile' ? 'on' : ''}`} onClick={() => setTab('profile')}><User size={15}/> Edit Profile</div>
              <div className={`pp-tab ${tab === 'password' ? 'on' : ''}`} onClick={() => setTab('password')}><Shield size={15}/> Change Password</div>
            </div>
            <div className="pp-body">
              {tab === 'profile' && (
                <form onSubmit={handleProfileSubmit}>
                  {profileSuccess && <div className="pp-success"><CheckCircle size={16}/> Profile updated successfully!</div>}
                  <div className="pp-info-row"><Camera size={15} style={{ flexShrink:0, marginTop:1 }}/> Click the camera icon on your avatar to change your photo. Max 5 MB.</div>
                  <div className="pp-field">
                    <label className="pp-label">Full Name *</label>
                    <div className="pp-input-wrap">
                      <span className="pp-input-ico"><User size={16}/></span>
                      <input name="fullName" value={profileForm.fullName} onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))} className="pp-input" placeholder="Your full name" required/>
                    </div>
                  </div>
                  <div className="pp-field">
                    <label className="pp-label">Phone Number</label>
                    <div className="pp-input-wrap">
                      <span className="pp-input-ico"><Phone size={16}/></span>
                      <input name="phone" value={profileForm.phone} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="pp-input" placeholder="+91 98765 43210" type="tel"/>
                    </div>
                  </div>
                  <div className="pp-field">
                    <label className="pp-label">Email Address</label>
                    <input value={user?.email || ''} className="pp-input no-icon" disabled style={{ opacity:.6, cursor:'not-allowed', background:'#f3f4f6' }}/>
                    <div style={{ fontSize:'.72rem', color:'#9ca3af', marginTop:4 }}>Email cannot be changed after registration</div>
                  </div>
                  <div className="pp-field">
                    <label className="pp-label">Account Role</label>
                    <input value={user?.role === 'user' ? 'Property Seeker' : user?.role === 'owner' ? 'Property Owner' : 'Administrator'} className="pp-input no-icon" disabled style={{ opacity:.6, cursor:'not-allowed', background:'#f3f4f6' }}/>
                  </div>
                  <button type="submit" disabled={profileLoading} className="pp-submit">
                    {profileLoading ? <><div className="pp-spin"/> Saving…</> : <><Save size={16}/> Save Changes</>}
                  </button>
                </form>
              )}
              {tab === 'password' && (
                <form onSubmit={handlePwSubmit}>
                  {pwSuccess && <div className="pp-success"><CheckCircle size={16}/> Password changed successfully!</div>}
                  {pwError && <div className="pp-error"><AlertTriangle size={15} style={{ flexShrink:0, marginTop:1 }}/>{pwError}</div>}
                  <div className="pp-field">
                    <label className="pp-label">Current Password *</label>
                    <div className="pp-input-wrap">
                      <span className="pp-input-ico"><Lock size={16}/></span>
                      <input name="currentPassword" type={showCurrent ? 'text' : 'password'} value={pwForm.currentPassword} onChange={e => { setPwForm(p => ({ ...p, currentPassword: e.target.value })); setPwError(''); }} className="pp-input" placeholder="Enter your current password" required style={{ paddingRight:42 }}/>
                      <button type="button" className="pp-eye" onClick={() => setShowCurrent(p => !p)}>{showCurrent ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                    </div>
                  </div>
                  <div className="pp-field">
                    <label className="pp-label">New Password *</label>
                    <div className="pp-input-wrap">
                      <span className="pp-input-ico"><Lock size={16}/></span>
                      <input name="newPassword" type={showNew ? 'text' : 'password'} value={pwForm.newPassword} onChange={e => { setPwForm(p => ({ ...p, newPassword: e.target.value })); setPwError(''); }} className="pp-input" placeholder="Create a strong password" required style={{ paddingRight:42 }}/>
                      <button type="button" className="pp-eye" onClick={() => setShowNew(p => !p)}>{showNew ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                    </div>
                    {pwForm.newPassword && strength && (
                      <>
                        <div className="pp-strength-bar"><div className="pp-strength-fill" style={{ width:`${strength.pct}%`, background:strength.color }}/></div>
                        <div className="pp-strength-label" style={{ color:strength.color }}>{strength.label} password</div>
                      </>
                    )}
                    <div className="pp-rules">
                      {[
                        { ok: pwForm.newPassword.length >= 8,          text: 'At least 8 characters' },
                        { ok: /[A-Z]/.test(pwForm.newPassword),        text: 'One uppercase letter' },
                        { ok: /[0-9]/.test(pwForm.newPassword),        text: 'One number' },
                        { ok: /[^A-Za-z0-9]/.test(pwForm.newPassword), text: 'One special character' },
                      ].map(r => (
                        <div key={r.text} className={`pp-rule ${r.ok ? 'ok' : ''}`}><div className="pp-rule-dot"/>{r.text}</div>
                      ))}
                    </div>
                  </div>
                  <div className="pp-field">
                    <label className="pp-label">Confirm New Password *</label>
                    <div className="pp-input-wrap">
                      <span className="pp-input-ico"><Lock size={16}/></span>
                      <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={pwForm.confirmPassword} onChange={e => { setPwForm(p => ({ ...p, confirmPassword: e.target.value })); setPwError(''); }} className="pp-input" placeholder="Repeat your new password" required style={{ paddingRight:42 }}/>
                      <button type="button" className="pp-eye" onClick={() => setShowConfirm(p => !p)}>{showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                    </div>
                    {pwForm.confirmPassword && (
                      <div style={{ fontSize:'.75rem', fontWeight:600, marginTop:5, color: pwForm.newPassword === pwForm.confirmPassword ? '#059669' : '#dc2626', display:'flex', alignItems:'center', gap:5 }}>
                        {pwForm.newPassword === pwForm.confirmPassword ? <><CheckCircle size={13}/> Passwords match</> : <><AlertTriangle size={13}/> Passwords do not match</>}
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={pwLoading || pwForm.newPassword !== pwForm.confirmPassword} className="pp-submit">
                    {pwLoading ? <><div className="pp-spin"/> Changing…</> : <><Shield size={16}/> Change Password</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}