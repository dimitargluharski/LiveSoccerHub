export const calculateForm = (params: string) => {
  console.log(params);

  let win = 0;
  let draw = 0;
  let lose = 0;

  const splittedString = params.split('');

  if (splittedString.length === 0) return;

  for (let i = 0; i < splittedString.length; i++) {
    if (splittedString[i].toLowerCase() === 'w') {
      win++;
    } else if (splittedString[i].toLowerCase() === 'l') {
      lose++;
    } else if (splittedString[i].toLowerCase() === 'd') {
      draw++;
    }
  }

  console.log(win, draw, lose);
  return `${win} W ${draw} D ${lose} L`;
}