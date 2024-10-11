

import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';


const QRCodeGenerator = ({ link }) => {
  const qrRef = useRef(null);

  const handleDownload = () => {
    if (qrRef.current === null) {
      return;
    }

    toPng(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        saveAs(dataUrl, 'QR-code.png');
        toast.success("QR Code Downloaded Successfully!!! ", { position: "top-center" });

      })
      .catch((err) => {
        console.error('Error generating image', err);
      });
  };

  if (!link) {
    return <p>No link provided for QR Code generation.</p>;
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      {/* <h2 className="text-xl font-semibold mb-4">Scan this QR Code:</h2> */}
      <div ref={qrRef} className="bg-white p-2 rounded">
        <QRCode value={link} size={200} />
      </div>
      <p className="text-gray-700 mt-4">
        Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      </p>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
