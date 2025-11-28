import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
	GET_CONTINENTS,
	GET_COUNTRIES_BY_CONTINENT,
} from "./graphql/countries";

import type {
	GetContinentsResponse,
	GetCountriesByContinentResponse,
	Continent,
	Country,
} from "./graphql/countries";

import { useFavorites } from "./hooks/useFavorites";
import { FiltersBar } from "./components/FiltersBar";
import { CountryModal } from "./components/CountryModal";

function App() {
	const [selectedContinent, setSelectedContinent] = useState<string>("SA");
	const [search, setSearch] = useState<string>("");
	const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
	const { favorites, toggleFavorite, isFav } = useFavorites(
		"graphql-countries-favs"
	);

	// Continentes
	const {
		data: continentsData,
		loading: loadingContinents,
		error: continentsError,
	} = useQuery<GetContinentsResponse>(GET_CONTINENTS);

	// Países por continente
	const {
		data: countriesData,
		loading: loadingCountries,
		error: countriesError,
	} = useQuery<GetCountriesByContinentResponse>(GET_COUNTRIES_BY_CONTINENT, {
		variables: { code: selectedContinent },
		skip: !selectedContinent,
	});

	const continents: Continent[] = continentsData?.continents ?? [];
	const countries: Country[] = countriesData?.continent?.countries ?? [];

	const filteredCountries = useMemo(
		() =>
			countries
				.filter((c) =>
					c.name.toLowerCase().includes(search.toLowerCase().trim())
				)
				.sort((a, b) => a.name.localeCompare(b.name)),
		[countries, search]
	);

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			{/* Header */}
			<header className="border-b bg-white">
				<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
					<div>
						<h1 className="text-xl font-bold flex items-center gap-2">
							🌍 GraphQL Countries Explorer
						</h1>
						<p className="text-xs text-slate-500">
							React + TypeScript + Apollo Client + Countries GraphQL API
						</p>
					</div>
					<span className="hidden sm:inline text-xs text-slate-500">
						API: countries.trevorblades.com
					</span>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
				{/* Filtros */}
				<FiltersBar
					continents={continents}
					selectedContinent={selectedContinent}
					onContinentChange={setSelectedContinent}
					search={search}
					onSearchChange={setSearch}
					favoritesCount={favorites.length}
					loadingContinents={loadingContinents}
					hasContinentsError={!!continentsError}
				/>

				{/* Lista de países */}
				<section className="bg-white rounded-2xl shadow-sm p-4 md:p-5">
					{loadingCountries && (
						<p className="text-sm text-slate-500">Loading countries…</p>
					)}
					{countriesError && (
						<p className="text-sm text-red-500">Error loading countries.</p>
					)}

					{!loadingCountries && !countriesError && (
						<>
							<div className="flex items-center justify-between mb-4">
								<div>
									<h2 className="font-semibold text-slate-800">
										Countries in {countriesData?.continent?.name ?? "—"}
									</h2>
									<p className="text-xs text-slate-500">
										Showing {filteredCountries.length} of {countries.length}{" "}
										countries
									</p>
								</div>
							</div>

							{filteredCountries.length === 0 ? (
								<p className="text-sm text-slate-500">
									No countries found. Try another name or continent.
								</p>
							) : (
								<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
									{filteredCountries.map((country) => (
										<article
											key={country.code}
											className="border border-slate-100 rounded-2xl p-3 flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer bg-white"
											onClick={() => setSelectedCountry(country)}
										>
											<div className="flex items-center justify-between">
												<span className="text-3xl">{country.emoji}</span>
												<button
													className="text-lg"
													onClick={(e) => {
														e.stopPropagation();
														toggleFavorite(country.code);
													}}
													title={
														isFav(country.code)
															? "Remove from favorites"
															: "Add to favorites"
													}
												>
													{isFav(country.code) ? "★" : "☆"}
												</button>
											</div>
											<div>
												<h3 className="font-semibold text-sm text-slate-900">
													{country.name}
												</h3>
												{country.capital && (
													<p className="text-xs text-slate-600">
														Capital: {country.capital}
													</p>
												)}
												{country.currency && (
													<p className="text-xs text-slate-600">
														Currency: {country.currency}
													</p>
												)}
											</div>
											{country.languages?.length > 0 && (
												<p className="text-[11px] text-slate-500">
													Languages:{" "}
													{country.languages
														.map((l) => l.name)
														.filter(Boolean)
														.join(", ")}
												</p>
											)}
										</article>
									))}
								</div>
							)}
						</>
					)}
				</section>
			</main>

			{/* Modal detalle país */}
			{selectedCountry && (
				<CountryModal
					country={selectedCountry}
					isFavorite={isFav(selectedCountry.code)}
					onClose={() => setSelectedCountry(null)}
					onToggleFavorite={() => toggleFavorite(selectedCountry.code)}
				/>
			)}
		</div>
	);
}

export default App;
