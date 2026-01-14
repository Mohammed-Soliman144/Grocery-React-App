import {useState, useCallback} from 'react'


export default function useSetIndex(numberOfimages: number) {

    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const prevIndex = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + numberOfimages) % numberOfimages);
    }, [numberOfimages])


    const nextIndex = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % numberOfimages);
    }, [numberOfimages])

    return {currentIndex, prevIndex, nextIndex, setCurrentIndex};
}