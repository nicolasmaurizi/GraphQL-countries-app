import type { Country } from "../graphql/countries";

interface CountryModalProps {
	country: Country;
	isFavorite: boolean;
	onClose: () => void;
	onToggleFavorite: () => void;
}

export function CountryModal({
	country,
	isFavorite,
	onClose,
	onToggleFavorite,
}: CountryModalProps) {
	return (
		<div
			className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-5"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-start justify-between gap-3 mb-3">
					<div className="flex items-center gap-3">
						<img
							src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
							alt={country.name}
							className="w-8 h-6 rounded shadow-sm object-cover"
						/>

						<div>
							<h3 className="font-bold text-lg text-slate-900">
								{country.name}
							</h3>
							<p className="text-xs text-slate-500">Code: {country.code}</p>
						</div>
					</div>
					<button
						className="text-slate-400 hover:text-slate-600 text-xl"
						onClick={onClose}
					>
						×
					</button>
				</div>

				<div className="space-y-1 text-sm text-slate-700 mb-3">
					{country.capital && (
						<p>
							<span className="font-semibold">Capital: </span>
							{country.capital}
						</p>
					)}
					{country.currency && (
						<p>
							<span className="font-semibold">Currency: </span>
							{country.currency}
						</p>
					)}
					{country.languages?.length > 0 && (
						<p>
							<span className="font-semibold">Languages: </span>
							{country.languages
								.map((l) => l.name)
								.filter(Boolean)
								.join(", ")}
						</p>
					)}
				</div>

				<div className="flex justify-end gap-2 mt-2">
					<button
						className="px-3 py-1.5 text-xs rounded-full border border-slate-200 text-slate-600"
						onClick={onClose}
					>
						Close
					</button>
					<button
						className="px-3 py-1.5 text-xs rounded-full bg-blue-600 text-white"
						onClick={onToggleFavorite}
					>
						{isFavorite ? "Remove from favorites" : "Add to favorites"}
					</button>
				</div>
			</div>
		</div>
	);
}
