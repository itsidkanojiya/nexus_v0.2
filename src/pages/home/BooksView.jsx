import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ConfettiGenerator from 'js-confetti';

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
        ease: 'power3.out',
        scrollTrigger: {
          trigger: booksRef.current,
          start: '70% 80%', 
          end: '80% 70%',
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


  return (
    <div className='w-full h-screen relative'>
      <div id='confetti' className='h-full w-full bg-transparent absolute z-2'>
        <div className='w-full h-full flex justify-between absolute z-10'>
            <div className='w-1/2 h-full text-black px-10 flex justify-center flex-col bg-gradient-to-r from-slate-950 to-neutral-400'>
                <h1 className='text-5xl font-black text-white'>Learn. Grow. Succeed.</h1>
                <h2 className='text-white text-xl tracking-wide'>"Your Pathway to Knowledge and Success"</h2>
            </div>

            <div className='w-1/2 h-full flex justify-center items-center bg-gradient-to-r from-neutral-400 to-slate-950'>
                <div className='shadow-gray-400 rounded-full' style={{ boxShadow: 'inset 0 0 70px rgba(255, 255, 255, 0.7)' }}>
                  <img className='rounded-lg translate-y-20 opacity-0' ref={booksRef} height={300} width={300} src="/public/img/book.png" alt="book" />
                </div>
                
            </div>
        </div>
        </div>
    </div>
  )
}
