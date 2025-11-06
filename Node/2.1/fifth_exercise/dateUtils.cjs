function getCurrentDate() {
  return new Date();
}

function getFormattedDate() {
  const now = new Date();
  return `${now.getFullYear()}- ${now.getMonth()+1}- ${now.getDate()}`
 }

 module.exports={
  getCurrentDate,getFormattedDate
 }