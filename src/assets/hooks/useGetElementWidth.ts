import {useState, useRef, useLayoutEffect} from 'react'

export function useGetElementWidth() {

    const refElementWidth = useRef<HTMLDivElement>(null);
    const refContainerWidth = useRef<HTMLDivElement>(null);

    const [eleWidth, setEleWidth] = useState<number>(0);
    const [conWidth, setConWidth] = useState<number>(0);


    // Note useLayoutEffect for get current width of element or position synchronous
    // So useLayoutEffect is alway use for ResizeObserver
    // So useLayoutEffect is synchronous and useEffect is asynchronous
    useLayoutEffect(() => {
        // check if any one is null return to calculate width which elementwidth, containerWidth is ref for element as elementId
        if(refElementWidth.current === null || refContainerWidth.current === null) return;

        // One Observer for multiple elements is better than two observers
        const Observer = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                const marginLeft: number = parseFloat(getComputedStyle(entry.target).marginLeft);
                const marginRight: number = parseFloat(getComputedStyle(entry.target).marginRight);
                const width: number = entry.borderBoxSize[0].inlineSize + marginLeft + marginRight;

                // entry.target as id of element and elementWidth.current as id of element 
                // check to setwidth by using useState
                if(entry.target === refElementWidth.current) 
                    // SetWidth of element and setWidth of container
                    setEleWidth(width);
                else if(entry.target === refContainerWidth.current)
                    // setWidth of container
                    setConWidth(width);
            })
        })

        // observe the element id by using useRef note here is firing above callback function of ResizeObserver
        // Observer.observe(elementWidth.current)
        Observer.observe(refElementWidth.current);
        // Observer.observe(containerWidth.current)
        Observer.observe(refContainerWidth.current);

        // return for performance must release observer by using disconnect or unobserve
        return () => {
            Observer.disconnect();
        }
    }, [])

    return {refElementWidth, eleWidth, refContainerWidth, conWidth}
}
