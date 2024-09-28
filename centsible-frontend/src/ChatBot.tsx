import React, {useState, useEffect} from 'react'
import TextComponent from './components/TextComponent'

type Message = {
    user?: string;
    bot?: string;
};


localStorage.setItem("history", JSON.stringify(history))

const ChatBot = () => {
    
    const [history, setHistory]= useState<Message[]>([]);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history))
        
    }, [history])
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event?.target.value);
    }

    const [input, setInput] = useState<string>();


    const handleSubmit= () => {
        if (input){
            console.log(input);
            setHistory([...history, {"user" : input}]);
            localStorage.setItem("history", JSON.stringify(history))
            setInput('');
        }

    };


  return (
    <>
    <div className="font-bold text-3xl pb-4">Welcome!</div>

        <TextComponent history={history} />

       <div className="flex flex-col items-center gap-2">
        <textarea onChange={handleChange} value={input}  className="w-72 h-28 px-3 py-2 rounded-lg border border-black resize-none" placeholder="Ask your personalized bot a question..."></textarea>
        <button onClick={handleSubmit} className="w-40 h-10 bg-blue-100 border border-black">Send</button>
        </div>
    </>

  )
}


export default ChatBot;