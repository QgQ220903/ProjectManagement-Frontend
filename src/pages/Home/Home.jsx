import React from 'react'

const Home = () => {
    return (
        <>
            <section className=" bg-white text-gray-800 relative dark:dark:bg-slate-900">

                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <div
                        className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30">
                    </div>
                    <div
                        className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30">
                    </div>
                </div>


                <div
                    className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between h-full pt-16 pb-16 relative z-10">

                    <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 ">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 dark:text-white">
                            <span className="text-blue-600">Giải pháp</span > quản lý công việc <br />toàn diện cho doanh nghiệp
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-8 dark:text-white">
                            Phần mềm của chúng tôi giúp tự động hóa quy trình phân công, theo dõi tiến độ và báo cáo kết quả công việc một
                            cách thông minh và hiệu quả.
                        </p>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 dark:text-blue-500">Phân công tự động</h3>
                                    <p className="text-gray-600 text-sm dark:text-white">Dựa trên năng lực và khối lượng công việc</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 dark:text-blue-500">Theo dõi thời gian</h3>
                                    <p className="text-gray-600 text-sm dark:text-white">Báo cáo chính xác thời gian thực hiện</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-purple-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 dark:text-blue-500">Làm việc nhóm</h3>
                                    <p className="text-gray-600 text-sm dark:text-white">Tương tác đa chiều giữa các thành viên</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-green-100 p-2 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 dark:text-blue-500">Báo cáo đa dạng</h3>
                                    <p className="text-gray-600 text-sm dark:text-white">Xuất báo cáo theo nhiều tiêu chí khác nhau</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="lg:w-1/2 relative">
                        <div
                            className="relative rounded-xl overflow-hidden shadow-2xl border-8 border-white transform rotate-1 hover:rotate-0 transition duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Giao diện phần mềm quản lý công việc" className="w-full h-auto object-cover" />


                            <div
                                className="absolute -top-5 -right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transform hover:scale-110 transition">
                                Phiên bản 4.0
                            </div>
                        </div>


                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 z-0"></div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30 z-0"></div>
                    </div>
                </div>


                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </section>
        </>
    )
}

export default Home