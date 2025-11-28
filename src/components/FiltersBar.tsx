import type { Continent } from "../graphql/countries";

interface FiltersBarProps {
  continents: Continent[];
  selectedContinent: string;
  onContinentChange: (code: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  loadingContinents: boolean;
  hasContinentsError: boolean;
}

export function FiltersBar({
  continents,
  selectedContinent,
  onContinentChange,
  search,
  onSearchChange,
  favoritesCount,
  loadingContinents,
  hasContinentsError,
}: FiltersBarProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
      <div className="flex-1">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Continent
        </label>
        {loadingContinents && (
          <p className="text-sm text-slate-500">Loading continents…</p>
        )}
        {hasContinentsError && (
          <p className="text-sm text-red-500">
            Error loading continents.
          </p>
        )}
        {!loadingContinents && !hasContinentsError && (
          <select
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedContinent}
            onChange={(e) => onContinentChange(e.target.value)}
          >
            <option value="">Select a continent</option>
            {continents.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Search country by name
        </label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Argentina, Brazil, Chile…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start gap-1 text-xs text-slate-500 md:w-40">
        <span className="font-semibold text-slate-700">
          Favorites: {favoritesCount}
        </span>
        <span>Stored in localStorage.</span>
      </div>
    </section>
  );
}
