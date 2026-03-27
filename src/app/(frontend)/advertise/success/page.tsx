import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderWrapper from '@/components/HeaderWrapper'

export const metadata: Metadata = {
  title: 'Welcome aboard! | AmazingTN',
}

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      <HeaderWrapper variant="white" />

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '140px 24px 80px', textAlign: 'center' }}>

        {/* Icon */}
        <div style={{ fontSize: '56px', marginBottom: '24px' }}>🎉</div>

        {/* Heading */}
        <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
          You're Live
        </p>
        <h1 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b', marginBottom: '12px' }}>
          Welcome to <strong>AmazingTN</strong>
        </h1>
        <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.65, marginBottom: '40px' }}>
          Your listing is now active. You'll receive a confirmation email with your receipt and
          subscription details. It typically takes just a few minutes for the Featured badge to
          appear on your listing.
        </p>

        {/* Info card */}
        <div style={{
          background: '#fff', borderRadius: '16px', border: '1px solid #e5e5e5',
          padding: '32px', boxShadow: '0 1px 2px rgba(0,0,0,.05)',
          textAlign: 'left', marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InfoItem
              title="Need to make changes?"
              body={<>Email <a href="mailto:hello@amazingtn.com" style={{ color: '#d97706' }}>hello@amazingtn.com</a> and we'll take care of it.</>}
            />
            <InfoItem
              title="Want to upgrade?"
              body="We can prorate the difference to a higher tier at any time."
            />
            <InfoItem
              title="Cancellations"
              body="Take effect at the end of your current billing period. No surprise charges."
            />
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/restaurants" style={{
            display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
            borderRadius: '9999px', background: '#f59e0b', color: '#0f172a',
            fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,.1)',
          }}>
            View Your Listing
          </Link>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
            borderRadius: '9999px', background: '#fff', color: '#1e293b',
            border: '1px solid #e5e5e5', fontSize: '14px', textDecoration: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,.05)',
          }}>
            Back to AmazingTN
          </Link>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '9999px',
        background: '#fef3c7', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, marginTop: '1px',
      }}>
        <span style={{ fontSize: '10px', color: '#d97706' }}>✓</span>
      </div>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '2px' }}>{title}</p>
        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{body}</p>
      </div>
    </div>
  )
}