import Background from '../assets/sign_in_background.jpg'
import "../styles/index.css"
import {Link} from "react-router-dom";

function AuthLayout({page, children}) {
    return (
        <div className='grid grid-cols-3 max-w-screen-2xl h-screen'>

            < div className={page !== 'about' ? 'col-span-2 mx-8' : 'col-span-3'}>
                <div
                    className={page !== 'about' ? 'flex flex-row w-full justify-between items-center gap-4 py-4 mb-28' : 'flex flex-row w-full justify-between items-center gap-4 py-1'}>
                    <div class="font-bold ml-4 text-xl italic">
                        MAPP
                    </div>
                    <div className="flex items-center gap-2">
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

                </div>

                {page === 'about' && (
                    <div>
                        <img className='relative h-[500px] w-full object-cover' src={Background} alt='empty classroom'/>
                        <div className="absolute top-52  text-white px-20 py-5">
                            <h1 className="text-6xl font-bold mb-2">MAPP</h1>
                            <p className="text-lg font-light mb-8">
                                Mentally and physically present
                            </p>
                            <a className="bg-black/70 py-4 px-6 rounded" href="/signIn">
                                Get Started
                            </a>
                        </div>
                    </div>

                )
                }

                <div className="mx-12">
                    {children}
                </div>

            </div>

            {/*Image*/}
            {
                page !== 'about' && (
                    <div>
                        <img className='h-full object-cover' src={Background} alt='empty classroom'/>
                    </div>
                )
            }
        </div>
    );
}

export default AuthLayout;
