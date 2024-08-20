import React from "react";

const AboutUs = () => {
    return (
        <section className="about-us bg-tertiary py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <div className="lg:order-1 order-2 w-full h-full">
                    <img
                        src="[your-image-url]" // Replace with your image URL
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Content Section */}
                <div className="lg:order-2 order-1 text-center lg:text-left">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                        About Us
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                        At{" "}
                        <span className="font-bold">[Your Project Name]</span>,
                        we're dedicated to [mission statement]. Whether it's
                        [what your project does], we aim to [primary goal or
                        value proposition]. Our goal is to [specific outcome or
                        impact].
                    </p>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                Who We Are
                            </h3>
                            <p className="mt-2 text-gray-600">
                                We're a passionate team of [describe the team]
                                with a shared vision for [project's purpose].
                                With backgrounds in [mention relevant fields or
                                expertise], we bring together diverse skills and
                                experiences to create something truly unique.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                What We Do
                            </h3>
                            <p className="mt-2 text-gray-600">
                                <span className="font-bold">
                                    [Your Project Name]
                                </span>{" "}
                                is focused on [brief description of the
                                project's functionality or product]. Our
                                solution helps [who your project serves] to
                                [benefits or features of the project]. We
                                believe in [core values].
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">
                                Why We Started
                            </h3>
                            <p className="mt-2 text-gray-600">
                                The inspiration for{" "}
                                <span className="font-bold">
                                    [Your Project Name]
                                </span>{" "}
                                came from [mention the problem or gap that
                                motivated the project]. We saw an opportunity to
                                [how your project addresses the problem] and
                                decided to take action. Since then, we've been
                                working tirelessly to [progress or milestones
                                achieved so far].
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
