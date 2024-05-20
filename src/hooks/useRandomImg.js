import { useState, useEffect } from 'react'
import { LIST_IMAGES } from '../utils/constants/const';
const useRandomImage = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const backgroundImage = () => {
      return Math.floor(Math.random() * LIST_IMAGES.length);
    };
    setImageIndex(backgroundImage());
  }, []);
  return { imageIndex }
}
export default useRandomImage




