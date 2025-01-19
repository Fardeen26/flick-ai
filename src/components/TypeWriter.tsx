import { useState, useEffect } from 'react';

interface TypeWriterProps {
    text: string;
    speed?: number;
}

export default function TypeWriter({ text, speed = 50 }: TypeWriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, speed]);

    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return (
        <div className="whitespace-pre-wrap">
            {displayedText}
        </div>
    );
} 