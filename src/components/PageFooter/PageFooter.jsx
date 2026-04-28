function PageFooter() {
    return (
        <footer className="bg-slate-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Col 1 — About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs">BM</span>
                            </div>
                            <span className="font-bold text-lg">BuildMart</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Your trusted source for premium building materials and construction supplies since 1995.
                        </p>
                        <div className="flex items-center gap-3">
                            {/* Facebook */}
                            <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            {/* Twitter */}
                            <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Col 2 — Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-400">
                            {['About Us', 'Products', 'Delivery Info', 'Returns Policy'].map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Customer Service */}
                    <div>
                        <h3 className="font-bold mb-4">Customer Service</h3>
                        <ul className="flex flex-col gap-2 text-sm text-slate-400">
                            {['Contact Us', 'FAQs', 'Shipping & Tracking', 'Privacy Policy'].map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 — Newsletter */}
                    <div>
                        <h3 className="font-bold mb-2">Newsletter</h3>
                        <p className="text-slate-400 text-sm mb-3">Subscribe for updates and exclusive deals.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 text-white placeholder-slate-500"
                            />
                            <button className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Contacts */}
                <div className="border-t border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm text-slate-400">
                    <div>
                        <p className="text-white font-semibold mb-1">Phone</p>
                        <p>1-800-BUILD-MART</p>
                    </div>
                    <div>
                        <p className="text-white font-semibold mb-1">Email</p>
                        <p>support@buildmart.com</p>
                    </div>
                    <div>
                        <p className="text-white font-semibold mb-1">Address</p>
                        <p>123 Construction Ave, Builder City, BC 12345</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
                    © 2026 BuildMart. All rights reserved.
                </div>

            </div>
        </footer>
    )
}

export default PageFooter
