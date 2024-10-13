import {Link} from 'react-router-dom'

const CTA = () => {
    return (
      <section className="py-12 bg-gray-100 text-white text-center">
        <h2 className="text-3xl font-bold mb-4 ">Ready to Start Managing Your Money?</h2>
        <Link to="/signup" className="bg-white text-blue-500 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
          Get Started
        </Link>
      </section>
    );
  };
  
  export default CTA;
  