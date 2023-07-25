import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Error from './Error'


it('Renders the 404 text on the page', () => {
    // Step 1: gather mocks

    // Step 2: Render the component
    render(<Error />)

    // Step 3: Find any elements we are testing
    const errorElement = screen.getByText('404 - No Page found!')

    // Step 4: Make assertions about the element you found
    expect(errorElement).toBeInTheDocument()
})