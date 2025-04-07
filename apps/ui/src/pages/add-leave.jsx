import { AddLeaveForm } from "./add-leave-form"
import { Navbar } from "./nav-bar"

export function AddLeave(){
    return (
        <>
            <Navbar title={'ADD LEAVE'}/>
            <AddLeaveForm />
        </>
        )
}
