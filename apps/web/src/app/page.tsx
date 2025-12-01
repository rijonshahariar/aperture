import FeaturesSection from '@/components/templates/features'
import HomeHeroSection from '@/components/templates/hero'
import BlogPreview from '@/components/templates/blogPreview'

export default function Home() {
  return (
    <div className="">
      <HomeHeroSection />
      <FeaturesSection />
      <BlogPreview />
    </div>
  )
}
