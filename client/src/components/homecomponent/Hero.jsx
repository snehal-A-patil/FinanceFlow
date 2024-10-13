import {Link} from "react-router-dom"

const Hero = () => {
    return (
      <section className="relative bg-cover bg-center h-[70vh]" style={{backgroundImage:'URL(https://c0.wallpaperflare.com/preview/960/830/338/chart-graph-business-finance.jpg)'}}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center text-black">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Take Control of Your Financial Future</h1>
          <p className="text-lg md:text-xl mb-6 text:black">Track your expenses, set financial goals, and manage your money like never before.</p>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
            Get Started
          </Link>
        </div>
      </section>
    );
  };
  
  export default Hero;
  