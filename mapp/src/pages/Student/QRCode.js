// QRCode.js
import React, {useEffect, useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';

function QRCode({studentUID}) {
    const [text, setText] = useState("");

    useEffect(() => {
        // Generate the QR code value based on the student's UID
        setText(studentUID);
    }, [studentUID]);

    return (
        <div>
            <input placeholder="UID" readOnly value={studentUID}/>
            <br/>
            <QRCodeSVG value={text} size={250}/>
        </div>
    );
}

export default QRCode;
