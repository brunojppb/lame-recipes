import {useState, useEffect, useCallback, useMemo} from 'react';

export default function useMedia(queries, values, defaultValue) {
  const mediaQueryLists = useMemo(() => {
    return queries.map(q => window.matchMedia(q))
  }, [queries]);

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  }, [mediaQueryLists, values, defaultValue]);

  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [getValue, mediaQueryLists]
  );

  return value;
}