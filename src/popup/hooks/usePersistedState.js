import React from "react";

const usePersistedState = (name, defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);
  const nameRef = React.useRef(name);

  React.useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) setValue(JSON.parse(storedValue));
      else localStorage.setItem(name, JSON.stringify(defaultValue));
    } catch {
      setValue(defaultValue);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(nameRef.current, JSON.stringify(value));
    } catch {}
  }, [value]);

  React.useEffect(() => {
    const lastName = nameRef.current;
    if (name !== lastName) {
      try {
        localStorage.setItem(name, JSON.stringify(value));
        nameRef.current = name;
        localStorage.removeItem(lastName);
      } catch {}
    }
  }, [name]);

  return [value, setValue];
};

export default usePersistedState;
