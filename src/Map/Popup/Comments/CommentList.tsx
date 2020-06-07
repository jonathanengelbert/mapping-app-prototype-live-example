import React from 'react';
import './commentsStyle.scss';
import {Comment} from "./CommentInterface";
import CommentForm from "./CommentForm";

const CommentCard = (props: Comment) => {
    return (
        <div className={'comment-card'}>
            <p>"{props.comment}"</p>
            <p><em>By {props.author}</em></p>
            <CommentForm
              buttonName={'update-comment-button'}
              commentId={props.id}
              comment={props.comment}
              setComments={props.setComments}
              stationId={props.stationId}

            />
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
                            <CommentCard
                                key={c.id}
                                id={c.id}
                                author={c.author}
                                comment={c.comment}
                                setComments={props.setComments}
                                stationId={props.stationId}
                            />
                        )
                    })
                }
            </div>
        </>
    )
};

export default CommentList;