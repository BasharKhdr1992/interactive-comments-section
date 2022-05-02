import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onWindowResize = (e) => {
      setWidth(e.target.innerWidth);
    };

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return { width };
};

export default useWindowSize;
