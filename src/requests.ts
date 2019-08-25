export const calculateItemPrice = (
  id: string,
  quantity: number
): Promise<number> => {
  const url = `/alpha/items/${id}/calculate-price`;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ quantity })
  })
    .then(res => res.text())
    .then(text => parseFloat(text));
};
