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
    const [loading, setLoading] = useState<boolean>(false); // loading state

    interface BotResponse {
        response: string;  
    }
    console.log(scrapedData)
    const handleChange = async () => {
        if (level) {
            setLoading(true); // sets loading to true before making the request
            try {
                const response = await api.post('/customize', { summary: summarizedData, expertise_level: level });
                const botSummaryResponse = (response.data as BotResponse).response;
                setSummarizedData(botSummaryResponse);
            } catch (error) {
                console.error("Error fetching bot response:", error);
            } finally {
                setLoading(false); // set loading to false after the request is complete
            }
        }
    };

    const handleLevelChange = (newLevel: string) => {
        setLevel(newLevel);
        handleChange(); 
    };

    // Utility function to format keywords string into JSX
    const formatKeywords = (keywordsText: string | null) => {
        if (!keywordsText) return null;
    
        return keywordsText.split('\n').map((item, index) => {
            const [term, definition] = item.split(/:(.+)/).map(str => str.trim());
            return (
                <div key={index} className="pb-2 text-left">
                    <strong>{term}</strong> {definition} {/* Displaying term and definition without a bullet */}
                </div>
            );
        });
    };
    
    

    return (
        <>
            <h1 className="font-bold text-3xl pb-4">Current Level: {level.charAt(0).toUpperCase() + level.slice(1)}</h1>
            <div className="pb-4">
                <button onClick={() => handleLevelChange("beginner")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full outline-black hover:bg-blue-600", 
                    {"bg-gray-200 hover:bg-blue-400": level === "beginner"})}>
                    Beginner
                </button>

                <button onClick={() => handleLevelChange("intermediate")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full hover:bg-blue-600", 
                    {"bg-gray-200 hover:bg-blue-400": level === "intermediate"})}>
                    Intermediate
                </button>

                <button onClick={() => handleLevelChange("advanced")} 
                    className={clsx("bg-blue-400 p-3 m-2 rounded-full hover:bg-blue-600", 
                    {"bg-gray-200 hover:bg-blue-400": level === "advanced"})}>
                    Advanced
                </button>
            </div>
            
            {/* Display the summarized data or loading indicator */}
            <div id="summary" className="text-wrap pb-4">
                <h3 className="font-bold pb-2 text-lg">Summarized Data:</h3>
                {loading ? (
                    <div className="flex justify-center items-center mt-4">
                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="magnifying-glass-loading"
                            glassColor="#c0efff"
                            color="#2563eb"
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

            {/* Display the keywords data in a formatted list */}
            <div id="keywords" className="text-wrap">
                <h3 className="font-bold text-lg pb-2">Keywords Data:</h3>
                {keywords ? (
                    <ul className="list-disc pl-5">
                        {formatKeywords(keywords)}
                    </ul>
                ) : (
                    <p>No keywords available yet.</p>
                )}
            </div>
        </>
    );
}

export default Summary;
