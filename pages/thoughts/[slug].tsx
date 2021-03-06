import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';

import { GetThoughtResponse, Thought as IThought } from '../../lib/types';
import { useTranslation } from '../../i18n';
import { I18nPage } from '../../i18n';
import {
    getMetaImage,
    formatDate,
    fetchData,
    getImgUrl,
} from '../../lib/helpers';

import { Authors } from '../../components/thoughts/authors';
import Error from '../_error';

interface ThoughtsProps {
    thought: IThought | null;
}

const Thought: I18nPage<ThoughtsProps> = ({ thought }) => {
    if (!thought) {
        return <Error statusCode={404} />;
    }

    const { i18n, t } = useTranslation();

    return (
        <div className="container thought-detail">
            <Head>
                <title key="title">
                    {thought.title} - {t('siteTitle')}
                </title>
                <meta name="description" content={thought.description} />
                <meta
                    name="thumbnail"
                    content={getMetaImage(thought.image_url)}
                />
            </Head>
            <picture>
                <source
                    srcSet={getImgUrl(thought.image_url, 400, 200)}
                    media="(max-width: 420px)"
                />
                <source
                    srcSet={getImgUrl(thought.image_url, 510, 250)}
                    media="(max-width: 767px)"
                />
                <source
                    srcSet={getImgUrl(thought.image_url, 700, 300)}
                    media="(max-width: 990px)"
                />
                <source
                    srcSet={getImgUrl(thought.image_url, 950, 400)}
                    media="(max-width: 1200px)"
                />
                <source
                    srcSet={getImgUrl(thought.image_url, 1100, 400)}
                    media="(min-width: 1201px)"
                />
                <img
                    src={getImgUrl(thought.image_url, 400)}
                    alt={thought.image_description}
                    className="header-image"
                />
            </picture>

            <h1 className="title capitalize text-xxxl">{thought.title}</h1>

            <Authors
                authors={thought.authors}
                date={formatDate(
                    thought.date,
                    ['month', 'day', ',', 'year'],
                    i18n.language,
                )}
            />

            <div
                className="body"
                dangerouslySetInnerHTML={{ __html: thought.thought_html }}
            />

            <div className="clear" />
        </div>
    );
};

Thought.getInitialProps = async ({ query, req, res }: NextPageContext) => {
    const thought = await fetchData<GetThoughtResponse>(
        `thoughts/${query.slug}`,
        req,
    );

    if (!thought && res) {
        res.statusCode = 404;
    }

    return { thought, namespacesRequired: ['common'] };
};

export default Thought;
