import { useState } from "react";
import { useUsersQuery } from "./Users";
import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";


function App() {
  // const { data, isLoading, isError } = useUsersQuery();

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error Fetching Data</p>;

  const [count, setCount] = useState(0);
  const [setUp,setSetUp] =useState();
  const [toggle,setToggle]= useState(true);
  const [toggletext,setToggletext]= useState("Off");
  const togglePara= toggle ? "Toggle is Off": "Toggle is On";

  const togglefun=()=>{
    setToggle(!toggle);
    setToggletext(toggle ? "On" : "Off");
  }

  const handleRefresh = () => {
    setCount(0);
    setSetUp(0);
    setToggle(true);
    setToggletext("Off");
  }

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
    
      <div className=" w-[70%] h-[70%] lg:w-[40%] sm:h-[50%] lg:h-[80%] bg-amber-100 rounded-lg flex flex-col justify-center items-center shadow-lg shadow-neutral-500 gap-5">
        <span> <Button icon={<ReloadOutlined />} 
        onClick={handleRefresh}
    /></span> 
        <h1 className="text-sm md:text-3xl font-bold">Dynamic Step Counter</h1>
       <h2 className="text-sm md:text-3xl font-bold">Counter: {count}</h2>
       <p className="text-sm md:text-2xl font-mono font-semibold bg-amber-200 px-3 md:px-10 py-2 rounded-lg">{togglePara}</p>
       <input type="number" className="border w-[80%] border-gray-300 px-2 rounded-sm text-sm md:px-5 py-2 md:rounded-2xl bg-amber-50 md:text-lg font-bold" value={setUp} placeholder="Value" onChange={(e) => {
        const value = Number(e.target.value);
        setSetUp(value < 0 ? 0 : value)}}  />
        <div className="flex flex-col md:flex-row gap-2">
        <button className="bg-black text-white text-sm md:text-2xl px-5 py-2 rounded-lg cursor-pointer" onClick={() => setCount(count + setUp)}>Increment</button>
        <button className="bg-black text-white text-sm md:text-2xl px-5 py-2 rounded-lg cursor-pointer" onClick={() =>count >0? setCount(count - setUp): setCount(0)}>Decrement</button>
        </div>
        <div className="flex flex-row">
          <button className="bg-black text-white text-sm md:text-2xl px-5 py-2 rounded-lg cursor-pointer" onClick={togglefun}>{toggletext}</button>
        </div>
          
      </div>
    </div>
  );
}

export default App;
