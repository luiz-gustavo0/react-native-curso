export function formateDate(date) {
  const dateFormated = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return dateFormated;
}
