import api from "@/services/api";

export async function ChangePasswordApi(data) {
  const res = await api.post("change-password", data);
  return res.data;
}
