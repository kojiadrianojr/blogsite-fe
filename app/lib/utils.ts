export const compareDates = (
  arg1: { [key: string]: any },
  arg2: { [key: string]: any }
) => {
  const date1: any = new Date(arg1.created);
  const date2: any = new Date(arg2.created);

  return date1 - date2;
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + "...";
  } else {
    return text;
  }
}

export function getUserConfirmation() {
  return new Promise((resolve, reject) => {
    const userResponse = confirm("Do you agree");
    if (userResponse) {
      resolve("User agreed!");
    } else {
      reject(new Error("User disagreed!"));
    }
  });
}

export const handleErrors = (error: any) => {
  return Object.values(error).join(",").split(",")[0];
};

export const isImage = async(url:string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      return contentType?.startsWith('image/');
    }
    return false;
  } catch (error) {
    console.error('Error verifying image:', error);
    return false;
  }
}