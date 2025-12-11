import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Favorites from './index'

const dogs = [
  {
    url: 'https://images.dog.ceo/breeds/hound/n02089973_1006.jpg',
    breed: 'Hound',
  },
  {
    url: 'https://images.dog.ceo/breeds/poodle-miniature/n02113712_1234.jpg',
    breed: 'Miniature Poodle',
  },
]

describe('Favorites', () => {
  it('renders list items with names', () => {
    render(<Favorites items={dogs} onRemove={() => {}} />)
    expect(screen.getByText('Hound')).toBeInTheDocument()
    expect(screen.getByText('Miniature Poodle')).toBeInTheDocument()
  })

  it('removes a favorite when remove control is clicked', () => {
    const onRemove = vi.fn()
    render(<Favorites items={dogs} onRemove={onRemove} />)
    const remove = screen.getByLabelText(/Remove Hound from favorites/i)
    fireEvent.click(remove)
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith(dogs[0])
  })
})
