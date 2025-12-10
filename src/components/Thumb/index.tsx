import './index.scss'
import type { Dog } from '../../utils/dogApi'

type ThumbProps = {
  dog: Dog
  isActive: boolean
  onSelect: () => void
}

export default function Thumb({ dog, isActive, onSelect }: ThumbProps) {
  return (
    <button
      onClick={onSelect}
      aria-label={`Show ${dog.breed}`}
      className={`thumb-container ${isActive ? 'active' : ''}`}
    >
      <img src={dog.url} alt={dog.breed} className="thumb-image" />
      <span className="thumb-caption">{dog.breed}</span>
    </button>
  )
}
