export const useBeforeLeave = (onBefore) => {
  const handle = (event) => {
    const { clientY } = event;
    if (clientY <= 0) { //위로 나갈때만 작동
      onBefore();
    }
  };

  useEffect(() => {
    if (typeof onBefore !== "function") {
      return;
    }

    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
};
