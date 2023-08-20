export const useInput = (initialVlaue, validator) => {
  const [value, setValue] = useState(initialVlaue);
  const onChange = event => {
    const {
      target: { value }
    } = event;

    let willUpdate = true;

    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  }
  return { value, onChange };
};
