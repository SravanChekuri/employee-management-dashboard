const EmployeeFilters = ({
  search,
  gender,
  status,
  onSearchChange,
  onGenderChange,
  onStatusChange,
  onCreate,
  onPrint,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Gender */}
        <select
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-40"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-40"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Create Button */}
        <div className="md:ml-auto flex gap-2">
          <button
            onClick={onPrint}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Print Results
          </button>
          <button
            onClick={onCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;
