import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ConfettiGenerator from "js-confetti";

export default function BooksView() {
    const booksRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const confetti = new ConfettiGenerator({});

        if (booksRef.current) {
            gsap.to(booksRef.current, {
                y: 0,
                opacity: 1,
                // duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: booksRef.current,
                    start: "70% 80%",
                    end: "80% 70%",
                    scrub: 0.1,
                    markers: true,
                    onEnter: () => {
                        // Trigger confetti when the box enters the viewport
                        confetti.addConfetti();
                    },
                    onLeaveBack: () => {
                        // Clear confetti when the box leaves the viewport
                        confetti.clearCanvas();
                    },
                },
            });
        }

        return () => {
            const scrollTriggers = ScrollTrigger.getAll(); // Get all ScrollTrigger instances
            scrollTriggers.forEach((trigger) => {
                trigger.kill(); // Disable or kill each ScrollTrigger instance
            });
            confetti.clearCanvas();
        };
    }, []);
    const steps = [
        {
            label: "Step 1: Start",
            content:
                "This is the first step. Get started by understanding the basics of our process.",
        },
        {
            label: "Step 2: Process",
            content:
                "This is the second step. Learn about the detailed process and how to proceed.",
        },
        {
            label: "Step 3: Complete",
            content:
                "This is the final step. Review your progress and complete the process.",
        },
    ];
    const [activeStep, setActiveStep] = React.useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prevStep) => (prevStep + 1) % steps.length);
        }, 1000); // Change step every 1000ms (1 second)

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <>
            <div className="bg-tertiary p-12">
                <div className="flex flex-col items-center md:flex-row md:justify-between ">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs md:max-w-sm mb-4 md:mb-0  h-64">
                        <h3 className="text-xl font-semibold mb-2">
                            Quality Content
                        </h3>
                        <p className="text-gray-600">
                            You can Download Books, Solutions, Question papers
                            with solutions and study material in PDF format and
                            help the students. Behind the screens of this
                            educational titan is a team of dedicated
                            professionals and educators. Their passion and
                            expertise shine through in every lesson, tutorial,
                            and resource, ensuring that students receive the
                            best study material.
                        </p>
                    </div>
                    <div className="bg-white p-6 h-64 rounded-lg shadow-lg max-w-xs md:max-w-sm mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">
                            Free Education
                        </h3>
                        <p className="text-gray-600">
                            Our goal is to provide exceptional value and service
                            to our students, ensuring their success and
                            satisfaction by delivering high-quality study
                            material and solutions.
                        </p>
                    </div>
                    <div className="bg-white p-6 h-64 rounded-lg shadow-lg max-w-xs md:max-w-sm">
                        <h3 className="text-xl font-semibold mb-2">
                            Paper Generator
                        </h3>
                        <p className="text-gray-600">
                            Our mission is to leverage our expertise and
                            technology to solve complex challenges and paper
                            generator is one such example. You can generate
                            question paper automatically by simply selecting
                            questions and modify them according to your needs.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-primary p-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-100">
                        Our Achievements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">
                                Nursery
                            </h3>
                            <p className="text-gray-600">12 Classes</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">
                                Tutorial Exercises
                            </h3>
                            <p className="text-gray-600 text-3xl font-bold">
                                1000+
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">
                                PDF Downloads
                            </h3>
                            <p className="text-gray-600 text-3xl font-bold">
                                220K
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">
                                Happy Students
                            </h3>
                            <p className="text-gray-600 text-3xl font-bold">
                                6.9M
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-tertiary p-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                    <div className="flex items-center justify-center">
                        <div className="relative flex items-center">
                            {steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-4 text-white ${
                                            index <= activeStep
                                                ? "bg-primary"
                                                : "bg-gray-300"
                                        }`}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        {index + 1}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`flex-1 h-1 ${
                                                index < activeStep
                                                    ? "bg-primary"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                        <h3 className="text-xl font-semibold mb-2">
                            {steps[activeStep].label}
                        </h3>
                        <p className="text-gray-600">
                            {steps[activeStep].content}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
