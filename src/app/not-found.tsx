import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-950/20 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 font-bold text-white hover:from-cyan-700 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/30">
            Back to Home →
          </button>
        </Link>
      </div>
    </div>
  );
}
