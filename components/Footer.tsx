export default function Footer() {
  return (
    <footer className="mt-16 bg-white border-t">
      <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">

        <p className="text-gray-500 text-sm">
          © 2026 FindMyBest. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm text-gray-600">
          <span>About</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>

      </div>
    </footer>
  );
}