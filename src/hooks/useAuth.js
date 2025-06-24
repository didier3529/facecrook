import { useEffect, useState } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = localStorage.getItem('facecrook_user');

                if (!userData) {
                    setUser(null);
                    setError(null);
                    setIsLoading(false);
                    return;
                }

                const parsed = JSON.parse(userData);

                // ✅ Validate all required fields
                if (parsed &&
                    parsed.name &&
                    parsed.identity &&
                    parsed.isLoggedIn === true) {
                    setUser(parsed);
                    setError(null);
                } else {
                    // ✅ Invalid data - clean up
                    localStorage.removeItem('facecrook_user');
                    localStorage.removeItem('facecrook_auth');
                    setUser(null);
                    setError('Invalid user data');
                }
            } catch (err) {
                // ✅ Corrupted data - clean up
                localStorage.removeItem('facecrook_user');
                localStorage.removeItem('facecrook_auth');
                setUser(null);
                setError('Corrupted user data');
                console.error('Auth error:', err);
            } finally {
                // ✅ Always stop loading
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        const newUser = {
            id: `user_${Date.now()}`,
            email: userData.email,
            name: userData.name,
            identity: userData.identity,
            avatar: userData.avatar || {},
            tokenBalance: 1000,
            isLoggedIn: true,
            joinDate: new Date().toISOString()
        };

        localStorage.setItem('facecrook_user', JSON.stringify(newUser));
        localStorage.setItem('facecrook_auth', 'true');
        setUser(newUser);

        return newUser;
    };

    const logout = () => {
        localStorage.removeItem('facecrook_user');
        localStorage.removeItem('facecrook_auth');
        setUser(null);
    };

    return { user, isLoading, error, login, logout };
} 