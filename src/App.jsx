import { useUsersQuery } from "./assets/Users";


function App() {
  const { data, isLoading, isError } = useUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center items-center">
      {data.users.map((user) => (
        <div
          key={user.id}
          className="bg-blue-300 text-white p-4 w-[45%] md:w-[25%] lg:w-[18%]"
        >
          <p>{user.firstName} {user.lastName}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
