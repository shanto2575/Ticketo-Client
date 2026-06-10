import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

export default async function HomePage() {

  const state={
    totalEvents:100,
    totalAttendees:3000,
    totalOrgs:10
  }


  return (
    <div>
      <Hero/>
      <WhyChoose/>
      <Statistics stats={state}/>
      <Testimonials/>
    </div>
  );
}

