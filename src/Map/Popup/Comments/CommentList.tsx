import React, {useEffect} from 'react';
import './commentsStyle.scss';
import {Comment} from "./CommentInterface";
import CommentForm from "./CommentForm";
import {deleteOneComment, getComments} from "../../../utils/helpers";

const CommentCard =  (props: Comment) => {
    async function handleDelete() {
        const {stationId, setComments, id} = props;
        const statusCode = await deleteOneComment(id);
        if (statusCode === '0') {
            getComments(stationId, setComments);
        }
    }

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
            <button
                className={'delete-comment-button'}
                onClick={() => handleDelete()}
            >Delete Comment
            </button>
        </div>
    )
};

const CommentList = (props: Array<Comment> | any) => {
    useEffect(() => {
    }, [props.comments]);
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