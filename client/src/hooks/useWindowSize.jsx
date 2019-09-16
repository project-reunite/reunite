import { useRef, useEffect, useState } from 'react';

const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const isClient = typeof window === 'object';
  const frame = useRef(0);
  const [state, setState] = useState({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        });
      };

      window.addEventListener('resize', handler);

      return () => {
        cancelAnimationFrame(frame.current);

        window.removeEventListener('resize', handler);
      };
    }
    return undefined;
  }, [isClient]);

  return state;
};

export default useWindowSize;
