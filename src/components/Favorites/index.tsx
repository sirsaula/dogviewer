import './index.scss'
import type { Dog } from '../../utils/dogApi'

type FavoritesProps = {
  items: Dog[]
  onRemove: (dog: Dog) => void
}

export default function Favorites({ items, onRemove }: FavoritesProps) {
  return (
    <div className="favorites-wrapper">
      <h2>Favorites</h2>
      <ul className="favorites-list">
        {items.map(dog => (
          <li key={dog.url} className="favorite-item">
            <img className="favorite-thumb" src={dog.url} alt={dog.breed} />
            <span className="favorite-name">{dog.breed}</span>
            <div
              className="favorite-remove"
              onClick={() => onRemove(dog)}
              aria-label={`Remove ${dog.breed} from favorites`}
            >
              ✕
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
