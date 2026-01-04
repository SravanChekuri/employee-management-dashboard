const Popup = ({ popup }) => {
  if (!popup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`px-4 py-2 rounded text-white shadow-lg ${
          popup.type === "success"
            ? "bg-green-600"
            : popup.type === "error"
            ? "bg-red-600"
            : "bg-blue-600"
        }`}
      >
        {popup.message}
      </div>
    </div>
  );
};

export default Popup;
