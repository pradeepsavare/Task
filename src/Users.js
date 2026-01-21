import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};


export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
