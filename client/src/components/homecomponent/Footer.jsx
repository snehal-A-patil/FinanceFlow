import {Link} from 'react-router-dom'


const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-x-6 mb-4">
            <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact Us</Link>
          </div>
          <p>&copy; 2024 FinanceFlow. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  