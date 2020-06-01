import React from 'react';
import {PopupModelJSX} from "../popupModels";
import {Comment} from "../Comments/CommentList";

import './sidePopupStyles.scss';

// TODO: implement useEffect to stop rerenderings based on props.activeFeature

type Props = {
    activeFeature: any | null | undefined
    comments: Array<Comment> | null;
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
                            />
                            : null
                    }
                </div>
            </div>
        )
    }
    return null;
};

export default SidePopup;
