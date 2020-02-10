import React from 'react';
import { WithTranslation } from 'react-i18next';

import { fetchData } from '../lib/helpers';
import { withTranslation } from '../i18n';
import { HeaderLocale } from '../components/shared/header';
import { Event } from '../lib/types';
import EventTile from '../components/calendar/eventTile';

const PAGE_SIZE = 5;

interface CalendarProps extends WithTranslation {
    events: Event[];
    count: number;
}

interface CalendarState {
    events: Event[];
    page: number;
    count: number;
    isLoading: boolean;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);

        this.state = {
            events: [],
            page: 1,
            count: 0,
            isLoading: true,
        };
    }

    static async getInitialProps({ req }: any) {
        const data = await fetchData('events', req, {
            page_size: PAGE_SIZE,
            date__gte: new Date().toISOString().split('T')[0],
        });

        if (data && 'results' in data) {
            return {
                events: data.results,
                count: data.count,
                namespacesRequired: ['common'],
            };
        }

        return { events: [], count: 0, namespacesRequired: ['common'] };
    }

    componentDidMount() {
        const { events, count } = this.props;
        this.setState({ events, count, isLoading: false });
    }

    loadMore = () => {
        if (this.isMoreAvailable() && !this.state.isLoading) {
            this.setState({ isLoading: true }, async () => {
                const data = await fetchData(
                    'events',
                    null,
                    { page_size: PAGE_SIZE, page: this.state.page + 1 },
                );

                if (data) {
                    const events = this.state.events.concat(data.results);
                    this.setState({ events, page: this.state.page + 1, isLoading: false });
                } else {
                    // tslint:disable-next-line:no-console
                    console.error('Invalid response');

                    this.setState({ isLoading: false });
                }
            });
        }
    }

    isMoreAvailable = () => Math.ceil(this.state.count / PAGE_SIZE) > this.state.page;

    render() {
        return (
            <div className='row justify-content-center'>
                <main className='container'>
                    <h1 className='text-center capitalize my-3'>
                        {this.props.t<HeaderLocale>('header', { returnObjects: true }).calendar}
                    </h1>
                    <div className='top-space'>
                        {
                            this.state.events.map(e => (
                                <EventTile
                                    {...e}
                                    key={e.title}
                                    t={this.props.t}
                                    i18n={this.props.i18n}
                                    tReady={this.props.tReady}
                                />
                            ))
                        }
                    </div>
                    <div className='d-flex justify-content-center'>
                        {
                            this.state.isLoading ?
                                (
                                    <React.Fragment>
                                        <div className='spinner-grow text-primary' role='status'>
                                            <span className='sr-only'>Loading...</span>
                                        </div>
                                        <div className='spinner-grow text-primary' role='status'>
                                            <span className='sr-only'>Loading...</span>
                                        </div>
                                        <div className='spinner-grow text-primary' role='status'>
                                            <span className='sr-only'>Loading...</span>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {
                                            this.isMoreAvailable() &&
                                            (
                                                <button
                                                    type='button'
                                                    className='btn btn-outline-primary'
                                                    onClick={this.loadMore}
                                                >
                                                    Load more
                                                </button>

                                            )
                                        }
                                    </React.Fragment>
                                )
                        }
                    </div>
                </main>

            </div>
        );
    }
}

export default withTranslation('common')(Calendar);
