
import { useState, useEffect, setError } from "react";

export function AddLeaveForm(){

        const [dataObj, setDataObj] = useState([]);
        const [activate, setActivate] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('Creation Success!');
        console.log(dataObj)
        setActivate(!activate);
    };

    const handleDataObjectOnChange = (e) => {
        const { id, value } = e.target;

        // Update the relevant property in the object
        setDataObj((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    }

    
  useEffect(() => {
    const apiUrl = 'http://localhost:3000/requests';
    
    const requestBody = dataObj;

    const postData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
      } catch (error) {

        console.log(error)
      }

      // clear data after post api is sent
      let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => (input.value = ""));

      setDataObj([]);

    };

        if(dataObj.length !== 0){
            postData();
        }
        

    }, [activate]);

    return (        

        <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>

            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium ">Your name</label>
                <input type="text" id="name" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                <input type="email" id="email" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
            </div>

            <div className="mb-5">
                <label htmlFor="type" className="block mb-2 text-sm font-medium ">Type</label>
                <input type="text" id="type" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="mb-5">
                <label htmlFor="reason" className="block mb-2 text-sm font-medium ">Your Reason</label>
                <input type="text" id="reason" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="mb-5">
                <label htmlFor="date_from" className="block mb-2 text-sm font-medium ">Date from</label>
                <input type="date" id="date_from" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className="mb-5">
                <label htmlFor="date_to" className="block mb-2 text-sm font-medium ">Date to</label>
                <input type="date" id="date_to" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    )
}