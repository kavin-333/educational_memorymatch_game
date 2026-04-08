import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  highScore: number;
  scores: number[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateScore: (score: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (will be replaced with Supabase)
const mockUsers: Record<string, { password: string; data: User }> = {
  demo: {
    password: 'demo123',
    data: {
      id: '1',
      username: 'demo',
      highScore: 0,
      scores: [],
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - will be replaced with Supabase auth
    const mockUser = mockUsers[username];

    if (mockUser && mockUser.password === password) {
      const userData = { ...mockUser.data };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }

    // Auto-create new user for demo purposes
    if (username && password) {
      const newUser: User = {
        id: Date.now().toString(),
        username,
        highScore: 0,
        scores: [],
      };
      mockUsers[username] = { password, data: newUser };
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateScore = (score: number) => {
    if (!user) return;

    const updatedScores = [...user.scores, score];
    const updatedHighScore = Math.max(user.highScore, score);

    const updatedUser = {
      ...user,
      scores: updatedScores,
      highScore: updatedHighScore,
    };

    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update mock database
    if (mockUsers[user.username]) {
      mockUsers[user.username].data = updatedUser;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateScore }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
