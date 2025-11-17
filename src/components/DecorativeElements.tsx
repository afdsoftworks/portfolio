'use client'

export default function DecorativeElements() {
  return (
    <>
      {/* Floating circles - CSS animations only for performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top left circle */}
        <div
          className="absolute animate-float-slow"
          style={{
            top: '10%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '2px solid var(--navy-dark)',
            opacity: 0.06,
            animationDelay: '0s'
          }}
        />

        {/* Top right circle */}
        <div
          className="absolute animate-float-medium"
          style={{
            top: '20%',
            right: '8%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1.5px solid var(--blue-accent)',
            opacity: 0.08,
            animationDelay: '2s'
          }}
        />

        {/* Middle left circle */}
        <div
          className="absolute animate-float-slow"
          style={{
            top: '45%',
            left: '3%',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid var(--navy-light)',
            opacity: 0.05,
            animationDelay: '4s'
          }}
        />

        {/* Middle right circle */}
        <div
          className="absolute animate-float-medium"
          style={{
            top: '55%',
            right: '5%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--blue-accent)05 0%, transparent 70%)',
            animationDelay: '1s'
          }}
        />

        {/* Bottom left */}
        <div
          className="absolute animate-float-slow"
          style={{
            bottom: '15%',
            left: '10%',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '1.5px solid var(--navy-dark)',
            opacity: 0.04,
            animationDelay: '3s'
          }}
        />

        {/* Bottom right */}
        <div
          className="absolute animate-float-medium"
          style={{
            bottom: '20%',
            right: '7%',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--navy-light)08 0%, transparent 70%)',
            animationDelay: '5s'
          }}
        />

        {/* Small accent dots */}
        <div
          className="absolute animate-pulse-slow"
          style={{
            top: '35%',
            right: '15%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--blue-accent)',
            opacity: 0.15
          }}
        />

        <div
          className="absolute animate-pulse-slow"
          style={{
            top: '65%',
            left: '12%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--navy-dark)',
            opacity: 0.12,
            animationDelay: '2s'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) translateX(15px) rotate(5deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.2);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
