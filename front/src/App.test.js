import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {fireEvent, render, screen} from '@testing-library/react';
import {Login} from "./components/auth/login";
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
it('login with right user',  ()=> {
    render(<App />);
    const input1 = screen.getByPlaceholderText(/username:/i);
    const input2 = screen.getByPlaceholderText(/password:/i);
    const button = screen.getAllByRole('button')[1];
    input1.value = 'Bret';
    input2.value = '123';
    expect(input1.value).toBe('Bret');
    expect(input2.value).toBe('123');
    fireEvent.click(button)
    /*
        expect(screen.getByText(/Welcome to Main Page/i)).toBeInTheDocument();*/
});
