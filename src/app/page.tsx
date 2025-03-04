import Image from "next/image";
import LowBanner from "@/components/LowBanner";
import ProductShowCase from "@/components/ProductShowCase";
import IndustryApplications from "@/components/IndustryApplications"
import Landing from '../components/Landing';


export default function Home() {
  return (
    <div className="bg-white">
        <Landing/>
        <LowBanner />
        <ProductShowCase />
        <IndustryApplications />
    </div>
  );
}
