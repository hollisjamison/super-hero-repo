import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals';
import MockParentElement from './Search.mocks'

it('Renders an put box', () => {
    // Step 1: Gather any mock data

    // Step 2: Render the component
    render(<MockParentElement/>)

    // Step 3: Find any elements we are testing
    const inputElement = screen.getByRole('textbox')

    // Step 4: Manipulate the element with our test data

    // Step 5: Make assetions about the element or expected output data
    expect(inputElement).toBeInTheDocument()
})

it('changes values when typed in', () => {
    // Step 1: gather mock data
    let testEvent = { target: { value: "spider-man" } }

    // Step 2: render the component
    render(<MockParentElement/>)

    // Step 3: Find any elements we are testing
    const inputElement = screen.getByRole('textbox')

    // Step 4: Manipulate the element with our test data
    fireEvent.change(inputElement, testEvent )

    // Step 5: Make assertions about the element
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.value).toEqual('spider-man')
})