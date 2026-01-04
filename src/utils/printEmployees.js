export const printEmployees = (employees) => {
  const win = window.open("", "_blank");

  const rows = employees
    .map(
      (e) => `
        <tr>
          <td>${e.id}</td>
          <td>${e.fullName}</td>
          <td>${e.gender}</td>
          <td>${e.dob}</td>
          <td>${e.state}</td>
          <td>${e.active ? "Active" : "Inactive"}</td>
        </tr>
      `
    )
    .join("");

  win.document.write(`
    <html>
      <head>
        <title>Employee List</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2 { margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows || `<tr><td colspan="6">No data</td></tr>`}
          </tbody>
        </table>
      </body>
    </html>
  `);

  win.document.close();
  win.print();
};
