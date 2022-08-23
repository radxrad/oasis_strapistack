import React from "react";
import Link from "next/link";
//import NextImage from "./image";
import NextImage from "./image_micropub";
const Card = ({ article }) => {
    return (
        <Link href={`/Read/${article.attributes.slug}`}>
            <a className="uk-link-reset">
                <div className="uk-card uk-card-muted">
                    <div className="uk-card-media-top">
                        { article.attributes.files.data &&

                           <NextImage image={article.attributes.files.data[0]} />
                        }
                    </div>
                    <div className="uk-card-body">
                        <p id="category" className="uk-text-uppercase">
                            {article.attributes.keyword.data?.attributes?.name}
                        </p>
                        <p id="title" className="uk-text-large">
                            {article.attributes.title}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card;
