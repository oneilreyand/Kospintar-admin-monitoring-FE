function PaletteSwatch({ name, token, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="h-12 w-full rounded-lg border border-gray-200" style={{ backgroundColor: value }} />
      <div className="mt-3 space-y-1">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{token}</p>
        <p className="text-xs text-gray-500">{value}</p>
      </div>
    </div>
  );
}

export default PaletteSwatch;
