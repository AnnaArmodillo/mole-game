import { useEffect, useState } from 'react';

export function useDebounce(time, ms) {
  const [debouncedTimeNow, setDebouncedTimeNow] = useState(time);
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedTimeNow(time);
    }, ms);
    return () => {
      clearTimeout(timeOutID);
    };
  }, [ms, time]);
  return debouncedTimeNow;
}
