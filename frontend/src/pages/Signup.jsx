import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    setError('Email already exists. Please login instead.');
                } else if (response.status === 400) {
                    setError(data.message || 'Invalid input');
                } else {
                    setError('Registration failed. Please try again.');
                }
                setLoading(false);
                return;
            }

            // ✅ SUCCESS: Store token and redirect
            console.log('Registration successful:', data.user);
            
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);
            // // Store token in localStorage
            // localStorage.setItem('token', data.user.token);
            // localStorage.setItem('user', JSON.stringify({
            //     id: data.user.id,
            //     name: data.user.name,
            //     role: data.user.role
            // }));

            // Redirect to dashboard or home page
            navigate('/student/dashboard'); // or wherever you want to redirect

        } catch (error) {
            setError('Network error. Please check your connection.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;