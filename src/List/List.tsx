import React, {useCallback, useState} from 'react';

import './list.scss';
import {MapboxGeoJSONFeature} from "mapbox-gl";
import {getComments} from '../utils/helpers';
import {CircularProgress} from "@material-ui/core";

type Props = {
    data: any;
    setActiveFeature: Function;
    activeFeature: any | null;
    setComments: any | null;
}

const List: React.FC<Props> = (props: Props) => {
    const [userInput, setUserInput] = useState<string | null>();

    const activateListItem = useCallback((f: MapboxGeoJSONFeature, e: any) => {
        // used to highlight item list, pan map, open popup and feed data
        props.setActiveFeature(f);
        // used to get comments specific to clicked station
        if (f.properties && f.properties.id) {
            return getComments(f.properties.id, props.setComments);
        }
    }, [props]);


    function filterList(e: { target: { value: any; }; }) {
        if (e.target.value.length < 1) {
            return setUserInput(null);
        }
        const userInput = e.target.value;
        return setUserInput(userInput);
    }


    const listItem = (feature: any) => {
        return (
            <li
                className={
                    props.activeFeature && props.activeFeature.properties.id
                    === feature.properties.id ? 'active' : ''}
                key={feature.properties.id}
                onClick={e => activateListItem(feature, e)}

            >{feature.properties.long_name}</li>
        )
    };

    return (
        <div>
            <div className={'filter-list-container'}>
            <input onChange={filterList}/>
            </div>
            <ul>
                {
                    props.data[0]
                        ?
                        props.data[0].features.map((f: any) => {
                            if (!userInput) {
                                return listItem(f);
                            }
                            // name of list label must be entered here
                            if (f.properties.long_name.toLowerCase().includes(userInput.toLowerCase())) {
                                return listItem(f);
                            }
                            return null;
                        })
                        : <CircularProgress className={'spinning-wheel-blue'}/>
                }
            </ul>
        </div>
    )
};

export default List;