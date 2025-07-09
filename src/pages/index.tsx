import { useRouter } from 'next/router';
import { FormEvent, useState,useEffect } from 'react';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        router.replace('/dashboard');
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === 'admin@yopmail.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true'); 
      router.push('/dashboard');
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };
  if (isCheckingAuth) return null;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        {errorMsg && (
          <p className="text-red-500 text-center text-sm mb-4">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-3 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-3 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
