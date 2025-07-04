export const formatCurrency = (amount: number | null) => {
  const value = (amount || 0) * 85
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value)
  return formattedNumber
}
