import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReceipt = (order) => {
  const doc = new jsPDF();

  /* ===== HEADER ===== */
  doc.setFontSize(18);
  doc.text("ShoeVerse - Order Receipt", 14, 20);

  doc.setFontSize(11);
  doc.text(`Order ID: ${order.orderId}`, 14, 30);
  doc.text(`Payment ID: ${order.paymentId}`, 14, 36);
  doc.text(
    `Date: ${new Date(order.createdAt).toLocaleString()}`,
    14,
    42
  );

  doc.text(`Payment Status: ${order.paymentStatus}`, 14, 48);
  doc.text(`Total Amount: ₹${order.amount}`, 14, 54);

  /* ===== PRODUCTS TABLE ===== */
  const tableColumn = ["Product Name", "Price", "Quantity", "Total"];
  const tableRows = [];

  order.products.forEach((item) => {
    tableRows.push([
      item.name,
      `₹${item.price}`,
      item.quantity,
      `₹${item.price * item.quantity}`,
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 65,
    theme: "grid",
    headStyles: { fillColor: [15, 23, 42] },
  });

  /* ===== FOOTER ===== */
  const finalY = doc.lastAutoTable.finalY || 90;

  doc.setFontSize(10);
  doc.text(
    "Thank you for shopping with ShoeVerse!",
    14,
    finalY + 15
  );

  doc.text(
    "This is a system-generated invoice. No signature required.",
    14,
    finalY + 22
  );

  /* ===== SAVE PDF ===== */
  doc.save(`order_${order.orderId}.pdf`);
};

export default DownloadReceipt;

