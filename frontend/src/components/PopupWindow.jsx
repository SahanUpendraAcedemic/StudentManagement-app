export default function PopupWindow({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-red-600 hover:bg-red-700",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold text-black mb-4 ">{title}</h2>
        <p className="mb-6 text-black">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="rounded-lg bg-white text-black p-2 px-5 border border-black hover:bg-primary hover:border hover:border-white hover:text-white"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`px-4 py-2 text-white rounded-lg border border-black hover:bg-primary ${confirmColor}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
