import React from 'react'
import './policies.css'

export default function Policies() {
    return (
        <>
            <div className='flex justify-center my-10'>
                <h1 className='txt-gradient inline-block'>Privacy Policies</h1>
            </div>

            <div className='policies-container'>
                <p className='text-start text-black !text-base font-bold'>Privacy Policy (Last Updated ;Thursday, April 24, 2025 )</p>
                <h2 className='text-center font-bold my-4'>MicroTasker Privacy Policy</h2>
                <p className='!text-base'>This Privacy Policy describes the policies and procedures of MicroTasker regarding the collection, use, security, and disclosure of your personal information. It also describes your rights and choices regarding access, use, correction, and deletion of your personal information.</p>
                <div className='my-3'>
                    <p className='!text-lg font-bold !text-black'>1. Scope</p>
                    <p className='!text-base'>This Privacy Policy applies to all personal information we collect when you access and use MicroTasker’s website, mobile applications, or services.
                        This includes when you create an account, complete tasks, withdraw earnings, or interact with our content.
                        This policy does not cover third-party websites, services, or apps that may be linked to or accessible via our platform. We encourage you to review their respective privacy policies separately.
                    </p>
                </div>
                <div className='my-3'>
                    <p className='!text-lg font-bold !text-black '>2. Information We Collect</p>
                    <p className='!text-base'>We collect information you provide directly, information automatically collected during your use of our Services, and information from third parties.</p>
                    <p className='!text-lg font-bold !text-black py-2'>2.1. Information You Provide</p>
                    <p className='!text-base'>When you register, perform tasks, or use other features, we may collect:
                        Name,Email address,Username and password,Phone number,Government ID (for verification, if required)
                        Payment details (e.g., PayPal, bank account info for payouts),Profile picture (optional),Submitted work, reviews, and feedback</p>
                    <p className='!text-lg font-bold !text-black py-2'>2.2. Information We Collect Automatically </p>
                    <p className='!text-base'>When you use the Services, we collect:</p>
                    <ul className='list-disc list-inside text-gray-700 space-y-2 mt-4' style={{ fontFamily: "Barlow" }}>
                        <li>IP address and geolocation</li>
                        <li>Device and browser information</li>
                        <li>Usage logs (task history, login times, etc.)</li>
                        <li>Cookies and similar tracking technologies.</li>
                        <li>Referral links and sharing activity</li>
                    </ul>
                </div>
                <div className='my-3'>
                    <p className='!text-lg font-bold !text-black py-2'>3. How We Use Your Information</p>
                    <p className='!text-base'>We use your data to Operate, maintain, and improve MicroTasker.</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4" style={{ fontFamily: "Barlow" }}>
                        <li>Verify your identity and eligibility to perform tasks.</li>
                        <li> Match you with tasks and opportunities</li>
                        <li>  Track task performance and earnings.</li>
                        <li> Process payments and withdrawals.</li>
                        <li> Prevent fraud and ensure fair use.</li>
                        <li>Send important communications (e.g., updates, alerts).</li>
                        <li> Personalize your experience.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>
                </div>
                <div className='my-3'>
                    <p className='!text-lg font-bold !text-black py-2'>4. Payments & Financial Information</p>
                    <p className='!text-base'>We use third-party providers to process all financial transactions (e.g., Easypaisa, Jazzcash, or bank APIs). We do not store your full payment credentials on our servers. All payment data is encrypted and handled securely through authorized payment processors.</p>
                </div>
                <div className='mb-3'>
                    <p className='!text-lg font-bold !text-black py-2'>5. Cookies and Tracking Technologies</p>
                    <p className='!text-base'>MicroTasker uses cookies and similar technologies to:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4" style={{ fontFamily: "Barlow" }}>
                        <li>Keep users logged in</li>
                        <li>Understand site usage</li>
                        <li>Deliver and measure ads (if applicable)</li>
                        <li>Improve user experience</li>
                    </ul>
                    <p className='!text-base'>
                        You may disable cookies through your browser settings, but certain features may be affected.
                    </p>
                </div>
                <div className='mb-3'>
                    <p className='!text-lg font-bold !text-black py-2'>6. Third-Party Integrations</p>
                    <p className='!text-base'>If you link your account with third-party platforms (e.g., Google or Facebook login), we may receive certain information based on your settings on those platforms. We do not control what they share; please check their policies separately.</p>
                </div>
                <div>
                    <p className='!text-lg font-bold !text-black py-2'>7. Data Retention</p>
                    <p className='!text-base'>We retain your personal data as long as:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4" style={{ fontFamily: "Barlow" }}>
                        <li>You have an active account</li>
                        <li>It's required to provide Services</li>
                        <li>It's necessary for legal, tax, or audit purposes</li>
                    </ul>
                    <p className='!text-base'>When no longer needed, your data is securely deleted or anonymized.</p>
                </div>
                <div className='mt-3 mb-12'>
                    <p className='!text-lg font-bold !text-black pt-2 '>8. Changes to This Policy</p>
                    <p className='!text-base pb-4'>We may update this Privacy Policy periodically. We’ll notify you via email or prominent site notice if changes are significant. Continued use of MicroTasker after changes means you accept the updated policy.</p>
                </div>
            </div>
        </>
    )
}