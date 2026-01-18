export function ProjectsLoadingState() {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-500"></div>
      <p className="mt-4 text-gray-600">Chargement des projets...</p>
    </div>
  );
}
