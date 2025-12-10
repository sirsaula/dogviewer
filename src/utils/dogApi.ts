import axios from 'axios'

export type Dog = {
  url: string
  breed: string
}

export function extractBreedName(imageUrl: string): string {
  try {
    const afterBreeds = imageUrl.split('/breeds/')[1]
    if (!afterBreeds) return 'Unknown'
    const segment = afterBreeds.split('/')[0] || ''
    const parts = segment.split('-').filter(Boolean)
    const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)
    if (parts.length === 0) return 'Unknown'
    const [breed, ...sub] = parts
    return sub.length > 0
      ? `${sub.map(capitalize).join(' ')} ${capitalize(breed)}`
      : capitalize(breed)
  } catch {
    return 'Unknown'
  }
}

export async function fetchRandomDogImageUrls(
  count: number = 10,
): Promise<string[]> {
  const { data } = await axios.get<{ message: string[] }>(
    `https://dog.ceo/api/breeds/image/random/${count}`,
  )
  return data?.message ?? []
}

export async function fetchRandomDogs(count: number = 10): Promise<Dog[]> {
  const urls = await fetchRandomDogImageUrls(count)
  return urls.map((url: string) => ({
    url,
    breed: extractBreedName(url),
  }))
}


