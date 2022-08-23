import React from "react";
import { Card } from "react-bootstrap";
import parse from 'html-react-parser'
import  Image from 'next/image'
import Link from 'next/link'
import NextImage from "./image_micropub";
export default function MicropubCard({micropub}) {
    var mpid = micropub.attributes.slug
    var article = micropub

    return (
      <Link href={`/Read/${mpid}`} passHref>
          <Card className="micropub" >

          <div className="content">

              {article.attributes.image &&

                  <NextImage image={article.attributes.image} />
              }
            <Card.Body>
              <Card.Title>{parse (article.attributes.title) }</Card.Title>
              <Card.Text as="div" >{parse (article.attributes.abstract)}</Card.Text>
                <Card.Text as="div" >{parse (article.attributes.body)}</Card.Text>
            </Card.Body>
          </div>
          <div className="authors">
            {/* {micropub.authors
              ? micropub.authors.map((author) => (
                  <Card.Link href={author.link} key={author.id}>
                    <img src={author.img} className="avatar--sm" alt="avatar" />
                    {author.name}
                  </Card.Link>
                ))
              : ""} */}
          </div>

    </Card>
      </Link>
  );
}
