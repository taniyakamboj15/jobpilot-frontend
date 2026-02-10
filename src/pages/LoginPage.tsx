import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';
import { Input, Button } from '../components/FormElements';
import { AuthLayout } from '../components/layout/AuthLayout';

import { loginSchema } from '../schemas/auth.schema';
import type { LoginFormData } from '../types/auth.types';
import { APP_ROUTES } from '../constants';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            login(response.data.user);
            navigate(APP_ROUTES.DASHBOARD);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to track your job journey"
        >
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-100">
                    {error}
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4 rounded-md shadow-sm">
                    <Input
                        label="Email address"
                        type="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                    <Input
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link to="/forgot-password" title="Forgot Password" className="font-medium text-primary-600 hover:text-primary-500">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button type="submit" className="w-full h-11 text-base" isLoading={loading}>
                    Sign in
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                    Start tracking for free
                </Link>
            </p>
        </AuthLayout>
    );
};

export default LoginPage;
