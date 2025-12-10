import { useEffect, useMemo, useState } from 'react'
import { fetchRandomDogs } from '../../utils/dogApi'
import type { Dog } from '../../utils/dogApi'
import MainImage from '../../components/MainImage'
import Thumb from '../../components/Thumb'
import Favorites from '../../components/Favorites'
import './index.scss'

export default function DogViewer() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Dog[]>([])

  useEffect(() => {
    let isCancelled = false
    const load = async () => {
      setIsLoading(true)
      setErrorMessage(null)
      try {
        const loaded = await fetchRandomDogs(10)
        if (!isCancelled) {
          setDogs(loaded)
          setSelectedIndex(0)
        }
      } catch {
        if (!isCancelled) {
          setErrorMessage('Failed to load dogs. Please try again.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }
    load()
    return () => {
      isCancelled = true
    }
  }, [])

  const selectedDog = useMemo(() => dogs[selectedIndex], [dogs, selectedIndex])

  const handleAddFavorite = () => {
    if (!selectedDog) return
    setFavorites(prev =>
      prev.some(d => d.url === selectedDog.url) ? prev : [...prev, selectedDog],
    )
  }

  const handleRemoveFavorite = (dog: Dog) => {
    setFavorites(prev => prev.filter(d => d.url !== dog.url))
  }

  return (
    <div className="container">
      <h1>Dog Viewer</h1>
      {isLoading ? (
        <div className="status">Loading random dogs…</div>
      ) : errorMessage ? (
        <div className="status error">{errorMessage}</div>
      ) : (
        <div className="wrapper">
          <div className="main-content">
            <div className="main-image-container">
              <MainImage dog={selectedDog} />
              <div className="btn-favorite">
                <button onClick={handleAddFavorite}>Add to favorites</button>
              </div>
            </div>
            <div
              className="thumbs-container"
              aria-label="Random dog thumbnails"
            >
              {dogs.map((dog, index) => (
                <Thumb
                  key={dog.url}
                  dog={dog}
                  isActive={index === selectedIndex}
                  onSelect={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="favorites-content">
            <Favorites items={favorites} onRemove={handleRemoveFavorite} />
          </div>
        </div>
      )}
    </div>
  )
}
