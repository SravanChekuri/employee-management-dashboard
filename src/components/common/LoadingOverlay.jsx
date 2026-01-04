import { useUI } from "../../context/UIContext";

const LoadingOverlay = () => {
  const { loading } = useUI();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white px-6 py-4 rounded-lg shadow text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3" />
        <p className="text-sm font-medium">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
