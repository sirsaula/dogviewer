import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Thumb from './index'

const sampleDog = {
  url: 'https://images.dog.ceo/breeds/hound/n02089973_1006.jpg',
  breed: 'Hound',
}

describe('Thumb', () => {
  it('renders image and caption', () => {
    render(<Thumb dog={sampleDog} isActive={false} onSelect={() => {}} />)
    expect(screen.getByAltText('Hound')).toBeInTheDocument()
    expect(screen.getByText('Hound')).toBeInTheDocument()
  })

  it('applies active class when isActive is true', () => {
    render(<Thumb dog={sampleDog} isActive={true} onSelect={() => {}} />)
    const button = screen.getByRole('button', { name: /show hound/i })
    expect(button.className).toMatch(/active/)
  })

  it('calls onSelect on click', () => {
    const onSelect = vi.fn()
    render(<Thumb dog={sampleDog} isActive={false} onSelect={onSelect} />)
    const button = screen.getByRole('button', { name: /show hound/i })
    fireEvent.click(button)
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
