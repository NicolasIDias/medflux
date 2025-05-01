export function formatDate(date, isoFormat = true){
  const dateObj = new Date(date)
  return isoFormat ? dateObj.toISOString() : dateObj.toLocaleDateString('pt-BR')
}