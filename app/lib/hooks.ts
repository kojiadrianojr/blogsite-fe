export const compareDates = (
  arg1: {[key:string]: string},
  arg2: {[key:string]: string}
) => {
  const date1: any = new Date(arg1.dateCreated);
  const date2: any = new Date(arg2.dateCreated);
  
  return date1 - date2;
}