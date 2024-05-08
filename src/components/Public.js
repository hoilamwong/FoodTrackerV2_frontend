import { IoMdPricetag, IoIosList, IoIosPhonePortrait, IoIosSunny, IoMdWallet } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

const Public = () => {

  const landing = (
    <section className="flex flex-col lg:flex-row items-center px-20 mb-24 lg:mb-44 lg:mt-28">
      <div className="basis-1/2 pb-8 text-center">
        <h1 className="font-extrabold text-7xl py-2">Pixel Pantry</h1>
        <h2>
          Start using Pixel Pantry for free to<br /> keep track of your inventory
        </h2>
        <div className="flex justify-center mt-4">
          <Link className="btn btn-wide btn-primary mr-4" to="/login">
            Join Now!
          </Link>
          <button className="btn btn-md btn-neutral">
            Try Example
          </button>
        </div>
      </div>
      <div className="basis-1/2">
        <img className="rounded-xl shadow-2xl" src="/images/siteExample.png" alt="Webpage Example" />
      </div>
    </section>
  )

  const features = (
    <section className="bg-base-300 h-fit py-6">
      <div className="text-center">
        <div className="text-2xl font-bold pb-1">Website Features</div>
        <p className="px-24 lg:px-48">
          Pixel Pantry is a free app that helps you keep your pantry organized
          by keeping a detailed inventory. You can keep track of quantity,
          expiration dates, prices, and more. Pixel Pantry is available in your web browser
          without any downloads.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:gap-x-40 gap-y-8 px-12 lg:px-28 py-6">
        <div>
          <div className="main-feature-header">
            <IoMdPricetag size={38} className="mr-4" />Free to Use
          </div>
          <p className="main-feature-description">
            Available for free on iOS and Android mobile
            devices or use our online web app in any browser.
          </p>
        </div>
        <div>
          <div className="main-feature-header">
            <IoIosPhonePortrait size={38} className="mr-4" /> Mobile Friendly
          </div>
          <p className="main-feature-description">
            Access your pantry anywhere anytime once you login, even from your phone!
          </p>
        </div>
        <div>
          <div className="main-feature-header">
            <IoIosList size={38} className="mr-4" /> Organized Inventory
          </div>
          <p className="main-feature-description">
            Always have a complete inventory of your pantry at your fingertips.
          </p>
        </div>
        <div>
          <div className="main-feature-header">
            <IoIosSunny size={38} className="mr-4" /> Light & Dark Themes
          </div>

          <p className="main-feature-description">
            Switch between light and dark theme modes for increased eye comfort.
          </p>
        </div>
        <div>
          <div className="main-feature-header">
            <IoMdWallet size={38} className="mr-4" /> Save Money
          </div>
          <p className="main-feature-description">
            Never buying food and forgetting about it. No more moldy food
          </p>
        </div>
        <div>
          <div className="main-feature-header">
            <FaRegHeart size={38} className="mr-4" /> Pixel Art
          </div>
          <p className="main-feature-description">
            Choose the best pixel art to represent the food in your pantry.
          </p>
        </div>
      </div>
    </section>
  )

  const showcase = (
    <div className="w-3/4 mx-auto">
      <img className="rounded-3xl" src="/images/siteExample.png" alt="Webpage Example Image" />
    </div>
  )

  const about = (
    <div className="mx-48 p-4 bg-base-100 rounded-xl">
      <div className="text-2xl font-bold text-center my-2">About Me</div>
      <div className="flex flex-row items-center">
        <div className="basis-1/6 mr-10">
          <img className="rounded-full" src="/images/testProfile.jpg" alt="Webpage Example" />
        </div>
        <div className="basis-4/5">
          I'm a recent graduate in Computer Science with a passion for transforming
          ideas and concepts into practical solutions using technology.
          I love creating apps that are not only innovative but also have
          a meaningful impact on people's lives. I hope you enjoy using Pixel Pantry!
          <div className="my-2">
            <a href="https://linkedin.com/in/hoi-lam-wong" target="_blank">
              <button className="btn btn-neutral mr-4" >
                Portfolio
              </button>
            </a>
            <a href="https://github.com/hoilamwong" target="_blank">
              <button className="btn btn-neutral">
                Github
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  const content = (
    <>
      {landing}
      <main className="grid gap-16 pb-16">
        {features}
        {showcase}
        <Link className="btn btn-lg btn-primary w-fit mx-auto" to="/login">
          Start For Free Now!
        </Link>
        {about}
      </main>
    </>
  )

  return content
}

export default Public