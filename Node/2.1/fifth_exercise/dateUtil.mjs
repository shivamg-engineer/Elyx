export function getCurrentDate() {
  return new Date();
}

export function getFormattedDate() {

    const now= new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}