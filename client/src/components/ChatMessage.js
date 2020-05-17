import React, {useContext} from 'react';
import styled from 'styled-components';

const MessageBubble = (props) => {
    return (
        <div style={{margin: "10px"}}>
            <p style={{color: "magenta", fontWeight: "bold"}}>{props.username}</p>
            <p>{props.message}</p>
        </div>
    )
}

export default MessageBubble;