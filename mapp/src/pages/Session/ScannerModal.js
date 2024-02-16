import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQrcode, faX} from '@fortawesome/free-solid-svg-icons'
import {Html5QrcodeScanner} from 'html5-qrcode'

function ScannerModal({toggleModal}) {
    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 290,
                height: 200,
            }, fps: 5
        })

        scanner.render(success, error)

        function success(result) {
            setScanResult(result)
        }

        function error(err) {
            console.warn(err)
        }
    }, [])
    return (
        <div className='h-full w-full top-0 left-0 right-0 bottom-0 fixed z-30'>
            <div
                className="bg-black opacity-80 h-full w-full top-0 left-0 right-0 bottom-0 fixed"></div>
            <div className="absolute grid h-screen w-screen place-items-center">
                <div
                    className="relative flex flex-col gap-4 bg-white min-w-[500px] max-h-[500px] p-8 rounded">
                    <p className="text-2xl text-center">Scanning Students</p>
                    <button>
                        <FontAwesomeIcon className={" absolute top-2 right-2 w-3 h-3"} onClick={toggleModal}
                                         icon={faX}/>
                    </button>
                    <div className="col-span-1 row-span-1 flex flex-col text-gray-900 border px-4 py-4">
                        {scanResult ?
                            <div> Success: <a className="text-green-500" href={scanResult}>{scanResult}</a> has been Scanned in</div> :
                            <div id="reader"></div>
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ScannerModal