import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './style.scss';

export const SlidePhoto = (props) => {
    useEffect(() => {

    })
    useEffect(() => {
        setImageActive(data[0].url)
    }, [props])

    const data = [
        {
            url: `${props.imageUrl.image1}`,
            value: -1
        },
        {
            url: `${props.imageUrl.image2}`,
            value: 0
        },
        {
            url: `${props.imageUrl.image3}`,
            value: 1
        },
        {
            url: `${props.imageUrl.image4}`,
            value: 0
        },

    ]
    const [imageActive, setImageActive] = useState(data[0].url)
    const handleChangeItemActive = (index) => {
        setImageActive(data[index].url)
    }
    return (
        <div className='slidephoto'>
            <div className='slidephoto__container'>
                <div className='slidephoto__container--left'>
                    {data.map((item, index) => {
                        return (
                            <div key={index} className='slidephoto__item' onClick={(e) => handleChangeItemActive(index)}>
                                <img className='slidephoto__item--photo' src={item.url} alt={props.imageUrl} />
                            </div>
                        )
                    })};
                </div>
                <div className='slidephoto__container--right'>
                    <img className={"slidephoto__item--active"}
                        src={imageActive} />

                </div>
            </div>
        </div>
    );
}