// test if object is empty
export function isEmpty(obj: Object) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// LAYER HANDLING
// async fuction to retrieve layer from an endpoint
export const getLayer: Function = async (url: string, id: string, setter: Function) => {
    // handle abscence of parameters
    if (!id || !url) {
        throw new Error ('Layer ID or URL missing. ' +
            'Did you pass these values when requesting the layer?');
    }
    const response = await fetch(url);
    const processing = await response.json();
    processing.id = id;
    return processing;
};

// COMMENTS HANDLING
export const getComments = async (stationId: number | undefined, setter: any) => {
    const commentsUrl = 'http://localhost:8001/get-comments';

    const response = await fetch(`${commentsUrl}?stationId=${stationId}`);
    const comments =  await response.json();
    setter(comments);
};

export const deleteOneComment = async (commentId: number) => {
    let statusCode;
    if (commentId) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({commentId: commentId})
        };
        await fetch('http://localhost:8001/delete-comment', requestOptions)
            .then(response => response.json())
            .then((data) => statusCode = data.statusCode)
            .catch((error) => error);
    }
    return statusCode;
};
