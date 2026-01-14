// Declare Type of function as React.Dispatch<React.SetStateAction<number>>
type functionType = React.Dispatch<React.SetStateAction<number>>

export default function useCarousel(numberOfImages: number, updateIndex: functionType) {

    const nextImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        updateIndex((prevIndex) => (prevIndex + 1) % numberOfImages);
        return;
    }

    const prevImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        updateIndex((prevIndex) => (prevIndex - 1 + numberOfImages) % numberOfImages);
        return;
    }

    // return {currentIndex, prevImage, nextImage}; for object destructuring without constant
    // return [curentIndex, prevImage]; for array with constant
    return {prevImage, nextImage};
}