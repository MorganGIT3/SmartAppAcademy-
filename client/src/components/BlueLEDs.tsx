"use client";

export function BlueLEDs() {

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* LED 1 - Top Left */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-20 left-10 w-1 h-1 bg-blue-300 rounded-full shadow-lg shadow-blue-300/40 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* LED 2 - Top Right */}
      <div className="absolute top-32 right-16 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-32 right-16 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/30 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* LED 3 - Middle Left */}
      <div className="absolute top-1/2 left-8 w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-600/70 animate-pulse" style={{animationDelay: '2.5s'}}></div>
      <div className="absolute top-1/2 left-8 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/40 animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* LED 4 - Middle Right */}
      <div className="absolute top-1/3 right-12 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/60 animate-pulse" style={{animationDelay: '3.5s'}}></div>
      <div className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-blue-300 rounded-full shadow-lg shadow-blue-300/30 animate-pulse" style={{animationDelay: '4s'}}></div>
      
      {/* LED 5 - Bottom Left */}
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" style={{animationDelay: '4.5s'}}></div>
      <div className="absolute bottom-32 left-16 w-1 h-1 bg-blue-200 rounded-full shadow-lg shadow-blue-200/30 animate-pulse" style={{animationDelay: '5s'}}></div>
      
      {/* LED 6 - Bottom Right */}
      <div className="absolute bottom-20 right-8 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/60 animate-pulse" style={{animationDelay: '5.5s'}}></div>
      <div className="absolute bottom-20 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/40 animate-pulse" style={{animationDelay: '6s'}}></div>
      
      {/* LED 7 - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" style={{animationDelay: '6.5s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-300 rounded-full shadow-lg shadow-blue-300/30 animate-pulse" style={{animationDelay: '7s'}}></div>
      
      {/* LEDs supplémentaires pour plus d'effet */}
      <div className="absolute top-16 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full shadow-lg shadow-blue-300/40 animate-pulse" style={{animationDelay: '7.5s'}}></div>
      <div className="absolute top-24 right-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/30 animate-pulse" style={{animationDelay: '8s'}}></div>
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" style={{animationDelay: '8.5s'}}></div>
      <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/40 animate-pulse" style={{animationDelay: '9s'}}></div>
    </div>
  );
}
