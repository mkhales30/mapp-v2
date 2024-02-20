import Background from '../assets/sign_in_background.jpg'
import "../styles/index.css"
import { Link } from "react-router-dom";

function AuthLayout({ page, children }) {
    return (
        <div className='grid grid-cols-3 w-full h-screen'>

            {/* Sign-up Button */}
            <div className='col-span-3 flex justify-end items-center gap-4 py-2 mx-8'>
                <p>{(page === 'about' || page === 'signIn') ? "Don't" : 'Already'} have an account? </p>
                {page !== 'signIn' && (
                    <Link to={page === 'signUp' ? '/signIn' : '/signUp'}>
                        <button className='px-4 py-2 border border-black rounded-full'>
                            Sign {page === 'signUp' ? 'In' : 'Up'}
                        </button>
                    </Link>
                )}
                {page === 'signIn' && (
                    <>
                        <Link to='/signUp'>
                            <button className='px-4 py-2 border border-black rounded-full'>
                                Sign Up
                            </button>
                        </Link>
                        <Link to='/about'>
                            <button className='px-4 py-2 border border-black rounded-full'>
                                About
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Image */}
            <div
                className="col-span-3 flex flex-col lg:flex-row justify-between items-center gap-20 px-12 lg:px-0"
                style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                width: "100%",
                height: "570px",
                borderRadius: "0px",
                }}
            >
                {/* Title */}
                <div className="text-white px-20 py-5">
                    <h1 className="text-5xl font-bold mb-4">M.A.P.P</h1>
                    <p className="text-lg font-normal mb-8">
                        Mentally and physically present
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className='col-span-3 py-10 max-w-5xl mx-auto'>
                <div className="mx-12">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
