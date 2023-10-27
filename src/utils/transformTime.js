export default function transformTime(value) {
  const hours = Math.floor(value/60)
  const minutes = value - hours * 60
  return(hours + 'ч ' + minutes + 'м')
}