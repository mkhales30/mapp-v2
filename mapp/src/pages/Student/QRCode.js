import React, { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

function QRCode({ studentDocumentId, student }) {
  const [downloadQRCode, setDownloadQRCode] = useState(null);
  const qrcodeRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(studentDocumentId.toString());
  }, [studentDocumentId]);

  // ... other useEffect (unchanged)

  function downloadQRCodeImage() {
    html2canvas(qrcodeRef.current, { width: 250, height: 250 }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `qrcode-${student.firstName}-${student.lastName}.jpeg`;
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    });
  }

  return (
    <div>
      <div ref={qrcodeRef}>
        <QRCodeSVG value={text} size={250} />
      </div>
      <button onClick={downloadQRCodeImage}>Download QR Code</button>
    </div>
  );
}

export default QRCode;