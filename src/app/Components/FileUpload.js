export default function FileUpload({ onFileUpload, label }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileUpload(e.target.files[0])}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}