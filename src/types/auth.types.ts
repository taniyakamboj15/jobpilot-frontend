export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface AuthContextType extends AuthState {
    login: (user: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
}

export type LoginFormData = LoginCredentials;
export type RegisterFormData = RegisterData & {
    confirmPassword: string;
};

export interface ResetPasswordData {
    token: string;
    newPassword: string;
}
