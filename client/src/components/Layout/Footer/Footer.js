import React from 'react';

import style from './Footer.module.css';

const footer = () => {
    return (
        <div className={style.Footer}>
            <div className={style.Line}></div>
            <div className={style.Signature}> &copy; Rudic Sanja</div>
        </div>
    );
}

export default footer;