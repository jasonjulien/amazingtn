import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome aboard! | AmazingTN',
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">You&apos;re featured on AmazingTN!</h1>
        <p className="text-gray-500 mb-6">
          Your listing is now active. You&apos;ll receive a confirmation email with your receipt and
          subscription details. It typically takes just a few minutes for the Featured badge to
          appear on your listing.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-3 mb-8 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">Need to make changes?</span> Email{' '}
            <a href="mailto:hello@amazingtn.com" className="text-blue-600 underline">
              hello@amazingtn.com
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Want to upgrade?</span> We can prorate
            the difference to a higher tier at any time.
          </p>
          <p>
            <span className="font-semibold text-gray-800">Cancellations</span> take effect at the
            end of your current billing period.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Back to AmazingTN
        </Link>
      </div>
    </main>
  )
}