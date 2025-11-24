import Link from "next/link";
import { Download, Shield, History, Zap, CheckCircle2, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">X</div>
          <span>History</span>
        </div>
        <div className="flex gap-4">
          <Link href="#features" className="text-gray-600 hover:text-black transition">Features</Link>
          <Link href="#faq" className="text-gray-600 hover:text-black transition">FAQ</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v3.0 is now live on Chrome Store
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900">
          Never lose a <span className="text-[#1d9bf0]">Tweet</span> again.
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Automatically record your browsing history on Twitter/X. 
          Local storage, privacy-first, and lightning fast. 
          Stop bookmarking everything—just browse, we'll remember.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a 
            href="https://chromewebstore.google.com/detail/x-%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95/lapfjdfnkkkfdgpdgemgoackjoeoldea?hl=zh-CN&authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Download className="w-5 h-5" />
            Add to Chrome
            <span className="opacity-50 text-sm font-normal ml-1">(It's free)</span>
          </a>
          <a 
            href="https://github.com/coderzzp/x-history" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
          >
            <Github className="w-5 h-5" />
            View Source
          </a>
        </div>

        <div className="mt-12 flex items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>No Sign-up Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>100% Local Storage</span>
          </div>
        </div>
      </section>

      {/* Preview Image Placeholder */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 aspect-[16/9] group">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 font-medium">App Screenshot Placeholder (1200x675)</span>
          </div>
          <img src="/images/app-screenshot.png" alt="App Screenshot" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why use X History Recorder?</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<History className="w-8 h-8 text-blue-500" />}
              title="Automatic Recording"
              desc="Just browse as usual. We silently record every detail page you visit, complete with author info and content preview."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="Privacy First"
              desc="Your data never leaves your device. Everything is stored in your browser's local storage. We track nothing."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-yellow-500" />}
              title="Instant Jump"
              desc="Lost a tweet? Open the extension and jump back to it in one click. Search and filter coming soon."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <FaqItem q="Is it free?" a="Yes, the core features are completely free and open source." />
          <FaqItem q="Where is my data stored?" a="In your browser's Chrome Local Storage. If you uninstall the extension, the data is cleared." />
          <FaqItem q="Does it work on Firefox?" a="Not yet, but we are working on a cross-browser version." />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 text-center text-gray-500">
        <p>© 2025 X History Recorder. Built with ❤️ for the Twitter community.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <div className="mb-4 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="border-b border-gray-100 pb-6">
      <h4 className="font-bold text-lg mb-2">{q}</h4>
      <p className="text-gray-600">{a}</p>
    </div>
  );
}

