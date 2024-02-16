import React, {useEffect, useState} from 'react'
import SessionsAttendanceTable from '../../tables/SessionsAttendanceTable'
import ScannerModal from './ScannerModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'

function SessionProfile({session,course}) {
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
            <div className='bg-blue-50  text-blue-900 flex p-4 rounded gap-4 mb-4 items-center border-2 border-blue-500/20'>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p className='text-sm'>{course.courseStart ?'This class is scheduled to start at <span>{course.courseStart}</span>' : "Begin scanning, by clicking the 'Start Scanning' button " }</p>

            </div>
            <div className="flex justify-between">
                <div className="text-2xl font-medium"> Attendance Report</div>
                <button className='bg-black text-sm text-white rounded py-2 px-4'  onClick={toggleScannerModal} >Start Scanning</button>
            </div>
            <SessionsAttendanceTable data={data}/>
            {scannerModal &&
                <ScannerModal toggleModal={toggleScannerModal}/>
            }
        </div>
    )
}

export default SessionProfile
