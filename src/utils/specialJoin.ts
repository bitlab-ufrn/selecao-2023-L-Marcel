export function specialJoin(
  array: string[], 
  joinAtLast: string = " e ", 
  join: string = ", "
) {
  if(array.length < 2) {
    return array.join(join);
  };

  const lastItem = array[array.length - 1];
  array.pop();

  return array.join(join) + joinAtLast + lastItem
};