import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGroup} from '@fortawesome/free-solid-svg-icons'
import {faBookBookmark} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faGear}  from '@fortawesome/free-solid-svg-icons';


function App() {
    const courses = [
        {
            courseName: 'Software Development II',
            courseSection: '05'
        },
        {
            courseName: 'Digital Media',
            courseSection: '22'
        },
        {
            courseName: 'Introduction to Networks',
            courseSection: '11'
        }
    ]
    return (<div className="grid grid-cols-4 h-screen">
        {/*Sidebar*/}

        <div className='flex flex-col border-gray-200 border-r-2 px-8 py-12 content-center gap-y-8'>

            {/*Sidebar Menu -> Students Section */}
            <a href='#' className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faUserGroup}/>
                <div className='text-gray-500 font-light hover:text-green-600'>Students</div>
            </a>

            {/*Sidebar Menu -> My Courses Section */}
            <div href='#' className='flex flex-row w-full justify-between text-gray-400 text-sm font-light'>
                <div className='uppercase'>MY COURSES</div>
                <button>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
            </div>
            {courses.map((course, index) => {
                return (
                    <a key={index} href='#' className='flex flex-row gap-4 items-center'>
                        <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faBookBookmark}/>
                        <div
                            className='text-gray-500 font-light hover:text-green-600'>{course.courseName} {course.courseSection}</div>
                    </a>
                )
            })}
            {/*Sidebar Menu -> Settings Section*/}
            <div href='#' className='flex flex-row w-full justify-between text-gray-400 text-sm font-light -mb-4'>
                <div>SETTINGS</div>
            </div>

            <a href='#' className='flex flex-row gap-4 items-center'>
                <FontAwesomeIcon className='h-4 w-4 text-gray-600' icon={faGear}/>
                <div className='text-gray-500 font-light hover:text-green-600'>Settings</div>
            </a>


        </div>
        {/*Main Content Area*/}
        <div className='col-span-3'>

        </div>


    </div>);
}

export default App;
