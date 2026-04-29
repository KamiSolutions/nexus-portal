export const subscriptionPlans = [
  { id: "trial", name: "Trial", seats: 25, price: "R0" },
  { id: "growth", name: "Growth", seats: 150, price: "R24,000" },
  { id: "enterprise", name: "Enterprise", seats: 500, price: "Custom" },
];

export async function getBillingOverview() {
  return {
    plan: "enterprise",
    seatsUsed: 290,
    seatsIncluded: 500,
    nextInvoiceAmount: 84000,
  };
}

