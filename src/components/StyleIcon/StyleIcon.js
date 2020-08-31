import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styleIconMap = {
    'default': null
}

export default function StyleIcon({ style='default' }){
    return styleIconMap[style]
}