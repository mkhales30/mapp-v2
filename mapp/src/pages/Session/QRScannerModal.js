import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faX} from '@fortawesome/free-solid-svg-icons'
import {recordAttendance} from '../../firebase/firestore'
import {Html5QrcodeScanner} from 'html5-qrcode'
import '../../styles/scanner.css'

function QRScannerModal({toggleModal, courseId, sessionId}) {
    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 290,
                height: 200,
            }, fps: 0.5
        }, true)

        scanner.render(success)

        function success(studentID) {
            recordAttendance(courseId, studentID, sessionId)
            setScanResult(studentID)
        }
    }, [])


    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div
                    className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
                    <p className="text-2xl text-center">Scanning Students...</p>
                    <button>
                        <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal}
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