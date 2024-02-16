import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Html5QrcodeScanner} from 'html5-qrcode'
import {faQrcode} from '@fortawesome/free-solid-svg-icons'
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable'
import SecondaryButton from '../../components/SecondaryButton'

function SessionProfile({session}) {

    const [scanResult, setScanResult] = useState(null)
    const [manualSerialNumber, setManualSerialNumber] = useState('')

    useEffect(() => {
        // const scanner = new Html5QrcodeScanner('reader', {
        //     qrbox: {
        //         width: 200,
        //         height: 200,
        //     }, fps: 5
        // })

        // scanner.render(success, error)

        function success(result) {
            setScanResult(result)
        }

        function error(err) {
            console.warn(err)
        }
    }, [])

    const data = [
        {
            id: 1,
            lastName: 'Khawaja',
            firstName: 'Duaa',
            status: 'Absent',
            in: '3:00pm',
            note: 'Left early for event'
        },
        {
            id: 2,
            lastName: 'Moore',
            firstName: 'Amber',
            status: 'Present',
            in: '3:01pm',
            note: 'Arrived late'
        }

    ]

    return (
        <div className="mx-12 py-4">
            {/*<div className="grid grid-cols-2 gap-2">*/}
            {/*    <div className="col-span-1 row-span-1 flex flex-col text-gray-900 bg-gray-200 px-4 py-4 rounded-3xl">*/}
            {/*        <FontAwesomeIcon className="h-6 w-6 pb-6" icon={faQrcode}/>*/}
            {/*        <div className="font-light">Scan in Students</div>*/}
            {/*        {scanResult ?*/}
            {/*            <div> Success: <a className="text-green-500" href={scanResult}>{scanResult}</a></div> :*/}
            {/*            <div id="reader"></div>}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex justify-between">
                <div className="text-2xl font-medium"> Attendance Report</div>
                <button className='bg-black text-sm text-white rounded py-2 px-4'>Start Scanning</button>
            </div>
            <SessionsAttendanceTable data={data}/>
        </div>
    )
}

export default SessionProfile
