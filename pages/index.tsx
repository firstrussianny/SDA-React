import Container from 'react-bootstrap/Container';
import { WithTranslation } from 'react-i18next';
import { NextPageContext } from 'next';
import React from 'react';

import { GatherOnline } from '../components/home/GatherOnline.component';
import PrayerRequest from '../components/home/PrayerRequest.component';
import { Giving } from '../components/home/Giving.component';
import VisitUs from '../components/home/VisitUs.component';
import Updates from '../components/home/Updates.component';
import Events from '../components/home/Events.component';

import {
    Event,
    Update,
    ListEventsResponse,
    ListUpdatesResponse,
} from '../lib/types';
import { fetchData } from '../lib/helpers';
import { withTranslation } from '../i18n';

interface HomepageProps extends WithTranslation {
    updates: Update[];
    events: Event[];
}

async function fetchEvents(req: any) {
    const data = await fetchData<ListEventsResponse>('events', req, {
        page_size: 3,
        date__gte: new Date().toISOString().split('T')[0],
        order_by: ['-is_featured', 'date'],
    });

    return data?.results || [];
}

async function fetchUpdates(req: any) {
    const data = await fetchData<ListUpdatesResponse>('announcements', req, {
        page_size: 3,
        order_by: ['-is_featured', '-start_date'],
    });

    return data?.results || [];
}

class Homepage extends React.Component<HomepageProps> {
    static async getInitialProps({ req }: NextPageContext) {
        return {
            events: await fetchEvents(req),
            updates: await fetchUpdates(req),
            namespacesRequired: ['home'],
        };
    }

    render() {
        const { t, i18n, tReady } = this.props;

        if (!tReady) {
            return null;
        }

        return (
            <div>
                {/* Main picture */}
                <div id="main-page-img" className="content-body">
                    <div className="card-body text-center ">
                        <h1 className="px-3 text-shadow main-title">
                            &#34;
                            {t('mainQuote.text')}
                            &#34;
                        </h1>
                        <footer className="blockquote-footer">
                            {t('mainQuote.origin')}
                        </footer>
                    </div>
                </div>
                <hr />

                <Container>
                    <GatherOnline i18n={i18n} t={t} tReady={tReady} />
                    {this.props.updates.length ? (
                        <Updates
                            updates={this.props.updates}
                            i18n={i18n}
                            t={t}
                            tReady={tReady}
                        />
                    ) : null}
                    {this.props.events.length ? (
                        <Events
                            events={this.props.events}
                            i18n={i18n}
                            t={t}
                            tReady={tReady}
                        />
                    ) : null}
                </Container>

                <Giving i18n={i18n} t={t} tReady={tReady} />

                <Container>
                    <PrayerRequest i18n={i18n} t={t} tReady={tReady} />
                    <VisitUs i18n={i18n} t={t} tReady={tReady} />
                </Container>
            </div>
        );
    }
}

export default withTranslation('home')(Homepage);
