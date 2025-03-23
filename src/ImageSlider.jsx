import { useState, useEffect, useRef } from 'react';
import './index.css';
import eagle from "../image/eagel1.jpg";
import owl from "../image/owl1.jpg";
import crow from "../image/crow.jpg";
import butterfly from "../image/butterfly1.jpeg";
import owl2 from "../image/owl2.jpg";
import eagle3 from "../image/eagel3.jpg";
import king from "../image/kingfirser2.jpeg";
import parrot from "../image/parrot2.jpg";
import heron from "../image/heron.jpeg";
import butter2 from "../image/butterfly2.jpg";
const images = [
    { url: eagle, name: 'EAGLE', description: 'Eagles are powerful birds of prey.' },
    { url: owl, name: 'OWL', description: 'Owls are known for their nocturnal habits.' },
    { url: crow, name: 'CROW', description: 'Crows are intelligent and adaptable birds.' },
    { url: butterfly, name: 'BUTTERFLY', description: 'Butterflies are colorful and graceful.' },
    { url: owl2, name: 'OWL', description: 'Owls have excellent night vision.' },
    { url: eagle3, name: 'EAGLE', description: 'Eagles symbolize strength and freedom.' },
    { url: king, name: 'KINGFISHER', description: 'Kingfishers are expert fish hunters.' },
    { url: parrot, name: 'PARROT', description: 'Parrots are known for their vibrant colors.' },
    { url: heron, name: 'HERON', description: 'Herons are wading birds with long legs.' },
    { url: butter2, name: 'BUTTERFLY', description: 'Butterflies undergo metamorphosis.' },
];

const ImageSlider = () => {
    const [currentImages, setCurrentImages] = useState(images);
    const [isAnimating, setIsAnimating] = useState(false);
    const [autoSlide, setAutoSlide] = useState(true); // Toggle between auto-slide and manual-slide
    const [activeControl, setActiveControl] = useState('auto'); // Track active control button
    const runningTime = useRef(null);
    const autoSlideTimeout = useRef(null);

    const timeAutoNext = 4000; // Auto-slide interval

    useEffect(() => {
        if (autoSlide) {
            startAutoSlide();
        }
        resetTimeAnimation();
        return () => clearTimeout(autoSlideTimeout.current);
    }, [autoSlide]);

    const startAutoSlide = () => {
        if (autoSlide) {
            autoSlideTimeout.current = setTimeout(() => {
                handleSlide('next');
            }, timeAutoNext);
        }
    };

    const resetTimeAnimation = () => {
        if (runningTime.current) {
            runningTime.current.style.animation = 'none';
            runningTime.current.offsetHeight; // Trigger reflow
            runningTime.current.style.animation = `runningTime ${timeAutoNext / 1000}s linear 1 forwards`;
        }
    };

    const handleSlide = (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);

        if (direction === 'next') {
            setCurrentImages((prev) => [...prev.slice(1), prev[0]]);
        } else {
            setCurrentImages((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        }

        setIsAnimating(false);
        resetTimeAnimation();
        if (autoSlide) startAutoSlide();
    };

    const toggleAutoSlide = (enableAutoSlide) => {
        setAutoSlide(enableAutoSlide);
        setActiveControl(enableAutoSlide ? 'auto' : 'manual');
        clearTimeout(autoSlideTimeout.current);
        if (enableAutoSlide) {
            startAutoSlide();
        }
    };

    return (
        <div className={`carousel ${isAnimating ? 'animating' : ''}`}>
            <div className="list">
                {currentImages.map((item, index) => (
                    <div
                        className="item"
                        key={index}
                        style={{ backgroundImage: `url(${item.url})` }}
                    >
                        <div className="content">
                           
                            <div className="name">{item.name}</div>
                            <div className="des">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="arrows">
                <button className="prev" onClick={() => handleSlide('prev')}>
                    &lt;
                </button>
                <button className="next" onClick={() => handleSlide('next')}>
                    &gt;
                </button>
            </div>

            <div className="controls">
                <button
                    className={activeControl === 'auto' ? 'active' : ''}
                    onClick={() => toggleAutoSlide(true)}
                >
                    Enable Auto Slide
                </button>
                <button
                    className={activeControl === 'manual' ? 'active' : ''}
                    onClick={() => toggleAutoSlide(false)}
                >
                    Enable Manual Slide
                </button>
            </div>

            <div className="timeRunning" ref={runningTime}></div>
        </div>
    );
};

export default ImageSlider;
