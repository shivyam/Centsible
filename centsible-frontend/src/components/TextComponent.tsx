import React from 'react'
import logo from '/logo.png';
import user from '/user.png';
import { IoPersonOutline } from "react-icons/io5";
type Props = {}

const TextComponent = (props: Props) => {

    const history= [
        {"user": "hi chatbot"},
        {"bot": "hi user"},
        {"user": "hi chatbot"},
        {"bot": "hi user"}, 
        {"user": "hi chatbot"},
        {"bot": "hi user"},
    
    ]

  return (
    <>

        <div className="flex flex-col gap-y-4 pb-8 items-center justify-center">
            {history.map((item,index) => (
                item.bot ?         
                <div className="w-[300px] flex gap-2 justify-start">
                    <div className="w-10 rounded-full outline outline-1"> 
                        <img src={logo} />
                    </div>
                    <div className="w-fit px-6 py-2 border rounded-md">{item.bot}</div>
                </div> 
            :
                (item.user ? 
                    <div className="flex gap-2 justify-end">
                    <div className="w-fit px-6 py-2 border rounded-md">item.user</div>
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