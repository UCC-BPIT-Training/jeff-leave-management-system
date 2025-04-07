import { useNavigate } from 'react-router';

export function ViewLeaveListItem({index, name, email, type, reason, date_from, date_to, status, onClickUpdateRow, onClickDeleteRow}){

    const toUpdateObject = { 
        name: name, 
        email: email,
        type: type,
        reason: reason,
        date_from: date_from,
        date_to: date_to,
        status: status,
    };

    const navigate = useNavigate();

    const handleOnClickUpdateRow = () => {
        onClickUpdateRow(index)
        navigate(`/request/${index}/edit` ,  { state: { DataObj: toUpdateObject } });
    };

    const handleOnClickDeleteRow = () => {
        onClickDeleteRow(index)
    }



    return(
        <>
          
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {name}
                </th>
                <td className="px-6 py-4">
                    {email}
                </td>
                <td className="px-6 py-4">
                    {type}
                </td>
                <td className="px-6 py-4">
                    {reason}  
                </td>
                <td className="px-6 py-4">
                    {date_from}  
                </td>
                <td className="px-6 py-4">
                    {date_to}  
                </td>
                <td className="px-6 py-4">
                    {status}  
                </td>
                <td className="px-6 py-4">
                    <button type="submit" onClick={handleOnClickUpdateRow} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Update</button>  
                </td>

                <td className="px-6 py-4">
                    <button type="submit" onClick={handleOnClickDeleteRow} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>  
                </td>
            </tr>
        
        </>
    )
}