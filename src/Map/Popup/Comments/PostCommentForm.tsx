import React, {useState} from 'react';
import Modal from "@material-ui/core/Modal";
import { getComments } from "../../../utils/helpers";
import Snackbar from '@material-ui/core/Snackbar';


import './postCommentForm.scss';

const PostCommentForm = (props: any) => {
    // modal state
    const [userComment, setUserComment] = useState<string>('');
    const [userAuthor, setUserAuthor] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    // snack state
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('');

    function handleChange(e: any) {
        if (e.target.name === 'comment') {
            setUserComment(e.target.value);
        }

        if (e.target.name === 'author') {
            setUserAuthor(e.target.value);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (userAuthor && userComment) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({stationId: props.stationId, comment: userComment, author: userAuthor})
            };
            await fetch('http://localhost:8001/post-comment', requestOptions)
                .then(response => response.json())
                .then(data => postTrigger(data))
                .catch((error) => console.log(error));
        }
    }

    function postTrigger (data:any) {
        setSnackMessage(data.message);
        setOpenSnack(true);

        if(data.statusCode === '0') {
            getComments(props.stationId, props.setComments);
            return handleModalClose();
        }
    }

    function handleModalClose() {
        setOpen(false);
        setUserAuthor('');
        setUserComment('');
    }

    function handleSnackClose (event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
        setOpenSnack(false);
    }

    function handleModalOpen() {
        setOpen(true);
    }

    const commentForm = (
        <div className={"comment-form"}>
            <h3>
                Post a comment about station
                <em> {props.stationName}</em>
            </h3>
            <form onSubmit={handleSubmit}>
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

    return (
        <>
            <button type="button" onClick={handleModalOpen}>
                Post a comment about this station
            </button>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {commentForm}
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

export default PostCommentForm;