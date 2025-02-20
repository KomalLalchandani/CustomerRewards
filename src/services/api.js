// api.js - Simulated API call
export const fetchTransactions = async (cb) => {
  try {
    const response = await fetch("../public/dataset.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    cb({ type: "success", data });
  } catch (error) {
    cb({ type: "error", error: error.message });
  }
};
