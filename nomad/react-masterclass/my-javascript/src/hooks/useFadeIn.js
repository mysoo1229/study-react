export const useFadeIn = (duration = .5, delay = 0) => {
  const element = useRef();

  useEffect(() => {
    if (typeof duration !== 'number' || typeof delay !== 'number') {
      return;
    }

    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);

  return {
    ref: element,
    style: {opacity: 0}
  }
};
