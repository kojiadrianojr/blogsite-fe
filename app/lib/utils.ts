export const compareDates = (
  arg1: {[key:string]: any},
  arg2: {[key:string]: any}
) => {
  const date1: any = new Date(arg1.created);
  const date2: any = new Date(arg2.created);
  
  return date1 - date2;
}


export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
  } else {
      return text;
  }
}
