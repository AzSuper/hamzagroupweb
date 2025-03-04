"use client"

import Image from 'next/image';
import PharmaIcon from '../../public/assets/pharmaIcon.svg';
import VectorIcon from '../../public/assets/vector.svg';
import FoodIndustryIcon from '../../public/assets/foodIndustry.svg';
import IndustryIcon from '../../public/assets/industryIcon.svg';
import FurnitureIcon from '../../public/assets/furniture.svg';
import AlmeskahLogo from '../../public/images/almeskahLogo.png';
import AlbatolLogo from '../../public/images/albatolLogo.png';
import MilliaLogo from '../../public/images/milliaLogo.png';
import NouraLogo from '../../public/images/nouraLogo.png';
import WinnerLogo from '../../public/images/winnerLogo.png';
import HafhafeLogo from '../../public/images/hafhafeLogo.png';
import MilliaLogo1 from '../../public/images/milliaLogo-1.png';
import HamolLogo from '../../public/images/hamolLogo.png';
import NewGinoLogo from '../../public/images/newginoLogo.png';
import PoztronLogo from '../../public/images/poztronLogo.png';
import RootsLogo from '../../public/images/roots.jpeg';
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";
////////////////////////////////////////////////////////
const IndustryApplications = () => {
    const { locale } = useLocale();
  
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 px-8 pt-12 pb-32 bg-black text-white h-fit relative overflow-x-hidden">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">
           {t("landing.applications.title", locale)}
          </h1>
          <p className="text-lg mb-6">
          {t("landing.applications.description", locale)}
          </p>
          <p className="text-md mb-4 font-semibold">
          {t("landing.applications.subtitle", locale)}
          </p>
          <ul className="space-y-4 text-lg w-[40%]">
            <li className="flex items-center gap-3 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit">
              <Image src={PharmaIcon} width={24} height={24} alt="Pharmaceuticals" />
              {t("landing.applications.list.one", locale)}
            </li>
            <li className="flex items-center gap-3 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit">
              <Image src={VectorIcon} width={24} height={24} alt="Self care" />
              {t("landing.applications.list.two", locale)}
            </li>
            <li className="flex items-center gap-3 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit">
              <Image src={FoodIndustryIcon} width={24} height={24} alt="Food Industry" />
              {t("landing.applications.list.three", locale)}
            </li>
            <li className="flex items-center gap-3 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit">
              <Image src={IndustryIcon} width={24} height={24} alt="Heavy Industry" />
              {t("landing.applications.list.four", locale)}
            </li>
            <li className="flex items-center gap-3 transform transition-all duration-300 hover:pl-3 cursor-pointer !w-fit">
              <Image src={FurnitureIcon} width={24} height={24} alt="Furniture Applications" />
              {t("landing.applications.list.five", locale)}
            </li>
          </ul>
          <div className="pt-7 w-full lg:w-[40%] md:w-[70%]">
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            {t("landing.clients.title", locale)}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {/* Client 1 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={AlmeskahLogo}
                  alt="almeskha"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 2 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={AlbatolLogo}
                  alt="albatol"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 3 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={MilliaLogo}
                  alt="Millia"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 4 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={NouraLogo}
                  alt="noura"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 5 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={WinnerLogo}
                  alt="Winner"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 6 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={HafhafeLogo}
                  alt="hafhafe"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 7 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={MilliaLogo1}
                  alt="Milliac"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 8 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={HamolLogo}
                  alt="hamol"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 9 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={NewGinoLogo}
                  alt="new gino"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 10 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={PoztronLogo}
                  alt="poztron"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>

              {/* Client 11 */}
              <div className="flex items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-105">
                <Image
                  src={RootsLogo}
                  alt="roots"
                  width={100}
                  height={80}
                  className="w-full h-auto object-contain max-h-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="absolute -right-2 w-[50%] h-[90%] rounded-xl hidden md:hodden lg:block"
          style={{
            "--s": "100px",
            "--c1": "#E1F5C4",
            "--c2": "#3B8183",
            "--_g":
              "#0000, #0004 5%, var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%, var(--c1) 36% 44%, var(--c2) 46% 54%, var(--c1) 56% 64%, var(--c2) 66% 74%, var(--c1) 76% 84%, var(--c2) 86% 94%, #0004 95%, #0000",
            background:
              "radial-gradient(100% 50% at 100% 0   ,var(--_g)), radial-gradient(100% 50% at 0    50% ,var(--_g)), radial-gradient(100% 50% at 100% 100%,var(--_g))",
            backgroundSize: "var(--s) calc(2*var(--s))",
          }}
        ></div>
      </div>
    </>
  );
};

export default IndustryApplications;