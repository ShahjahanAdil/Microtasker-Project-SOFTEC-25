import React from 'react'
import './home.css'
import img1 from '../../../assets/images/img1.png'
import img2 from '../../../assets/images/RATES.png'
import img3 from '../../../assets/images/cash.png'
import img4 from '../../../assets/images/SUPPORT.png'
import img5 from '../../../assets/images/Stats.png'
import img6 from '../../../assets/images/img6.png'
import img7 from '../../../assets/images/img7.png'
import img8 from '../../../assets/images/img8.png'
import img9 from '../../../assets/images/bankTransfer.png'
import img10 from '../../../assets/images/img10.png'
import img11 from '../../../assets/images/img11.png'
import imgwavy from '../../../assets/images/imgwavy.png'
import { TbDeviceMobileDollar } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";

export default function Home() {
    return (
        <>
            <div className="home-container hero-section w-full flex gap-5 justify-between items-center">
                <div className="hero-left">
                    <p className='bg-blue-50 !text-[#5271ff] rounded-[5px] px-2 py-1 w-fit mb-10'>Microtasker</p>
                    <h1 className='leading-none mb-5 font-bold'>Turn Your Free Time Into Real <span className='txt-gradient'>Earnings</span></h1>
                    <p className='hero-p !text-[18px]'>Join MicroTasker and get paid for completing quick, skill-based tasks online. Whether you're a student,
                        freelancer, or just looking to earn on the side —we've got tasks for you!</p>
                    <div className='icons flex gap-10 mt-20'>
                        <p className='flex gap-2 items-center'><TbDeviceMobileDollar className='text-[#5271ff]' /> Highest rates</p>
                        <p className='flex gap-2 items-center'><IoWalletOutline className='text-[#5271ff]' /> Instant payouts</p>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={img1} alt="hero-section-img" className='' />
                </div>
            </div>

            <div>
                <img src={imgwavy} className='wavy-header' />
            </div>
            <div className='clip-path '>
                <h2 className='mb-20 text-center font-bold px-5'>Awesome <span className='txt-gradient'>Features</span></h2>
                <div className='back-img'>
                    <div className='features grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto px-4'>
                        <div className='floating-img1 flex flex-col items-center'>
                            <img src={img2} alt='Rates' />
                            <p className='font-bold !text-base text-center mt-5'>HIGHEST RATES</p>
                        </div>
                        <div className='floating-img2 flex flex-col items-center'>
                            <img src={img3} alt='Cash' />
                            <p className='font-bold !text-base text-center mt-5'>INSTANT PAYOUT</p>
                        </div>
                        <div className='floating-img1 flex flex-col items-center'>
                            <img src={img4} alt='Support' />
                            <p className='font-bold !text-base text-center mt-5'>24/7 SUPPORT</p>
                        </div>
                        <div className='floating-img2 flex flex-col items-center'>
                            <img src={img5} alt='Stats' />
                            <p className='font-bold !text-base text-center mt-5'>Detailed Stats</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <img src={img6} alt='Wavy' />
            </div>
            <div className='items-center gap-10 mt-10 mb-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-7xl mx-auto px-4'>
                <div>
                    <div className='bubbles floating-bubbles'></div>
                    <img src={img7} alt='Png' className='work-img w-full mx-auto object-contain' />
                </div>
                <div className='ml-5 how-works'>
                    <h1 className='font-bold'>How It <span className='txt-gradient'>Works</span></h1>
                    <p className='!text-lg mb-5'>Microtasker  is a completely free tool where you can do tasks and get paid.</p>
                    <div className='flex items-center'>
                        <div className='counting'>1</div>
                        <div className='py-2'>
                            <h3 className='font-bold !text-xl'>CREATE AN ACCOUNT</h3>
                            <p className='working-paragraph !text-base'>In order to get started with MicroTasker, at first all you need is MicroTasker Account & you can create it by sign-up option.</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='counting'>2</div>
                        <div className='py-2'>
                            <h3 className='font-bold !text-xl'>DO TASKS</h3>
                            <p className='working-paragraph !text-base'>Do the tasks with MicroTasker you want to do, you can use options in Dashboard. </p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='counting'>3</div>
                        <div className='py-2'>
                            <h3 className='font-bold !text-xl'>EARN MONEY</h3>
                            <p className='working-paragraph !text-base'>Now you are ready for doing tasks, complete the task as best as possible and earn money.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-center pb-5'>
                <div className='back-img grid'>
                    <div className='payment-methods'>
                        <h2 className='mb-5 px-5 font-bold'>Multiple <span className='txt-gradient'>Payment</span> Methods</h2>
                        <p className='!text-base px-5 mb-10'>You can receive your money from anyplace because we accept payments from all nations.</p>
                    </div>
                    <div className='my-15 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 max-w-6xl mx-auto gap-20 '>
                        <div className='flex justify-center'>
                            <img src={img8} alt='Rates' className='payment-img floating-img1' />
                        </div>
                        <div className='flex justify-center'>
                            <img src={img9} alt='Cash' className='payment-img floating-img2 mt-5' />
                        </div>
                        <div className='flex justify-center'>
                            <img src={img10} alt='Support' className='payment-img floating-img1' />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <img src={img6} className='wavy-img' />
            </div>
            <div className='gap-10 my-30 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto max-w-7xl px-5 py-4'>
                <div>
                    <div className='bubbles floating-bubbles'></div>
                    <img src={img11} alt='Png' className='join-img w-full max-w-md mx-auto object-contain' />
                </div>
                <div>
                    <h1>Why Join <span className='main-heading'>Us?</span></h1>
                    <p className='!text-base mb-5 !font-medium leading-7 working-paragraph'>All legitimate visits you bring to Microtasker will be counted up to 2 visits per IP every 24 hours. You will earn more with MicroTasker thanks also to our exclusive AdBlocks stop tools.</p>
                    <div className='flex items-center'>
                        <div className="w-2 h-2 bg-[#333] rounded-full mx-2"></div>
                        <p className='!text-lg !text-[#333]'>Available 24/7/365</p>
                    </div>
                    <div className='flex items-center'>
                        <div className="w-2 h-2 bg-[#333] rounded-full mx-2"></div>
                        <p className='!text-lg !text-[#333]'>Statistics on RealTime</p>
                    </div>
                    <div className='flex items-center'>
                        <div className="w-2 h-2 bg-[#333] rounded-full mx-2"></div>
                        <p className='!text-lg !text-[#333]'>Punctuality in Payments</p>
                    </div>
                </div>
            </div>
        </>
    )
}