// Import components
import { Carousel } from "@/page-components/Carousel";
import { AboutGame } from "@/page-components/AboutGame";
import { Schools } from "@/page-components/Schools";

// All of the home page elements are components which are included below
export default function LandingPage() {

  return (
    <main>

        <Carousel />

        <AboutGame />

        <Schools />
    
    </main>
  )
}
