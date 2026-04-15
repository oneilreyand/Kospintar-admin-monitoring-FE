import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';
import SafeImage from '../atoms/SafeImage';

const ComponentsMediaSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { 
      url: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?w=800&q=80', 
      title: 'Modern Living Space',
      desc: 'Elegant design for urban dwellers.'
    },
    { 
      url: 'https://images.unsplash.com/photo-1600607687940-4e524cb35a3a?w=800&q=80', 
      title: 'Cozy Bedroom Interior',
      desc: 'Comfort meets sophisticated style.'
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const carouselCode = `<SafeImage src={currentSlide.url} />`;

  const videoCode = `<SafeImage src={poster} />`;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Media & Visuals</h2>
        <p className="mt-2 text-sm text-slate-500">Components for displaying images, videos, and dynamic sliders.</p>
      </section>

      <ComponentShowcaseItem
        title="Sliders & Carousels"
        summary="A responsive image slider with smooth transitions and custom controls. Uses SafeImage for error handling."
        code={carouselCode}
        preview={(
          <div className="relative h-96 w-full max-w-4xl overflow-hidden rounded-2xl shadow-xl">
            <SafeImage 
              src={slides[currentSlide].url} 
              alt={slides[currentSlide].title}
              className="h-full w-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 px-8 py-8 text-white">
              <h4 className="text-2xl font-bold">{slides[currentSlide].title}</h4>
              <p className="mt-2 text-slate-200">{slides[currentSlide].desc}</p>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ComponentShowcaseItem
          title="Image Overlays"
          summary="Add interactive overlays to images for more context."
          code="<SafeImage src='...' />"
          preview={(
            <div className="group relative overflow-hidden rounded-xl w-full">
              <SafeImage 
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&q=80" 
                alt="Room" 
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                 <span className="rounded-lg bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-xl">View Interior</span>
              </div>
            </div>
          )}
        />

        <ComponentShowcaseItem
          title="Video Player"
          summary="A premium-styled video player placeholder."
          code={videoCode}
          preview={(
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100">
              <SafeImage 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" 
                alt="Video Poster"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 hover:bg-slate-900/20 transition-colors">
                 <button className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95">
                   <Play size={32} fill="currentColor" />
                 </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ComponentsMediaSection;


