// Examples of popup template to be consumed by makePopupContent (mapUtils.tsx)
// or SidePopup

import React from 'react';
import CommentList from "../Comments";
import {Comment} from "../Comments/CommentInterface";
import PostCommentForm from "../Comments/PostCommentForm";

import './popupModelStyling.scss';

export const popupModelExampleOne = (p: any) => {
    const longName = p.long_name;
    return (`<h1>${longName} </h1>`);
};

export const popupModelExampleTwo = (p: any) => {
    const longName = p.long_name;
    const url = `https://google.com/search?q=${longName}`;
    return (`<div class="popup-two">
               <h2>SOME TITLE HERE</h2>
               <p>This is station:</p>
               <a href="${url}" target="blank">${longName}</a> 
            </div>`);
};

// When designing popup models for SidePopup components, output should be
// a component itself
type ModelProps = {
    properties: any
    comments: Array<Comment> | null;
    setComments: Function;
}

export const PopupModelJSX = (props: ModelProps) => {

    return (
        <div className="side-popup-content">
            <h1>{props.properties.long_name}</h1>
            {
                props.comments && props.comments.length > 0
                    ?
                    <CommentList
                        comments={props.comments}
                    />
                    :
                    null
            }

            <PostCommentForm
                stationId={props.properties.id}
                stationName={props.properties.long_name}
                setComments={props.setComments}
            />
        </div>
    );
};
