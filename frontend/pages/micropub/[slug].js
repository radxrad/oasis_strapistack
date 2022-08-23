import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

//import Seo from "../../components/seo";
import Layout from "../../components/Layout";
import Image from 'next/image'

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Micropub = ({ article: micropub, categories }) => {
    const imageUrl = getStrapiMedia(micropub.attributes.image);

    const seo = {
        metaTitle: micropub.attributes.title,
        metaDescription: micropub.attributes.description,
        shareImage: micropub.attributes.image,
        article: true,
    };

    return (
        <Layout categories={categories.data}>

            <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={imageUrl}
                data-srcset={imageUrl}
                data-uk-img
            >
                <h1>{micropub.attributes.title}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <ReactMarkdown children={micropub.attributes.abstract} />
                    <hr className="uk-divider-small" />
                    <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                        <div>
                            {micropub.attributes.writer.data.attributes.picture && (
                                <Image
                                    src={getStrapiMedia(
                                        micropub.attributes.writer.data.attributes.picture
                                    )}
                                    alt={
                                        micropub.attributes.writer.data.attributes.picture.data
                                            .attributes.alternativeText
                                    }
                                    style={{
                                        position: "static",
                                        borderRadius: "20%",
                                        height: 60,
                                    }}
                                />
                            )}
                        </div>
                        <div className="uk-width-expand">
                            <p className="uk-margin-remove-bottom">
                                By {micropub.attributes.writer.data.attributes.name}
                            </p>
                            <p className="uk-text-meta uk-margin-remove-top">
                                <Moment format="MMM Do YYYY">
                                    {micropub.attributes.published_at}
                                </Moment>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const articlesRes = await fetchAPI("/micopublications", { fields: ["slug"] });

    return {
        paths: articlesRes.data.map((article) => ({
            params: {
                slug: article.attributes.slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const articlesRes = await fetchAPI("/micopublications", {
        filters: {
            slug: params.slug,
        },
        populate: ["image", "category", "writer.picture"],
    });
    const categoriesRes = await fetchAPI("/categories");

    return {
        props: { article: articlesRes.data[0], categories: categoriesRes },
        revalidate: 1,
    };
}

export default Micropub;
