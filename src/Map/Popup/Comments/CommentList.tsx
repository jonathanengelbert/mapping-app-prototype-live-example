import React from 'react';
import './commentsStyle.scss';
import {Comment} from "./CommentInterface";


const CommentCard = (props: Comment) => {
    return (
        <div className={'comment-card'}>
            <p>"{props.comment}"</p>
            <p><em>By {props.author}</em></p>
        </div>
    )
};

const CommentList = (props: Array<Comment> | any) => {
    return (
        <>
            <h3>Comments</h3>
            <div className={'comment-list'}>
                {
                    props.comments.map((c: Comment) => {
                        return (
                            <CommentCard key={c.id} id={c.id} author={c.author} comment={c.comment}/>
                        )
                    })
                }
            </div>
        </>
    )
};

export default CommentList;