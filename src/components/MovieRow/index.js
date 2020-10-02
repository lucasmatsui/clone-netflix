import React, { useState } from 'react';
import './styles.css';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default ({ title, items }) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let halfWindow = Math.round(window.innerWidth / 2);
        let leftPixelWalking = scrollX + halfWindow;

        if (leftPixelWalking > 0) {
            leftPixelWalking = 0;
        }

        setScrollX(leftPixelWalking);
    }

    const handleRifhtArrow = () => {
        let screen = window.innerWidth;
        let halfWindow = Math.round(screen / 2);

        let rightPixelWalking = scrollX - halfWindow;
        
        let listWidth = items.results.length * 290;

        let paddingPage = 60;

        if ((screen - listWidth) > rightPixelWalking) {
            rightPixelWalking = (screen - listWidth) - paddingPage;
        }
        
        setScrollX(rightPixelWalking);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }}/>
            </div>
            <div className="movieRow--right" onClick={handleRifhtArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }}/>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 290
                }}>
                    {items.results.length > 0 && items.results.map((movie, key) => {
                        if (movie.poster_path == null) {
                            return null;
                        }

                        return (
                            <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}