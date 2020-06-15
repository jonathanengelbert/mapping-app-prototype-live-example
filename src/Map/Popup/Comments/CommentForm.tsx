import React, {useState} from 'react';
import Modal from "@material-ui/core/Modal";
import {getComments} from "../../../utils/helpers";
import Snackbar from '@material-ui/core/Snackbar';

import './postCommentForm.scss';

// BASE API ENDPOINT
const baseApiEndpoint = process.env.REACT_APP_MAPPING_API_BASE_URL;

type CommentFormProps = {
    // buttonName defines class and bu
    // form, styling and label is applied to it
    buttonName: string;
    stationId?: number;
    stationName?: string;
    commentId?: number;
    comment?: string;
    setComments?: Function;
}

const CommentForm = (props: CommentFormProps) => {
    // modal state
    const [userComment, setUserComment] = useState<string>('');
    const [userAuthor, setUserAuthor] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState<string | null>(null);
    // snack state
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');


    async function handlePostSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (userAuthor && userComment) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stationId: props.stationId, comment: userComment, author: userAuthor})
            };
            await fetch(`${baseApiEndpoint}/post-comment`, requestOptions)
                .then(response => response.json())
                .then(data => postTrigger(data))
                .catch((error) => console.log(error));
        }
    }

    async function handleUpdateSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (userComment) {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({comment: userComment, commentId: props.commentId})
            };
            await fetch(`${baseApiEndpoint}/update-comment`, requestOptions)
                .then(response => response.json())
                .then(data => updateTrigger(data))
                .catch((error) => console.log(error));
        }
    }

    function postTrigger(data: any) {
        setSnackMessage(data.message);
        setOpenSnack(true);

        if (data.statusCode === '0' && props.setComments && props.stationId) {
            getComments(props.stationId, props.setComments);
            return handleModalClose();
        }
    }

    function updateTrigger(data: any) {
        setSnackMessage(data.message);
        setOpenSnack(true);

        if (data.statusCode === '0' && props.stationId && props.setComments) {
            getComments(props.stationId, props.setComments);
            return handleModalClose();
        }
    }

    function handleChange(e: any) {
        if (e.target.name === 'comment') {
            setUserComment(e.target.value);
        }

        if (e.target.name === 'author') {
            setUserAuthor(e.target.value);
        }
    }

    function handleModalClose() {
        setOpen(false);
        setUserAuthor('');
        setUserComment('');
        setFormType(null);
    }

    function handleSnackClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
        setOpenSnack(false);
    }

    function handleModalOpen(e: any) {
        const currentForm = e.target.name;
        setFormType(currentForm);
        setOpen(true);
    }

    const buttonLabel = props.buttonName === 'post-comment-button'
        ? 'Post a comment about this station'
        : 'Update comment';

    const PostCommentForm = (
        <div className={"comment-form"}>
            <h3>
                Post a comment about station <em> {props.stationName}</em>
            </h3>
            <form
                name={'post-comment-form'}
                onSubmit={handlePostSubmit}
            >
                <label>
                    Comment:
                    <input type="text" name="comment" placeholder={"Comment"} onChange={handleChange}/>
                </label>
                <label>
                    Author:
                    <input type="text" name="author" placeholder={"Author"} onChange={handleChange}/>
                </label>
                <input type="submit" value={"Post Comment"}/>
            </form>
        </div>
    );

    const UpdateCommentForm = (
        <div className={"comment-form"}>
            <h3>
                Update comment about station <em> {props.stationName}</em>
            </h3>
            <form onSubmit={handleUpdateSubmit}>
                <label>
                    Comment:
                    <input type="text" name="comment" placeholder={"Comment"} onChange={handleChange}/>
                </label>
                <input type="submit" value={"Post Comment"}/>
            </form>
        </div>
    );

    const currentForm = formType === 'post-comment-button'
        ? PostCommentForm
        : UpdateCommentForm;

    return (
        <>
            <button
                name={props.buttonName}
                className={props.buttonName}
                type="button"
                onClick={handleModalOpen}
            >
                {buttonLabel}
            </button>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {currentForm}
            </Modal>
            <Snackbar
                open={openSnack}
                onClose={handleSnackClose}
                message={snackMessage}
                autoHideDuration={5000}
            />
        </>
    )
};

export default CommentForm;