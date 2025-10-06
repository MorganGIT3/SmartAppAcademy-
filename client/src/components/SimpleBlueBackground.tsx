"use client";

export function SimpleBlueBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Animated Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-black animate-pulse" 
           style={{ animationDuration: '4s' }} />
      
      {/* Animated Blue Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
           style={{ 
             animationDuration: '6s',
             transform: 'translate(-50%, -50%)',
             animationDelay: '0s'
           }} />
      
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-400/40 rounded-full blur-3xl animate-pulse"
           style={{ 
             animationDuration: '8s',
             transform: 'translate(50%, -50%)',
             animationDelay: '2s'
           }} />
      
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-600/35 rounded-full blur-3xl animate-pulse"
           style={{ 
             animationDuration: '7s',
             transform: 'translate(-50%, 50%)',
             animationDelay: '4s'
           }} />
      
      {/* Floating Blue Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping"
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
           style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"
           style={{ animationDelay: '5s' }} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-200 rounded-full animate-ping"
           style={{ animationDelay: '2s' }} />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
    </div>
  );
}
