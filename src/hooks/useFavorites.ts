import { useEffect, useState } from "react";

export function useFavorites(storageKey: string) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const toggleFavorite = (code: string) => {
    setFavorites((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  const isFav = (code: string) => favorites.includes(code);

  return { favorites, toggleFavorite, isFav };
}
