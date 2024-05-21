import { API_URL } from "../config";
import authActions from "../auth/utils";

const { getToken } = authActions();

type PayloadProps = {
  owner: string;
  title: string;
  description: string
}


const sendPost = async(payload:PayloadProps) => {
  const url = `${API_URL}/api/blog/`;
  const bearer = `Bearer ${getToken("access")}`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    return res;
  } catch (e) {
    console.error(e)
  }
}

export const usePost = () => {
  return {
    sendPost,
  }
}