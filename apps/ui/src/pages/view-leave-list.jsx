import { useState, useEffect} from 'react'
import { ViewLeaveListItem } from "./view-leave-list-item"
import { Navbar } from "./nav-bar"

export function ViewLeaveList(){

    const [dataObj, setDataObj] = useState([]);

    const [triggerDelete, setTriggerDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/requests';
    
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
        
            
    }, [triggerDelete]);




        useEffect(() => {
            if (triggerDelete) {
              console.log('Button clicked, useEffect is running!');
              
              const apiUrl = `http://localhost:3000/requests/${idToDelete}`;
    
                const deleteData = async () => {
                    try {
                        const response = await fetch(apiUrl, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
            
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                  
                    
                    } catch (error) {
                
                        console.log(error)
                    }
                
                };

                deleteData();
                setTriggerDelete(false);
            }
        }, [triggerDelete]);

        const handleOnClickUpdateRow = (id) => {
            console.log('Button update with ID:', id);
        };

        const handleOnClickDeleteRow = (id) => {
            console.log('button Delete  with ID:', id);
            setIdToDelete(id)
            setTriggerDelete(true)
          
        };


    return(
        <>
            <Navbar title={'LIST VIEW'}/>
            <div>
                {dataObj && dataObj.length > 0 ? (
                    <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date From
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date To
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Update
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                    {dataObj.map((item) => (
                        <ViewLeaveListItem onClickDeleteRow={handleOnClickDeleteRow} onClickUpdateRow={handleOnClickUpdateRow} index={item.id} name={item.name} email={item.email} type={item.type} reason={item.reason} date_from={item.date_from} date_to={item.date_to} status={item.status}/>
                    ))}
                    </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No items found</p>
                )}
            </div>



        

        </>
    )
}