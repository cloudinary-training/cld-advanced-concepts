const addDays = days => {
  const currentDate = new Date()
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + days)
}
const oneweekfromtoday = addDays(7).toISOString()
console.log('oneweekfromtoday', oneweekfromtoday)
