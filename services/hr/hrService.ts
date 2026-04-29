export async function listLeaveRequests() {
  return [
    { id: "leave-001", employee: "Naledi Dube", type: "Annual", status: "PENDING" },
    { id: "leave-002", employee: "Aviwe Maseko", type: "Sick", status: "APPROVED" },
  ];
}

