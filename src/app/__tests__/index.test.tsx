import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../index';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('Index (Login Screen)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<Index />);

        expect(getByText('Iniciar Sesión')).toBeTruthy();
        expect(getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
        expect(getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    });
});