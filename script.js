// Fetching the CSV file
fetch("Table_Input.csv")
  .then((response) => response.text())
  .then((data) => {
    // Splitting the CSV data into rows
    const rows = data.trim().split("\n");

    // Skip the first two lines (A1 and B1)
    const filteredRows = rows.slice(1);

    // Table 1
    const tbody1 = document.getElementById("table-body-1");
    filteredRows.forEach((row) => {
      const columns = row.split(",");
      const tr = document.createElement("tr");
      columns.forEach((column) => {
        const td = document.createElement("td");
        td.textContent = column.trim();
        tr.appendChild(td);
      });
      tbody1.appendChild(tr);
    });

    // Table 2
    const tbody2 = document.getElementById("table-body-2");
    const calculations = [
      { category: "Alpha", expression: "A5 + A20" },
      { category: "Beta", expression: "A15 / A7" },
      { category: "Charlie", expression: "A13 * A12" },
    ];
    calculations.forEach((calc) => {
      const tr = document.createElement("tr");
      const tdCategory = document.createElement("td");
      const tdValue = document.createElement("td");
      tdCategory.textContent = calc.category;
      tdValue.textContent = calculateExpression(calc.expression);
      tr.appendChild(tdCategory);
      tr.appendChild(tdValue);
      tbody2.appendChild(tr);
    });
  })
  .catch((error) => console.error("Error fetching the CSV file:", error));

// Function to calculate expressions for Table 2 based on Table 1 data
function calculateExpression(expression) {
  const regex = /A(\d+)/g;
  let result = expression.replace(regex, (match, group1) => {
    return parseInt(group1);
  });
  // Evaluating arithmetic operations
  result = eval(result);
  return result;
}
