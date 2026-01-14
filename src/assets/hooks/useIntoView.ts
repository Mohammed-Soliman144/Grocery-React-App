import {useLocation} from 'react-router'
import {useEffect} from 'react'

export function useIntoView() {
    const {hash} = useLocation();

    useEffect(() => {
        if(hash) {
            const targetElement = document.getElementById(hash.replace('#', ''));
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }
    }, [hash])
}