import React, {useEffect, useState} from 'react'
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable'
import ScannerModal from './ScannerModal'

function SessionProfile({session}) {
    const [scannerModal, setScannerModal] = useState(false);

    const toggleScannerModal = () => {
        setScannerModal(!scannerModal);
    }

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
            <div className="flex justify-between">
                <div className="text-2xl font-medium"> Attendance Report</div>
                <button className='bg-black text-xs text-white rounded py-2 px-4'  onClick={toggleScannerModal} >Start Scanning</button>
            </div>
            <SessionsAttendanceTable data={data}/>
            {scannerModal &&
                <ScannerModal toggleModal={toggleScannerModal}/>
            }
        </div>
    )
}

export default SessionProfile
