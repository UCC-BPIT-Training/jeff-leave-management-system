import { useParams, useLocation } from 'react-router';
import { UpdateLeaveForm } from './update-leave-form';
import { Navbar } from "./nav-bar"


export function UpdateLeave(){

    const location = useLocation();
    const { id } = useParams();

    let state
    
    if(location.state === null){
        state = {}
    }else{
        state = location.state
    }

    const { DataObj } = state;  // Getting the parameter


    //console.log(DataObj)

    return(
        <>
            <Navbar title={'UPDATE LEAVE'}/>
            <UpdateLeaveForm id={id} toUpdate={DataObj}/>
        </>
    )
}