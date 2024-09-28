// import React from 'react'

// type Props = {


// }

const ChatBot = () => {
  return (
    <>
    <div className="font-bold text-2xl">Welcome!</div>

    <div className="flex flex-col gap-2 items-center justify-center">
        <textarea className="w-72 h-28 px-3 py-2 rounded-lg border border-black resize-none"></textarea>
        <button className="w-10 bg-blue-100 border border-black">Send</button>
    </div>
    </>

  )
}


export default ChatBot;
