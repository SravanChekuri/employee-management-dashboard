const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const handlePrint = (emp) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>Employee</title></head>
        <body>
          <h2>Employee Details</h2>
          <p><b>ID:</b> ${emp.id}</p>
          <p><b>Name:</b> ${emp.fullName}</p>
          <p><b>Gender:</b> ${emp.gender}</p>
          <p><b>DOB:</b> ${emp.dob}</p>
          <p><b>State:</b> ${emp.state}</p>
          <p><b>Status:</b> ${emp.active ? "Active" : "Inactive"}</p>
          ${emp.image ? `<img src="${emp.image}" width="120" />` : ""}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3">Profile</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">DOB</th>
            <th className="px-4 py-3">State</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No employees found
              </td>
            </tr>
          )}

          {employees.map((e) => (
            <tr key={e.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3">{e.id}</td>

              <td className="px-4 py-3">
                {e.image ? (
                  <img
                    src={e.image}
                    className="w-10 h-10 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs mx-auto">
                    N/A
                  </div>
                )}
              </td>

              <td className="px-4 py-3 font-medium">{e.fullName}</td>

              <td className="px-4 py-3">{e.gender}</td>
              <td className="px-4 py-3">{e.dob}</td>
              <td className="px-4 py-3">{e.state}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    e.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e.active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-3 text-right space-x-3">
                <button
                  onClick={() => onEdit(e)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handlePrint(e)}
                  className="text-gray-600 hover:underline"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
