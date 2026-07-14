import BenefitsSection from './components/BenefitsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Navbar from './components/Navbar.jsx'
import ProblemSection from './components/ProblemSection.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProblemSection />
      <BenefitsSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default App
