import { useState, useEffect } from "react";



export function UpdateLeaveForm({id, toUpdate}){

    const [dataObj, setDataObj] = useState();
    const [activate, setActivate] = useState(false);
    const [dataId, setDataId] = useState(id)


    useEffect(() => {
        const apiUrl = `http://localhost:3000/requests/${id}`;
    
        const getData = async () => {
          try {
            const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const result = await response.json();

            setDataObj(result)
            
          } catch (error) {
    
            console.log(error)
          }
          
        };
    
        
        getData();
        
            
    }, []);

    useEffect(() => {
      const apiUrl = `http://localhost:3000/requests/${id}`;
      
      const requestBody = dataObj;

      
  
      const putData = async () => {
        try {
          const response = await fetch(apiUrl, {
            method: 'PUT',
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

        
  
      };
  
          if(dataObj){
              putData();
          }
          
  
      }, [activate]);
    

    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('Update Success!');
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

    const convertToDate = (datetime) => {
        const date = new Date(datetime);
        const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        return formattedDate;
      };


  


    return(
        <> 
        <div>
        {dataObj ? (
            
            <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>

                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium ">Your name</label>
                    <input type="text" value={dataObj.name} id="name" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                    <input type="email" value={dataObj.email} id="email" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium ">Type</label>
                    <input type="text" value={dataObj.type} id="type" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="reason" className="block mb-2 text-sm font-medium ">Your Reason</label>
                    <input type="text" value={dataObj.reason} id="reason" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="date_from" className="block mb-2 text-sm font-medium ">Date from</label>
                    <input type="date" value={convertToDate(dataObj.date_from)} id="date_from" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="date_to" className="block mb-2 text-sm font-medium ">Date to</label>
                    <input type="date" value={convertToDate(dataObj.date_to)} id="date_to" onChange={handleDataObjectOnChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                </form>

) : (
    <p>No items found</p>
)}
                </div>
        </>
    )
}
