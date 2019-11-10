import React from 'react';
import { WithTranslation } from 'react-i18next';

import { Event } from '../../lib/types';
import { formatDate } from '../../lib/helpers';

interface EventTileProps extends Event, WithTranslation { }

const getImage = (url: string, description: string) => (
    <picture>
        <source srcSet={`${url}w=400&q=80`} media='(max-width: 420px)' />
        <source srcSet={`${url}w=510&q=80`} media='(max-width: 767px)' />
        <source srcSet={`${url}w=173&q=80`} media='(max-width: 990px)' />
        <source srcSet={`${url}w=230&q=80`} media='(max-width: 1200px)' />
        <source srcSet={`${url}w=277&q=80`} media='(min-width: 1201px)' />
        <img src={`${url}w=400&q=80`} alt={description} className='card-img-top' />
    </picture>
);

const EventTile: React.FunctionComponent<EventTileProps> = props => {
    const image_url = props.image_url.split('crop&')[0] + 'crop&';

    return (
        <React.Fragment>
            <div className='card mb-3 calendar-tile d-none d-sm-flex'>
                <div className='row no-gutters'>
                    <div className='col-md-2 d-flex flex-column align-items-center justify-content-center text-center pl-4'>
                        <h5>{formatDate(props.date, ['month', 'day'], props.i18n.language)}</h5>
                        <h6 className='card-text'>{props.location_name}</h6>
                    </div>
                    <div className='col-md-7 d-flex align-items-center'>
                        <div className='card-body'>
                            <h5 className='card-title'>{props.title}</h5>
                            <p className='card-text'>{props.description}</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        {getImage(image_url, props.image_description)}
                    </div>
                </div>
            </div>
            <div className='card d-block d-sm-none'>
                {getImage(image_url, props.image_description)}
                <div className='card-body'>
                    <h5 className='card-title'>{props.title}</h5>
                    <p className='card-text'>{props.description}</p>
                </div>
                <div className='card-footer'>
                    <h5 className='card-date'>
                        {formatDate(props.date, ['month', 'day'], props.i18n.language)}
                    </h5>
                    <h6 className='card-date'>{props.location_name}</h6>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EventTile;
