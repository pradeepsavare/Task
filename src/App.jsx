import { useState } from "react";
import { useUsersQuery } from "./Users";


function App() {
  // const { data, isLoading, isError } = useUsersQuery();

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error Fetching Data</p>;

  const [count, setCount] = useState(0);

  return (
    // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
    //   {data.map((user) => (
    //     <div key={user.id} className="bg-blue-300 text-center p-4 rounded-lg hover:shadow-neutral-500 shadow-lg transition-shadow duration-200 cursor-pointer">
         
    //       <div className="w-[100%] h-35 mb-2 overflow-hidden">
    //        <img
    //         src={user.urls.regular}
    //         alt={user.user.name}
    //         className="w-full h-full object-cover rounded-2xl "
    //       />
    //       </div>
    //       <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-1 ">{user.user.name}</h2>
    //       <p className="text-center text-sm md:text-base lg:text-lg font-semibold">{`Desc: ${user.alt_description}`}</p>
          
    //     </div>
    //   ))}
    // </div>
    <div className="w-full h-screen bg-amber-300 flex justify-center items-center">
      <div className="w-[40%] h-[60%] bg-amber-100 rounded-lg flex flex-col justify-center items-center shadow-lg shadow-neutral-500 gap-10">
       <h1 className="text-3xl font-bold">Counter: {count}</h1>
        <div className="flex flex-row gap-2">
        <button className="bg-black text-white text-2xl px-5 py-2 rounded-lg cursor-pointer" onClick={() => setCount(count + 1)}>Increment</button>
        <button className="bg-black text-white text-2xl px-5 py-2 rounded-lg cursor-pointer" onClick={() =>count >0? setCount(count - 1): setCount(0)}>Decrement</button>
        </div>
          
      </div>
    </div>
  );
}

export default App;
