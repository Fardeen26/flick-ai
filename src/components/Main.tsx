"use client"

import { useState } from "react";
import axios from "axios";
export default function Main() {
    const [tweet, setTweet] = useState('');
    const [mood, setMood] = useState('');
    const [action, setAction] = useState('');
    const [result, setResult] = useState('');
    const [regenerating, setRegenerating] = useState(false);
    const [improvePrompt, setImprovePrompt] = useState('');

    const handleGenerate = async () => {
        const response = await axios.post('/api/generate', { tweet, mood, action });
        setResult(response.data.text);
    }
    const handleRegenerate = async () => {
        const response = await axios.post('/api/improve', { result, mood, action, improvePrompt, tweet });
        setResult(response.data.text);
    }
    return (
        <main>
            <input type="text" onChange={(e) => setTweet(e.target.value)} className="text-black w-full" />
            <select name="mood" id="mood" onChange={(e) => setMood(e.target.value)} className="text-black w-full">
                <option value="serious">Serious</option>
                <option value="casual">Casual</option>
            </select>
            <select name="action" id="action" onChange={(e) => setAction(e.target.value)} className="text-black w-full">
                <option value="formatting">Formatting</option>
                <option value="improving">Improving</option>
                <option value="correcting">Correcting</option>
            </select>
            <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-md">Generate</button>
            <button onClick={() => setRegenerating(!regenerating)} className={`bg-blue-500 text-white p-2 rounded-md ${result ? 'block' : 'hidden'}`}>Regenerate</button>
            <div className={`${result ? 'block' : 'hidden'}`}>
                <input type="text" onChange={(e) => setImprovePrompt(e.target.value)} className="text-black w-full" />
                <button onClick={handleRegenerate} className="bg-blue-500 text-white p-2 rounded-md">Improve</button>
            </div>
            <div className="text-white w-full">{result}</div>
        </main>
    )
}