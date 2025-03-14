import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { useEffect } from 'react';

interface PlyrVideoProps {
    src: string;
    
}

export default function PlyrVideo({ src }: PlyrVideoProps) {

    useEffect(() => {
        const plyr = new Plyr('#videoPlayer', {
            
            loop: {
                active: true,
            },
            controls: ['play', 'progress', 'play-large'],
        });
        return () => {
            plyr.destroy();
        }
    }, []);


    return (
        <div className="w-full h-fit">
            <video src={src} className="w-full" autoPlay id="videoPlayer"></video>
        </div>
    )
}
