import type { Dog } from '../../utils/dogApi'
import './index.scss'

type MainImageProps = {
  dog: Dog
}

export default function MainImage({ dog }: MainImageProps) {
  return (
    <div className="image-wrapper">
      <img src={dog.url} alt={dog.breed} className="main-image" />
      <div className="image-caption">{dog.breed}</div>
    </div>
  )
}
