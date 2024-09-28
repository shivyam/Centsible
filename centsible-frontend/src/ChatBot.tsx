import React, {useState, useEffect} from 'react'
import TextComponent from './components/TextComponent'
type Props = {


}




const ChatBot = (props: Props) => {
    
    const [history, setHistory]= useState( [
        {"user": "hi chatbot"},
        {"bot": "hi user"},
        {"user": "hi chatbot"},
        {"bot": "hi user"}, 
        {"user": "hi chatbot"},
        {"bot": "hi user"},
    ]);
    
    const handleChange = (event) => {
        setInput(event?.target.value);
    }
    const [input, setInput] = useState<string>();

    const handleSubmit= () => {
        if (input){
            setHistory([...history, {"user" :input}]);
        }


    };


  return (
    <>
    <div className="font-bold text-3xl pb-4">Welcome!</div>

        <TextComponent />

       <div className="flex flex-col">
        <textarea onChange={handleChange}  className="w-72 h-28 px-3 py-2 rounded-lg border border-black resize-none" placeholder="Ask your personalized bot a question..."></textarea>
        <button onClick={handleSubmit} className="w-10 bg-blue-100 border border-black">Send</button>
        </div>
    </>

  )
}


export default ChatBot;
