import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect } from '@jest/globals';
import MockHeroesList from './SuperheroList.mocks'

test('Renders the unordered list', () => {
    render(<MockHeroesList/>)

    const listElement = screen.getByRole('list')

    expect(listElement).toBeInTheDocument()
})

test('Finds the two heroes in the mock data', () => {
    render(<MockHeroesList/>)

    const listItemElements = screen.getAllByRole('listitem')

    expect(listItemElements).toHaveLength(2)
})

test('It displays the heroes correctly', () => {
    render(<MockHeroesList/>)

    const capAmericaEl = screen.getByText('Captain America')
    const spiderManEl = screen.getByText('Spider-Man')

    expect(capAmericaEl).toBeInTheDocument()
    expect(spiderManEl).toBeInTheDocument()
})