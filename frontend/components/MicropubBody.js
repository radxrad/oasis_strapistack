import React from "react";
import { ListGroup } from "react-bootstrap";
import  Image from 'next/image'
import parse from 'html-react-parser'

export default function MicropubBody(props) {
    const { title, figure, body, refList } = props;
    return (
        <div className="micropub-body">
            <div className="heading">{parse (title) }</div>
            <div className="content">
                {figure &&
                <Image src={figure} alt="figure" height="100" width="100"></Image>
                }
                <div className="text" >{parse (body) }</div>
                <ListGroup className="ref-list">
                    {refList && refList.length > 0 ? (
                        <h6 className="heading">References</h6>
                    ) : (
                        ""
                    )}
                    {refList
                        ? refList.map((item, i) => (
                            <ListGroup.Item id={"ref-item-" + (i + 1)} key={i}>
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                            </ListGroup.Item>
                        ))
                        : ""}
                </ListGroup>
            </div>
        </div>
    );
}
