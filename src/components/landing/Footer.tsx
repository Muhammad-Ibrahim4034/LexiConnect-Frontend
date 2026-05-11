import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#3B2319] text-white py-16">
      <div className="container mx-auto px-12 max-w-[1800px]">
        <div className="grid grid-cols-4 gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-2xl font-serif text-[#D4AF37]">LexiConnect</span>
            </div>
            <p className="text-base text-[#E0C8AF] leading-relaxed">
              AI-Powered Legal Assistant making legal help accessible to everyone.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xl font-serif text-[#D4AF37] mb-6">Product</h3>
            <ul className="space-y-3 text-base">
              <li><a href="#features" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">How It Works</a></li>
              <li><a href="#use-cases" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Use Cases</a></li>
              <li><Link to="/login" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-serif text-[#D4AF37] mb-6">Company</h3>
            <ul className="space-y-3 text-base">
              <li><a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Careers</a></li>
              <li><a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Blog</a></li>
              <li><a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif text-[#D4AF37] mb-6">Contact</h3>
            <ul className="space-y-4 text-base">
              <li className="flex items-center gap-3 text-[#E0C8AF]">
                <Mail className="w-5 h-5" />
                <a href="mailto:support@lexiconnect.com" className="hover:text-white transition-colors">
                  support@lexiconnect.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#E0C8AF]">
                <Phone className="w-5 h-5" />
                <span>1-800-LEXI-HELP</span>
              </li>
              <li className="flex items-start gap-3 text-[#E0C8AF]">
                <MapPin className="w-5 h-5 mt-1" />
                <span>Available nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E0C8AF]/20 pt-10 flex justify-between items-center">
          <p className="text-base text-[#E0C8AF]">
            © 2025 LexiConnect. All rights reserved.
          </p>
          <div className="flex gap-8 text-base">
            <a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            <a href="#" className="text-[#E0C8AF] hover:text-[#D4AF37] transition-colors">Cookie Policy</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-[#4A2D1F] rounded-lg">
          <p className="text-sm text-[#E0C8AF] text-center leading-relaxed">
            <strong>Legal Disclaimer:</strong> LexiConnect provides general legal information and facilitates connections with licensed attorneys. This is not a substitute for professional legal advice. Always consult with a qualified attorney for your specific situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
