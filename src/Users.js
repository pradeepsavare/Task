import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};

const getImg = async () => {
  const res = await fetch("https://api.unsplash.com/photos/?client_id=nH7ljacRcj8Q03gwWvO2DLiB3DRlyCFiM3P_YZLG6nc");
  if (!res.ok){
    throw new Error("Failed to fetch image");
  }
  return res.json();
} 

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["imges"],
    queryFn: getImg,
  });
};
