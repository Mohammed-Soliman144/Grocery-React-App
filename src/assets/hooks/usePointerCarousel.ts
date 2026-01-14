export default function usePointerCarousel(prev: () => void, next: () => void) {
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    // e: ReactPointerEvent is as React Event only for handlePointerDown or onPointerDown
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {

        // Define Target element as HTMLElement as container which start dragging from
        const targetElement = e.target as HTMLDivElement;
        if(targetElement && typeof(targetElement.setPointerCapture) === 'function') {
            // connect pointer width targetElement by using setCapturePointer(e.pointerId) and passing pointerId to it
            // is as connect pointer by the element itself i am dragging now (fire pointer Event or trigger)
            targetElement.setPointerCapture(e.pointerId);
        }

        
        // Define position of pointer when use start dragging in axis x by using targetElement
        // its represent as position of dragging is as point on axis x the user start dragged from it
        const startPointerPos = e.clientX; 

        // handleEvent as callbackfunction when user start already dragging and moving which still press on mouse
        // to drag image
        // (e: PointerEvent) in handlePointerMoving and HandlePointerUp the browser is created automatically these 
        // parameters and passing to callback function just names or variable names
        // Native Browser PointerEvent
        const handlePointerMoving = (_moveEvent: PointerEvent):void => {
            // Recommend do not get endPointerPos here because the user not finished dragging yet still on mouse
            return;
        }
        
        // handlePointerUp here define endPointerPos and releaseCapturePointer and wait for other dragging
        // Native Browser PointerEvent
        const handlePointerUp = (upEvent: PointerEvent):void => {
            const endPointerPos = upEvent.clientX;
            const distance: number = startPointerPos - endPointerPos;
            // if suppose startPointer 100  and endPointer equals 50
            // Distance is 50 (on axis x)   as below
            // start from 100 on the right and back to 50 on axis x thats mean move from right to left
            // is as move to next image go forward (which is result is positive)
            //                           start pointer                End Pointer => distance (50 positive)
            // 0  =============================  50 ================================= 100
            if(distance > 50)
                // change the current index of image to next index by using useState
                // setCurrentIndex(prevIndex => (prevIndex + 1) % numberOfImages);
                next();
            // suppose the start is 50  and end pointer 100 on axis x
            // thats means move from left to right (simulate it on mobile screen to ensure in this go backward)
            //                                start pointer               End Pointer => distance (-50 negative)
            // 0 ================================= 100 ====================================== 50
            // is as move to prev image go backward (which is result negative)
            else if (distance < -50)
                // change the current index of image to previous one
                // setCurrentIndex(prevIndex => (prevIndex - 1 + numberOfImages) % numberOfImages);
                prev();
            // ReleaseCapturePointer for targetElement to wait or accept next dragging
            targetElement.releasePointerCapture(e.pointerId);

            // Note all below remove eventlistener does not execute now 
            // which already inside callbackfunction called handlePointerUp
            // only execute when execute other callbackfunction handlePointerDown
            // and handlePointerDown and CurrentIndex not fire or trigger which returned from custom Hook to component
            // after connect and tie handlePointerDown as handleEvent Callbackfunction with event onPointerDown
            // which mean this hook execute or fire according the user dragging element as container
            // then trigger this hook
            //so only remove eventListener from document for pointermove and pointerup not pointerdown which is already tie 
            // inside component with onPointerDown element by this custom hook 

            // Then remove EventListener of pointermove and  pointerup from document not targetElement from (All DOM) not pointerdown
            document.removeEventListener('pointermove', handlePointerMoving);
            document.removeEventListener('pointerup', handlePointerUp);
        }

        // add eventListener of pointermove and pointerup from document from document all DOM not pointerdown
        document.addEventListener('pointermove', handlePointerMoving);
        document.addEventListener('pointerup', handlePointerUp);
    }

    return {handlePointerDown};
}