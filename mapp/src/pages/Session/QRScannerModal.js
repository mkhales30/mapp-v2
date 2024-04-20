import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
import {Html5QrcodeScanner} from 'html5-qrcode'
import '../../styles/scanner.css'
import {recordAttendance} from "../../firebase/firestore";

function QRScannerModal({toggleModal, courseId, sessionId, isDarkMode}) {
    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 290,
                height: 200,
            }, fps: 0.5
        }, true)

        function failure(error) {

        }

        function success(studentID) {
            recordAttendance(courseId, studentID, sessionId)
            setScanResult(studentID)
        }

        scanner.render(success, failure);

    }, [])

    function closeScanner() {
        // const video = document.querySelector('video');
        //
        // // A video's MediaStream object is available through its srcObject attribute
        // const mediaStream = video.srcObject;
        //
        // // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
        // const tracks = mediaStream.getTracks();
        //
        // // Or stop all like so:
        // tracks.forEach(track => track.stop())
        toggleModal()
    }


    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
            <div className={`relative flex flex-col gap-4 min-w-[500px] max-h-[500px] p-8 rounded ${isDarkMode ? 'bg-gray-300' : 'bg-white'} ${isDarkMode ? 'text-black' : ''}`}>
                    <p className="text-2xl text-center">Scanning Students...</p>
                    <button>
                        <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={() => closeScanner()}
                                         icon={faX}/>
                    </button>
                    {scanResult ?
                        <div><span className="text-green-500">{scanResult}</span> has been scanned.</div> :
                        <div id="reader" className='p-4'></div>
                    }
                </div>

            </div>
        </div>
    )
}

export default QRScannerModal