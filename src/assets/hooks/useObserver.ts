import {useEffect, useRef} from 'react'

export function useObserver() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Best Practice to wrap observer inside function to gurantee you runs function once
    const callObserverOnce = () => {
        // if not null return observer.current as whole
        // note if check if not null and return
        if(observerRef.current) return observerRef.current;
        observerRef.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                    document.querySelector(`a[href="/#${ entry.target?.id}"]`)?.classList.add('visible');
                    // only for performance or with animation
                    // observerRef.current?.unobserve(entry.target);
                }
                else {
                    entry.target.classList.remove('visible');
                    document.querySelector(`a[href="/#${entry.target?.id}"]`)?.classList.remove('visible');
                }
            })
        }, {threshold: 0.50});
        return observerRef.current;
    }

    useEffect(() => {
        // Cleanup
        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        }
    }, [])

    // Reference or Ref Callback Technique
    const addToSectionsRef = (element: Element | null): void => {
        if(element)
            callObserverOnce()?.observe(element);
    }

    return {addToSectionsRef} ;
}