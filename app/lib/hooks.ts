import { API_URL } from "../config";
import authActions from "../auth/utils";

const { getToken } = authActions();

type PayloadProps = {
  owner: string;
  title: string;
  description: string
}


const editPost = async (payload:PayloadProps & {id: number}) => {
  const url = `${API_URL}/api/blog/${payload.id}/`;
  const bearer = `Bearer ${getToken("access")}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: bearer,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        owner: payload.owner,
      })
    })
    return res.json();
  } catch(e) {
    console.error(e);
  }
}


const deletePost = async (id: number) => {
  const url = `${API_URL}/api/blog/${id}`;
  const bearer = `Bearer ${getToken("access")}`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: bearer,
      }
    })
    return res;
  } catch (e) {
    console.error(e);
  }
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
    deletePost,
    editPost,
  }
}