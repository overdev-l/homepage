"use client";
import 'plyr/dist/plyr.css';
import { useEffect, useState } from 'react';

interface PlyrVideoProps {
    src: string;
    id: string;
}

export default function PlyrVideo({ src, id }: PlyrVideoProps) {
    const [plyrInstance, setPlyrInstance] = useState<any>(null);
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const loadPlyr = async () => {
            try {
                const Plyr = (await import('plyr')).default;
                const player = new Plyr(`#${id}`, {
                    loop: {
                        active: true,
                    },
                    controls: ['play', 'progress', 'play-large'],
                });
                setPlyrInstance(player);
            } catch (error) {
                console.error('Failed to load Plyr:', error);
            }
        };

        loadPlyr();

        return () => {
            if (plyrInstance) {
                plyrInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full h-fit">
            <video src={src} className="w-full" autoPlay id={id}></video>
        </div>
    );
}
