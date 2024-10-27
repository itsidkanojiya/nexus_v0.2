import React from "react";

const AboutUs = () => {
    return (
        <section className="about-us bg-tertiary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Image Section */}
                <div className="lg:order-1 order-2 w-full h-full flex justify-center">
                    <img
                        src="https://backend.nexuspublication.com/storage/aboutus.jpg" // Replace with your image URL
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg max-w-xs sm:max-w-sm lg:max-w-full"
                    />
                </div>

                {/* Content Section */}
                <div className="lg:order-2 order-1 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
                        About Us
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                        At <span className="font-bold">Nexus Publication</span>,
                        we're dedicated to empowering both students and teachers through high-quality, accessible educational materials. 
                        Our mission is to make learning straightforward and enjoyable for students from 1st to 12th grade, while providing 
                        teachers with intuitive tools to support their teaching journey. Whether it’s our comprehensive textbooks or our 
                        easy-to-use question paper generator, we strive to make a positive impact in the education sector.
                    </p>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Who We Are
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                We’re a passionate team of educators, writers, and tech experts with a shared vision for enhancing education 
                                through simplicity and accessibility. With expertise in curriculum development, educational psychology, and 
                                technology, we work together to create resources that cater to the unique learning needs of students and 
                                the essential support required by teachers.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                What We Do
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                <span className="font-bold">Nexus Publication</span> specializes in creating textbooks that break down complex 
                                topics into easy-to-understand sections for students from 1st to 12th grade. Additionally, we provide a simple 
                                and efficient question paper generator for teachers, enabling them to craft customized assessments with ease. 
                                Our resources are designed to foster an engaging and effective learning environment.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                Why We Started
                            </h3>
                            <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                                The idea for <span className="font-bold">Nexus Publication</span> was born out of a need for clear, effective 
                                learning materials and user-friendly resources for teachers. Observing the challenges teachers face in creating 
                                meaningful assessments and the gaps in accessible learning tools for students, we set out to make a difference. 
                                Since our inception, we've been committed to producing reliable and impactful educational materials that bring 
                                value to classrooms across the nation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
