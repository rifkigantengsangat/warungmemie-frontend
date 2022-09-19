import {MdClose} from 'react-icons/md'
export default function ModalPesanan ({setOpen,open}){
return(
    <div className="absolute bottom-1/3 right-2 w-11/12 mx-auto bg-black h-64">
        <div className='relative w-full h-2'>

        </div>
        <h1 ><MdClose/></h1>
       <button onClick={()=>setOpen(false)}>exit</button>
    </div>
)
}