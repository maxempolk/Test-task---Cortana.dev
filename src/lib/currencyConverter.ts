function usdToUah(amount: number) {
  const exchangeRate = 41.5;
  return amount * exchangeRate;
}

export default usdToUah;