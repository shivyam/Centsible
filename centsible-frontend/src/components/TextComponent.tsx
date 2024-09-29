import logo from '/logo.png';

import { IoPersonOutline } from "react-icons/io5";

type Message = {
    user?: string;
    bot?: string;
  };

type Props = {
    history: Message[]
}

const TextComponent = (props: Props) => {

  return (
    <>

        <div className="flex flex-col gap-y-4 pb-8 items-center justify-center">
            {props.history.map((item,index) => (
                item.bot ?         
                <div key={index} className="w-[300px] flex gap-2 justify-start">
                    <div className="w-12 h-10 rounded-full outline outline-1"> 
                        <img src={logo} />
                    </div>
                    <div className="w-fit px-6 py-2 border rounded-md">{item.bot}</div>
                </div> 
            :
                (item.user  ? 
                    <div key={index} className="w-[300px] flex gap-2 justify-end">
                    <div className="w-fit px-6 py-2 border rounded-md">{item.user}</div>
                        <div className="w-10 rounded-full outline outline-1 flex items-center justify-center"> 
                            <IoPersonOutline />
                        </div>
                    </div>
                    
                    : null)

                    
            ))}
      
        </div>

   


    </>
  )
}

export default TextComponent