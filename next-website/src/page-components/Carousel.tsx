/*
    This component is a client side component that dynamically shows a carousel of screenshots of the game demo.
*/
"use client"

import { useState } from "react";

import "../../styles/carousel.css";

export function Carousel() {

    interface Image {
        src: string,
        alt: string,
        id: number
    }

    const images: Array<Image> = [
        { 
            src: "/images/radiant-sun-screenshot1.PNG",
            alt: "Home base of the game", 
            id: 1 
        }, 
        { 
            src: "/images/radiant-sun-screenshot2.PNG", 
            alt: "Traversing the world with a party", 
            id: 2 
        }, 
        { 
            src: "/images/radiant-sun-screenshot3.PNG", 
            alt: "Battle against dark wing enemies", 
            id: 3 
        }
    ]

    const [ currentImage, setCurrentImage ] = useState<Image>( images[0] );

    function findImageIndex(): number {
         
        const currentImageIndex = images.findIndex((searchImage: Image) => {

            if (searchImage.id === currentImage.id) {

                return true;

            } else {

                return false;

            }

        })

        return currentImageIndex;

    }

    function nextImage() {

        const currentImageIndex = findImageIndex();

        if (currentImageIndex === 2) {

            setCurrentImage(images[0]);

        } else {

            setCurrentImage(images[ currentImageIndex + 1 ]);
        
        }

    }

    function previousImage() {

        const currentImageIndex = findImageIndex();

        if (currentImageIndex === 0) {

            setCurrentImage(images[2]);

        } else {

            setCurrentImage(images[ currentImageIndex - 1 ]);

        }

    }

    return (
        <div className="carousel">

            <img className="carousel-image" src={ currentImage.src } alt={ currentImage.alt } />

            <div className="flex" style={ { width: "100%", justifyContent: "space-between" } }>

                <button className="btn" onClick={ previousImage }>← Previous</button>

                <button className="btn" onClick={ nextImage }>Next →</button>

            </div>

        </div>
    )
}