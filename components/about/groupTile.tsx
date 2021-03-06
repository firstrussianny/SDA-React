import React from 'react';
import { GroupLocale } from '../../pages/about';

export interface GroupTileProps extends GroupLocale {
    img: string;
}

export interface Activity {
    subTitle: string;
    time: string;
    day: string;
    description: string;
}

const GroupTile: React.FunctionComponent<GroupTileProps> = ({
    title,
    activities,
    img,
    imgAlt,
}) => {
    if (!title || !activities || !img || !imgAlt) {
        return null;
    }

    return (
        <div className="card mb-3 group">
            <div className="row no-gutters">
                <div
                    className="col-md-4 col-lg-3 d-flex align-items-center justify-content-center image-overlay d-sm-none"
                    style={{
                        backgroundImage: `url("${img}")`,
                        backgroundColor: '#cccccc',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="image-overlay-text py-5">{title}</div>
                </div>
                <div className="col-md-8 col-lg-9 activities">
                    {activities.map(activity => (
                        <div
                            className={`row align-items-center h-${
                                100 / activities.length
                            } py-3`}
                            key={activity.subTitle}
                        >
                            <div className="col-lg-3 text-center">
                                <h5 className="d-block d-lg-none">
                                    {activity.subTitle}
                                </h5>
                                <h5 className="d-none d-lg-block">
                                    {activity.day}
                                </h5>
                                <h6 className="d-none d-lg-block">
                                    {activity.time}
                                </h6>
                            </div>
                            <div className="col-lg-9 align-items-center">
                                <h5 className="d-none d-lg-block">
                                    {activity.subTitle}
                                </h5>
                                <h6 className="d-inline d-lg-none">
                                    {activity.day} &nbsp;
                                </h6>
                                <h6 className="d-inline d-lg-none">
                                    {activity.time}
                                </h6>
                                <p>{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="col-md-4 col-lg-3  align-items-center justify-content-center image-overlay d-none d-sm-flex"
                    style={{
                        backgroundImage: `url("${img}")`,
                        backgroundColor: '#cccccc',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="image-overlay-text py-5">{title}</div>
                </div>
            </div>
        </div>
    );
};

export default GroupTile;
