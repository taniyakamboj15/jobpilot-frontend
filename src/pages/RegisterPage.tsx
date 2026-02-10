import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';
import { Input, Button } from '../components/FormElements';
import { AuthLayout } from '../components/layout/AuthLayout';

import { registerSchema } from '../schemas/auth.schema';
import type { RegisterFormData } from '../types/auth.types';
import { APP_ROUTES } from '../constants';

const RegisterPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setError(null);
        try {
            const { name, email, password } = data;
            const response = await authService.register({ name, email, password });
            login(response.data.user);
            navigate(APP_ROUTES.DASHBOARD);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join thousands of job seekers"
        >
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-100">
                    {error}
                </div>
            )}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register('name')}
                />
                <Input
                    label="Email address"
                    type="email"
                    placeholder="name@company.com"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password')}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />

                <Button type="submit" className="w-full h-11 text-base mt-2" isLoading={loading}>
                    Create account
                </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to={APP_ROUTES.LOGIN} className="font-medium text-primary-600 hover:text-primary-500">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default RegisterPage;
