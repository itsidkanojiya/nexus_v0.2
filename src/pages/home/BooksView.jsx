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
        ease: "power3.out",
        scrollTrigger: {
          trigger: booksRef.current,
          start: "70% 80%",
          end: "80% 70%",
          scrub: 0.1,
          markers: true,
          onEnter: () => confetti.addConfetti(),
          onLeaveBack: () => confetti.clearCanvas(),
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      confetti.clearCanvas();
    };
  }, []);

  const steps = [
    {
      label: "Step 1: Add Basic Details",
      content:
        "Start by providing the essential details for your paper. This includes title, subject, and other key information.",
    },
    {
      label: "Step 2: Add Questions",
      content:
        "Select and add questions from our extensive database. You can modify or customize them as needed for your paper.",
    },
    {
      label: "Step 3: Boom! Your Paper is Created",
      content:
        "Just one click, and your customized question paper is generated, ready for download or printing!",
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000); // Change step every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-tertiary p-12">
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-3 lg:gap-2">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs md:max-w-sm mb-4 md:mb-0 h-64 overflow-scroll">
            <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
            <p className="text-gray-600">
              Download books, solutions, question papers, and study material in PDF format to support students' learning journey.
            </p>
          </div>
          <div className="bg-white p-6 h-64 rounded-lg shadow-lg max-w-xs md:max-w-sm mb-4 md:mb-0 overflow-scroll">
            <h3 className="text-xl font-semibold mb-2">Free Education</h3>
            <p className="text-gray-600">
              Our mission is to ensure student success with high-quality study materials and solutions—all free of charge.
            </p>
          </div>
          <div className="bg-white p-6 h-64 rounded-lg shadow-lg max-w-xs md:max-w-sm overflow-scroll">
            <h3 className="text-xl font-semibold mb-2">Paper Generator</h3>
            <p className="text-gray-600">
              Use our technology to automatically generate question papers by selecting questions, customized to fit your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary p-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Boards</h3>
              <p className="text-gray-600 text-3xl font-bold">12+</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Tutorial Exercises</h3>
              <p className="text-gray-600 text-3xl font-bold">1000+</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">PDF Downloads</h3>
              <p className="text-gray-600 text-3xl font-bold">220K</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Happy Students</h3>
              <p className="text-gray-600 text-3xl font-bold">6.9M</p>
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-4 text-white font-bold ${
                      index <= activeStep ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        index < activeStep ? "bg-primary" : "bg-gray-300"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg mt-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold mb-3">{steps[activeStep].label}</h3>
            <p className="text-gray-600 text-lg">{steps[activeStep].content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
