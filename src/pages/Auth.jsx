import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email first.");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
      setForgotPassword(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-surface-container-low">
      <div className="bg-white rounded-3xl border border-outline-variant shadow-sm w-full max-w-[400px] p-10">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-on-surface mb-2">Welcome Back</h1>
          <p className="text-sm font-bold text-outline">Login to access your engineer kits</p>
        </div>

        <form className="space-y-6" onSubmit={forgotPassword ? handleResetPassword : handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-sm"
            />
          </div>
          
          {!forgotPassword && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-sm"
              />
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={() => setForgotPassword(!forgotPassword)}
              className="text-xs font-black text-primary hover:underline"
            >
              {forgotPassword ? 'Back to Login' : 'Forgot Password?'}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-secondary h-14 text-lg disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : (forgotPassword ? 'SEND RESET LINK' : 'LOGIN')}
          </button>
        </form>


        <div className="mt-10 pt-8 border-t border-outline-variant/30 text-center">
          <p className="text-sm font-bold text-outline">
            New user? <NavLink to="/signup" className="text-primary hover:underline">Create Account</NavLink>
          </p>
        </div>
      </div>
    </main>
  );
};

export const Signup = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: Password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate and send code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);

    try {
      // In a real app, you'd use EmailJS or a Cloud Function here
      console.log("Verification Code:", code);
      
      // Mock sending for now if keys are missing
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        // emailjs.send(...) logic will go here
        alert(`A verification code has been sent to ${email}`);
      } else {
        alert(`DEVELOPER NOTE: Verification code is ${code} (Set up EmailJS keys in .env to send real emails)`);
      }
      
      setStep(2);
    } catch (error) {
      alert("Failed to send code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    const enteredCode = userInputCode.join('');
    if (enteredCode === verificationCode) {
      setStep(3);
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  // Final signup
  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...userInputCode];
    newCode[index] = value;
    setUserInputCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4 bg-surface-container-low">
      <div className="bg-white rounded-3xl border border-outline-variant shadow-sm w-full max-w-[400px] p-10">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-on-surface mb-2">
            {step === 1 && "Create Account"}
            {step === 2 && "Verify Email"}
            {step === 3 && "Secure Account"}
          </h1>
          <p className="text-sm font-bold text-outline">
            {step === 1 && "Join the innovation community"}
            {step === 2 && `Enter the 6-digit code sent to ${email}`}
            {step === 3 && "Set a strong password for your account"}
          </p>
        </div>

        {/* STEP 1: Name & Email */}
        {step === 1 && (
          <form className="space-y-6" onSubmit={handleSendCode}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com" 
                className="w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-sm"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-secondary h-14 text-lg">
              {loading ? 'SENDING...' : 'SEND VERIFICATION CODE'}
            </button>
          </form>
        )}

        {/* STEP 2: Verification Code */}
        {step === 2 && (
          <form className="space-y-8" onSubmit={handleVerifyCode}>
            <div className="flex justify-between gap-2">
              {userInputCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-black rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                />
              ))}
            </div>
            <div className="space-y-4">
              <button type="submit" className="w-full btn-secondary h-14 text-lg">
                VERIFY CODE
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-black text-outline hover:text-primary transition-colors">
                CHANGE EMAIL
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Password */}
        {step === 3 && (
          <form className="space-y-6" onSubmit={handleFinalSignup}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Create Password</label>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full h-14 px-5 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold text-sm"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-secondary h-14 text-lg">
              {loading ? 'CREATING ACCOUNT...' : 'FINISH SIGNUP'}
            </button>
          </form>
        )}

        <div className="mt-10 pt-8 border-t border-outline-variant/30 text-center">
          <p className="text-sm font-bold text-outline">
            Already have an account? <NavLink to="/login" className="text-primary hover:underline">Login</NavLink>
          </p>
        </div>
      </div>
    </main>
  );
};

