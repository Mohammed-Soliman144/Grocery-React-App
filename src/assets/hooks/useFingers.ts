import {useState, useRef} from 'react'

export default function useFingers(numberOfImages: number) {
    
    const touchStartPos = useRef<number | null>(null);
    
    const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
    
    const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
        // Note Inside Touch Event do not use e.preventDefault()
        // if(touchStartPos && touchStartPos.current !== null) {
        // }
        // do not use touchStartPos.current !== null which is stopped work of touch event
        touchStartPos.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
        // do not check if touchStartPos.current !== null only can check if touchStartPos.current === null  to avoid stopped touch event work
        // if(touchStartPos.current === null) return;
        
        const touchEndPos: number = e.changedTouches[0].clientX;

        const distance: number = touchStartPos.current! - touchEndPos;

        // Swipe to forward or nextImage
        if(distance > 50) {
            setCurrentImgIndex(prevIndex => (prevIndex + 1) % numberOfImages);
        }

        // Swipe to backward or prevImage
        if(distance < -50) {
            setCurrentImgIndex(prevIndex => (prevIndex - 1 + numberOfImages) % numberOfImages);
        }

        // console.log(touchStartPos);
        // console.log(touchEndPos);
        // console.log(distance);
        // Reset TouchStartPos for next touch
        touchStartPos.current = null;
    }
    // console.log(currentImgIndex);

    return {currentImgIndex, handleTouchStart, handleTouchEnd};
}