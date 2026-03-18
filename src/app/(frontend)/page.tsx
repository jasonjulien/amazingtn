import HeaderWrapper from '@/components/HeaderWrapper'
import HeroSection from '@/components/home/HeroSection'
import CategorySection from '@/components/home/CategorySection'
import RegionSection from '@/components/home/RegionSection'
import CitiesSection from '@/components/home/CitiesSection'

export default function HomePage() {
  return (
    <div style={{ background: '#fafaf9' }}>
      <HeaderWrapper variant="transparent" />
      <HeroSection />
      <CategorySection />
      <RegionSection />
      <CitiesSection />
    </div>
  )
}