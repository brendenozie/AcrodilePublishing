"use client";

import { Navbar } from "@/components/navigation";
import { useAuth } from "@/components/auth-context";
import { HeroSection } from "@/components/heroSection";
import { FeaturedCollections } from "@/components/FeaturedCollections"; // Replacing CourseCatalog
import { DigitalReaderPreview } from "@/components/DigitalReaderPreview"; // Replacing ProjectGallery
import { AuthorSpotlight } from "@/components/AuthorSpotlight"; // Replacing MentorSpotlight
import { PublishingProcess } from "@/components/PublishingProcess"; // Replacing CurriculumTimeline
import { BestsellerGrid } from "@/components/BestsellerGrid"; // Replacing CourseTrackSection
import { LiteraryAwards } from "@/components/LiteraryAwards"; // Replacing ExpertiseSection
import { ReaderStats } from "@/components/ReaderStats"; // Replacing TrustStatsSection
import { BookReviews } from "@/components/BookReviews"; // Replacing Testimonials
import { MembershipPlans } from "@/components/MembershipPlans"; // Replacing EnrollmentSection
import { NewsletterSignup } from "@/components/NewsletterSignup"; // Replacing CTASection
import { Footer } from "@/components/footer";
import { ReaderSupport } from "@/components/ReaderSupport";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-slate-900 font-sans selection:bg-emerald-200">
      {/* Main Wrapper with responsive padding. 
          The background color #FCF9F2 gives a premium "paper" feel 
      */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />

        {/* 1. Impactful entry: The Infinite Library concept */}
        <HeroSection />

        {/* 2. Shop by Genre/Category: Curated collections like 'Editor's Choice' or 'Mystery' */}
        <FeaturedCollections />

        {/* 3. Showcasing the 'Read Online' technology with a sleek UI mockup */}
        <DigitalReaderPreview />
        
        {/* 4. The journey of a book: From Manuscript to Bookshelf */}
        <PublishingProcess />

        {/* 5. Highlighting the creative minds behind Acrodile books */}
        <AuthorSpotlight />

        {/* 6. Proof of quality: Awards, Press mentions, and Prestigious recognition */}
        <LiteraryAwards />

        {/* 7. The main shopping grid: Filterable by Physical or Digital formats */}
        <BestsellerGrid />

        {/* 8. Community proof: Total books sold, Active readers, Global reach */}
        <ReaderStats />

        {/* 9. Reader testimonials and book-specific reviews */}
        <BookReviews />

        {/* 10. Invite readers to the 'Acrodile Society' for early access */}
        <NewsletterSignup />
        
        {/* 11. Subscription models for unlimited digital reading */}
        <MembershipPlans />

        {/* 12. Shipping tracking, Returns, and Digital Reader help */}
        <ReaderSupport />
        
      </div>
      
      <Footer />
    </div>
  );
}