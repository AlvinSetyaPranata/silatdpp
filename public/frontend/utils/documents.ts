import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function exportAsPdf(data) {

    if (Object.keys(data[0]).length == 0) return

    const doc = new jsPDF();

    // Title for the PDF
    doc.text('Employee List', 14, 10);

    // Extract table headers and rows
    const tableColumn = Object.keys(data[0]).map(col => col);
    const tableRows = data.map(item => Object.values(item));

    // console.log(tableRows)
    // return 

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        headStyles: {
            cellWidth: 'wrap'
        }
    });


    // Save the PDF
    doc.save('table_data.pdf');
}


function exportAsCsv(data) {
    const csvContent =
    'data:text/csv;charset=utf-8,' +
    [
      Object.keys(data[0]).join(','), // Add headers
      ...data.map(row => Object.values(row).join(',')), // Add rows
    ].join('\n');

    const link = document.createElement("a")
    link.href = encodeURI(csvContent)
    link.download = "data.csv"
    link.click()
}


export function exportDocument(type, data) {
    if (type == "pdf") {
        exportAsPdf(data)
    } else if (type == "csv") {
        exportAsCsv(data)
    }
}