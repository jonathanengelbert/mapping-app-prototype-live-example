import React from 'react';
import {PopupModelJSX} from "../popupModels";
import {Comment} from "../Comments/CommentInterface";

import './sidePopupStyles.scss';

type Props = {
    activeFeature: any | null | undefined
    comments: Array<Comment> | null;
    setComments: Function;
}

const SidePopup = (props: Props) => {
    if (props.activeFeature) {
        const {properties} = props.activeFeature || null;
        return (
            <div className={'side-popup'}>
                <div className={'side-popup-content'}>
                    {
                        properties ?
                            <PopupModelJSX
                                properties={properties}
                                comments={props.comments}
                                setComments={props.setComments}
                            />
                            : null
                    }
                </div>
            </div>
        )
    }
    return null;
};

export default React.memo(SidePopup);
