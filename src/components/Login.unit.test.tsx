import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Login } from './login';


// test('Button click event should be triggered', () => {
//   const handleClick = jest.fn();
//   const { getByText } = render(
//     <Button onClick={handleClick} label="Click me" />
//   );
//   const button = getByText('Click me');
//   fireEvent.click(button);
//   expect(handleClick).toHaveBeenCalled();
// });


// test('Button click event should be triggered', () => {
//   const handleClick = jest.fn();
//   const { getByText } = render(
//     <Login/>
//   );
//   const button = getByText('Login');
//   fireEvent.click(button);
//   expect(handleClick).toHaveBeenCalled();
// }); 