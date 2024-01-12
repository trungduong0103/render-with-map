import { useState, useCallback } from "react";

export interface Actions<K, V> {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  delete: (key: K) => void;
  clear: () => void;
}

type Return<K, V> = [Map<K, V>, Actions<K, V>];

// Test immutability with actions.set

export const useMap = <K, V>(
  initialValue?: Iterable<readonly [K, V]>
): Return<K, V> => {
  const [map, setMap] = useState<Map<K, V>>(() => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  });

  const actions: Actions<K, V> = {
    get: useCallback((key) => map.get(key), [map]),

    set: useCallback((key, value) => {
      setMap((prev) => {
        prev.set(key, value);
        return new Map(prev);
      });
    }, []),

    delete: useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),

    clear: useCallback(() => {
      setMap(() => new Map());
    }, [])
  };

  return [map, actions];
};
