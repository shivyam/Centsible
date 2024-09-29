import { SetStateAction, useState } from "react";
import clsx from 'clsx';
import api from "../api/axiosInstance";
import { MagnifyingGlass } from "react-loader-spinner";
import ScraperComponent from '../ScraperComponent';

function Summary() {
    const [level, setLevel] = useState("beginner");
    const [scrapedData, setScrapedData] = useState<string | null>(null);
    const [summarizedData, setSummarizedData] = useState<string | null>(null);
    const [keywords, setKeyWords] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); //loading state

    interface BotResponse {
        response: string;  
    }

    console.log(scrapedData);
    const handleChange = async () => {
        if (level) {
            setLoading(true); //sets loading to true before making the request
            try {
                
                const response = await api.post('/customize', { summary: summarizedData, expertise_level: level });

                const botSummaryResponse = (response.data as BotResponse).response;
                setSummarizedData(botSummaryResponse);
            } catch (error) {
                console.error("Error fetching bot response:", error);
            } finally {
                setLoading(false); //set loading to false after the request is complete
            }
        }
    };

    const handleLevelChange = (newLevel: string) => {
        setLevel(newLevel);
        handleChange(); 
    };

    return (
        <>
            <h1 className="font-bold text-3xl pb-4">Current Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h1>
            <div className="pb-4">
                <button onClick={() => handleLevelChange("beginner")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full outline-black", 
                    {"bg-gray-200": level === "beginner"})}>
                    Beginner
                </button>

                <button onClick={() => handleLevelChange("intermediate")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full", 
                    {"bg-gray-200": level === "intermediate"})}>
                    Intermediate
                </button>

                <button onClick={() => handleLevelChange("advanced")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full", 
                    {"bg-gray-200": level === "advanced"})}>
                    Advanced
                </button>

            </div>
            {/* Display the summarized data or loading indicator */}
            <div id="summary" className="text-wrap pb-4">
                <h3 className="font-bold pb-2">Summarized Data:</h3>
                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="magnifying-glass-loading"
                            wrapperStyle={{}}
                            wrapperClass="magnifying-glass-wrapper"
                            glassColor="#c0efff"
                            color="#e15b64"
                        />
                    </div>
                ) : summarizedData ? (
                    <p>{summarizedData}</p>
                ) : (
                    <p>No summarized data available yet.</p>
                )}
            </div>

            <ScraperComponent
                onScrapedData={(data: SetStateAction<string | null>) => setScrapedData(data)}
                onSummaryData={(summarizedData: SetStateAction<string | null>) => {
                    setSummarizedData(summarizedData);
                }}
                onKeywordsData={(keywords: SetStateAction<string | null>) => {
                    setKeyWords(keywords);
                }}
            />

            {/* Display the keywords data */}
            <div id="keywords" className="text-wrap">
                <h3 className="font-bold">Keywords Data:</h3>
                {keywords ? <p>{keywords}</p> : <p>No keywords available yet.</p>}
            </div>
        </>
    );
}

export default Summary;
