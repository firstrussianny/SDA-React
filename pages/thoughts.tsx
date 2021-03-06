import { WithTranslation } from 'react-i18next';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { Thought, ReqParams, ListThoughtsResponse } from '../lib/types';
import { Pagination } from '../components/shared/Pagination.component';
import { ThoughtTile } from '../components/thoughts/thoughtTile';
import { fetchData, getPageCount } from '../lib/helpers';
import { DEFAULT_PAGE_SIZE } from '../lib/config';
import { withTranslation } from '../i18n';

interface ThoughtsProps extends WithTranslation {
    thoughts: Thought[];
    totalPages: number;
    count: number;
}

interface ThoughtsState {
    thoughts: Thought[];
    page: number;
    totalPages: number;
    count: number;
    isLoading: boolean;
}

class Thoughts extends React.Component<ThoughtsProps, ThoughtsState> {
    constructor(props: ThoughtsProps) {
        super(props);

        this.state = {
            thoughts: [],
            page: 1,
            totalPages: 1,
            count: 0,
            isLoading: true,
        };
    }

    static async getInitialProps({ req }: NextPageContext) {
        const data = await fetchData<ListThoughtsResponse>('thoughts', req, {
            page_size: DEFAULT_PAGE_SIZE,
        });

        if (data && 'results' in data) {
            return {
                thoughts: data.results,
                count: data.count,
                namespacesRequired: ['common'],
                totalPages: getPageCount(data.count, DEFAULT_PAGE_SIZE),
            };
        }

        return {
            thoughts: [],
            count: 0,
            namespacesRequired: ['common'],
            totalPages: 0,
        };
    }

    componentDidMount() {
        const { thoughts, count, totalPages } = this.props;
        this.setState({ thoughts, count, totalPages, isLoading: false });
    }

    paginate = async () => {
        const params = {
            page_size: DEFAULT_PAGE_SIZE,
            page: this.state.page,
        } as ReqParams;
        const data = await fetchData<ListThoughtsResponse>(
            'thoughts',
            null,
            params,
        );

        if (data) {
            this.setState({
                thoughts: data.results,
                count: data.count,
            });
        } else {
            console.error('Invalid response');
        }
    };

    updatePage = (page: number) => {
        this.setState({ page }, this.paginate);
    };

    render() {
        return (
            <div className="container thoughts-page">
                <Head>
                    <title>
                        {this.props.t('header.thoughts')}
                        &nbsp;-&nbsp;
                        {this.props.t('siteTitle')}
                    </title>
                </Head>

                <h1 className="text-center capitalize my-3">
                    {this.props.t('header.thoughts')}
                </h1>
                {this.state.thoughts.map(thought => (
                    <ThoughtTile
                        key={thought.id}
                        thought={thought}
                        t={this.props.t}
                        i18n={this.props.i18n}
                        tReady={this.props.tReady}
                    />
                ))}
                {this.state.count > DEFAULT_PAGE_SIZE && (
                    <Pagination
                        updatePage={this.updatePage}
                        curPage={this.state.page}
                        pageCount={this.state.totalPages}
                    />
                )}
            </div>
        );
    }
}

export default withTranslation('common')(Thoughts);
