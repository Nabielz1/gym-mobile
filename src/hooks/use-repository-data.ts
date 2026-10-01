import { useEffect, useState } from 'react';

export function useRepositoryData<T>(loader: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    loader().then((value) => { if (active) setData(value); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [loader]);
  return { data, loading };
}
