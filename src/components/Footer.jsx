

const Footer = () => {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-16 pb-12 px-6">
      <div className="container-custom max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Us */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6 tracking-tight">About Us</h4>
            <p className="text-sm text-white/70 font-medium leading-relaxed">
              Swastik Electronics is Tamil Nadu's leading electronics component store, providing high-quality engineering kits and components for students and makers.
            </p>
          </div>

          {/* Our Branches */}
          <div className="lg:col-span-1">
            <h4 className="font-display font-bold text-xl mb-6 tracking-tight">Our Branches</h4>
            <div className="flex flex-col gap-6 text-xs leading-relaxed text-white/80">
              <div className="space-y-1">
                <p className="flex items-start gap-2 font-bold text-orange-400">
                  <span className="material-symbols-outlined text-[16px] mt-0.5">location_on</span>
                  Swastik Electronics - Erode
                </p>
                <p className="pl-6 text-white/60">No 40, Kumarasamy Complex, Shop No 10, Nachiappa II Street, Near Bus Stand Erode - 638001</p>
                <p className="pl-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  9600077228
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-start gap-2 font-bold text-orange-400">
                  <span className="material-symbols-outlined text-[16px] mt-0.5">location_on</span>
                  Swastik Electronics - Chennai VIT
                </p>
                <p className="pl-6 text-white/60">No: 174, 1st Floor, City Union Bank Complex, Vandalur-Kelambakkam Road, Melakottaiyur, Chennai - 600048 (Near VIT University Chennai)</p>
                <p className="pl-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  8220137229
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-start gap-2 font-bold text-orange-400">
                  <span className="material-symbols-outlined text-[16px] mt-0.5">location_on</span>
                  Swastik Electronics - Chennai SRM
                </p>
                <p className="pl-6 text-white/60">No 2 , First Floor, Grand Southern Trunk Rd, Potheri, Kattankulathur, Tamil Nadu - 603203</p>
                <p className="pl-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  9629360250
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-start gap-2 font-bold text-orange-400">
                  <span className="material-symbols-outlined text-[16px] mt-0.5">location_on</span>
                  Swastik Electronics - Coimbatore
                </p>
                <p className="pl-6 text-white/60">No. 5, North Street 2, Varadharajapuram, Uppilipalayam post, Coimbatore - 641015 (Opposite to singanallur D-Mart)</p>
                <p className="pl-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  8807690581
                </p>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6 tracking-tight">Policies</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/70 font-medium">
              <li><a href="/return-policy" className="hover:text-orange-400 transition-colors">Return Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6 tracking-tight">Contact Us</h4>
            <div className="space-y-6">
              <div className="text-sm">
                <p className="text-white/60 mb-1">For Website Support Head Office</p>
                <p className="flex items-center gap-2 font-black text-lg">
                  <span className="material-symbols-outlined text-green-400">call</span>
                  +91 6379306961
                </p>
              </div>
              <div className="text-sm">
                <p className="font-bold text-white/90">Call Timings</p>
                <p className="text-white/60">10 am - 6 pm</p>
                <p className="text-white/60">(Monday to Saturday)</p>
                <p className="text-white/60 italic text-xs">Sunday Holiday</p>
              </div>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">play_circle</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-500 hover:bg-pink-600 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">camera</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">facebook</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition-all">
                  <span className="material-symbols-outlined text-xl">alternate_email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-center md:text-left">
            © 2024 Swastik Electronics
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            Lets Learn, Implement and Innovate
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">SiteMap</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
