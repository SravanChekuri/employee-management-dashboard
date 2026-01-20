import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const showLoading = (msg = "Loading...") => setLoading(msg);
  const hideLoading = () => setLoading(false);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2000);
  };

  const showConfirm = (message, onConfirm) => {
    setConfirm({ message, onConfirm });
  };

  const closeConfirm = () => setConfirm(null);

  return (
    <UIContext.Provider
      value={{
        loading,
        popup,
        confirm,
        showLoading,
        hideLoading,
        showPopup,
        showConfirm,
        closeConfirm,
      }}
    >
      {children}

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-white">
          {loading}
        </div>
      )}

      {popup && (
        <div
          className={`fixed bottom-6 right-6 text-white px-4 py-2 rounded ${
            popup.type === "success"
              ? "bg-green-600"
              : popup.type === "error"
                ? "bg-red-600"
                : "bg-blue-600"
          }`}
        >
          {popup.message}
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <p className="mb-4">{confirm.message}</p>
            <div className="flex justify-end gap-3">
              <button onClick={closeConfirm}>Cancel</button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  confirm.onConfirm();
                  closeConfirm();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useUI = () => useContext(UIContext);
