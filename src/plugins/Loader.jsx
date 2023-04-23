import React from 'react';
import { Hypnosis } from "react-cssfx-loading";
import '../plugins/Plugins.css';

const Loading = ({bgc}) => {
    return (
        <div className='loading' style={{backgroundColor:bgc}}>
            <div className='container'>
                <div className='loaderIcon'><Hypnosis height='100px' width='100px' color='#2c2174' duration="1.5s" /></div>
            </div>
        </div>
    )
}

export default Loading;