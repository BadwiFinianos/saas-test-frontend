export function DatasetDetailLoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-hyreveal-500"></div>
        <p className="mt-4 text-gray-600">Chargement du dataset...</p>
      </div>
    </div>
  );
}
