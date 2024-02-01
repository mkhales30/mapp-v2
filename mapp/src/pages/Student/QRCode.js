import React, { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';


function QRCode({ studentUID }) {
    const [downloadQRCode, setDownloadQRCode] = useState(null);
    const qrcodeRef = useRef(null); // Define qrcodeRef here
    const [text, setText] = useState("");

  useEffect(() => {
    // Generate the QR code value based on the student's UID
    console.log("Using text for QR code:", studentUID);
    setText(studentUID.toString()); // Ensure string conversion
  }, [studentUID]);

  // Second useEffect to handle potential asynchronous state update
  useEffect(() => {
    console.log("Current text state:", text);
  }, [text]);

  function downloadQRCodeImage() {
    html2canvas(qrcodeRef.current, {width: 250,
        height: 250,}).then((canvas) => {
      const link = document.createElement('a');
      link.download = `qrcode-${studentUID}.jpeg`;
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    });
  }

  return (
    <div>
    <div ref={qrcodeRef}>

      <QRCodeSVG value={text} size={250} />
    </div>
    <button onClick={() => downloadQRCodeImage(studentUID)}>Download QR Code</button>
  </div>
  );
}


export default QRCode;