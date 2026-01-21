import { useUsersQuery } from "./Users";


function App() {
  const { data, isLoading, isError } = useUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Fetching Data</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
      {data.map((user) => (
        <div key={user.id} className="bg-blue-300 text-center p-4 rounded-lg hover:shadow-neutral-500 shadow-lg transition-shadow duration-200 cursor-pointer">
         
          <div className="w-[100%] h-35 mb-2 overflow-hidden">
           <img
            src={user.urls.regular}
            alt={user.user.name}
            className="w-full h-full object-cover rounded-2xl "
          />
          </div>
          <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-1 ">{user.user.name}</h2>
          <p className="text-center text-sm md:text-base lg:text-lg font-semibold">{`Desc: ${user.alt_description}`}</p>
          
        </div>
      ))}
    </div>
  );
}

export default App;
