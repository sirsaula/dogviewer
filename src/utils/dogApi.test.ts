import { describe, it, expect } from 'vitest'
import { extractBreedName } from './dogApi'

describe('extractBreedName', () => {
  it('extracts simple breed names', () => {
    expect(
      extractBreedName('https://images.dog.ceo/breeds/hound/n02089973_1006.jpg'),
    ).toBe('Hound')
  })

  it('formats sub-breeds as "Subbreed Breed"', () => {
    expect(
      extractBreedName(
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      ),
    ).toBe('Afghan Hound')
    expect(
      extractBreedName(
        'https://images.dog.ceo/breeds/poodle-miniature/n02113712_1234.jpg',
      ),
    ).toBe('Miniature Poodle')
  })

  it('handles unexpected urls gracefully', () => {
    expect(extractBreedName('https://example.com/unknown.jpg')).toBe('Unknown')
    expect(extractBreedName('')).toBe('Unknown')
  })
})


