import { useState, useEffect } from "react";
import {
  ArrowRight, Check, Clock, Zap, Shield, Users, TrendingUp, Phone, Mail,
  MapPin, Linkedin, Menu, X, ShoppingCart, Send, Loader, ExternalLink,
  Sparkles, BookOpen, BarChart3, Target, AlertCircle, Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import tilLogo from "@/assets/til-logo.png";
import thexaLogo from "@/assets/threxa-logo.png";

// Animation styles
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    .fade-in-up.d1 { animation-delay: 0.1s; }
    .fade-in-up.d2 { animation-delay: 0.2s; }
    .fade-in-up.d3 { animation-delay: 0.3s; }
    .fade-in-up.d4 { animation-delay: 0.4s; }
    .slide-in-right { animation: slideInRight 0.8s ease-out forwards; opacity: 0; }
    .pulse-animation { animation: pulse 2s infinite; }
    .shimmer-bg { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); background-size: 1000px 100%; animation: shimmer 3s infinite; }
    
    @media (max-width: 768px) {
      .hero-heading { font-size: 1.875rem !important; line-height: 1.2 !important; }
      .hero-paragraph { font-size: 1rem !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
      .features-grid { grid-template-columns: 1fr !important; }
      .pricing-grid { grid-template-columns: 1fr !important; }
      .faq-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─── NAVBAR ───
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={thexaLogo} alt="Threxa" className="h-6 md:h-8" />
          <span className="text-white font-bold text-sm md:text-lg">Threxa</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white transition text-sm">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition text-sm">Pricing</a>
          <a href="#faq" className="text-slate-300 hover:text-white transition text-sm">FAQ</a>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <ShoppingCart size={16} className="mr-2" />
            Shopify App Store
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-slate-800 border-b border-slate-700 p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white text-sm">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white text-sm">Pricing</a>
              <a href="#faq" className="text-slate-300 hover:text-white text-sm">FAQ</a>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                <ShoppingCart size={16} className="mr-2" />
                Shopify App Store
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── HERO SECTION ───
function Hero() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el, i) => el.classList.add("d" + (i % 4)));
  }, []);

  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 md:px-4 py-2 mb-6 md:mb-8 fade-in-up">
            <Sparkles size={14} md:size={16} className="text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-blue-300">Shopify App — Official Ecosystem</span>
          </div>
        </div>

        <h1 className="hero-heading text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
          <span className="fade-in-up block">Tally + WhatsApp + Returns +</span>
          <span className="fade-in-up block">Inventory in One App</span>
        </h1>

        <p className="hero-paragraph text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-8 fade-in-up">
          Indian D2C merchants save <span className="font-bold text-blue-300">8+ hours per week</span> automating order reconciliation, COD verification, returns, and inventory sync. No manual reconciliations. No device-linking risks. No surprise charges.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 fade-in-up">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 text-sm md:text-base">
            <ShoppingCart size={16} md:size={18} className="mr-2" />
            Install on App Store
          </Button>
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 md:px-8 text-sm md:text-base">
            Watch Demo <ExternalLink size={16} md:size={18} className="ml-2" />
          </Button>
        </div>

        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-16 fade-in-up">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">8 hrs</div>
            <div className="text-xs md:text-sm text-slate-400">Saved/week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">0</div>
            <div className="text-xs md:text-sm text-slate-400">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">₹8-45k</div>
            <div className="text-xs md:text-sm text-slate-400">Monthly INR</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Real-time</div>
            <div className="text-xs md:text-sm text-slate-400">Sync</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ───
function Features() {
  const features = [
    {
      id: 1,
      title: "Tally Reconciliation",
      description: "Every paid order becomes a GST-ready sales voucher in Tally Prime within seconds.",
      icon: BarChart3,
      benefits: [
        "GST-ready voucher format",
        "Automatic credit notes",
        "Audit trail logging",
        "Failed push alerts",
      ],
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
    },
    {
      id: 2,
      title: "WhatsApp COD Verification",
      description: "Official WhatsApp Business Cloud API — never device-linking. Keep numbers safe.",
      icon: Send,
      benefits: [
        "Official Meta Cloud API",
        "OTP within seconds",
        "Auto-tag orders",
        "No permanent bans",
      ],
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: 3,
      title: "Returns Management",
      description: "Branded returns portal with Shiprocket, Delhivery, and Blue Dart integrations.",
      icon: Target,
      benefits: [
        "Customer self-service",
        "Auto courier pickup",
        "Idempotent restocking",
        "Exchange-first flows",
      ],
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: 4,
      title: "Inventory Sync",
      description: "Real-time, webhook-driven inventory sync with SKU normalization.",
      icon: Zap,
      benefits: [
        "Real-time webhook sync",
        "SKU normalization",
        "Safety-stock buffer",
        "Audit logging",
      ],
      color: "from-yellow-500/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-20 bg-slate-900 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Four Automations, One App</h2>
          <p className="text-base md:text-lg text-slate-400">Every problem Indian D2C merchants face, solved</p>
        </div>

        <div className="features-grid grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-gradient-to-br ${feature.color} border ${feature.borderColor} rounded-lg p-6 md:p-8 hover:border-opacity-100 transition`}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  <div className="p-2 md:p-3 bg-slate-800/50 rounded-lg">
                    <Icon size={20} md:size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-sm md:text-base text-slate-300 mb-5 md:mb-6">{feature.description}</p>

                <ul className="space-y-2 md:space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-slate-300">
                      <Check size={16} md:size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <Shield size={18} md:size={20} className="text-blue-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Safety First</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Never device-linking for WhatsApp. Your numbers never get permanently banned.</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <BarChart3 size={18} md:size={20} className="text-green-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Full Transparency</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Complete audit log of every action. Silent failures are impossible.</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <Users size={18} md:size={20} className="text-purple-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Same-Day Support</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Founder-led support. Reply within the same business day (IST).</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ───
function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Simple INR Pricing</h2>
          <p className="text-base md:text-lg text-slate-400">Flat monthly price. No per-order fees. No surprises.</p>
        </div>

        <div className="pricing-grid grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Launch */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 md:p-8 hover:border-slate-600 transition">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Launch</h3>
            <p className="text-xs md:text-sm text-slate-400 mb-5 md:mb-6">For 1-2 automations</p>
            <div className="mb-6 md:mb-8">
              <span className="text-3xl md:text-4xl font-bold text-white">₹8,000</span>
              <p className="text-xs text-slate-400 mt-1 md:mt-2">/month, setup free</p>
            </div>

            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>1 automation</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Up to 1,000 orders/mo</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Audit log + support</span>
              </li>
              <li className="flex items-start gap-2 text-slate-500 text-xs md:text-sm">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>Returns not included</span>
              </li>
            </ul>

            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-sm md:text-base">
              Get Started
            </Button>
          </div>

          {/* Growth - Featured */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500 rounded-lg p-5 md:p-8 relative md:-translate-y-4 shadow-xl shadow-blue-500/10">
            <div className="absolute -top-3 md:-top-4 left-5 md:left-8 bg-blue-600 text-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Growth</h3>
            <p className="text-xs md:text-sm text-blue-300 mb-5 md:mb-6">For all 4 automations</p>
            <div className="mb-6 md:mb-8">
              <span className="text-3xl md:text-4xl font-bold text-white">₹16,000</span>
              <p className="text-xs text-slate-300 mt-1 md:mt-2">/month, unlimited</p>
            </div>

            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <li className="flex items-start gap-2 text-white text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>All 4 automations</span>
              </li>
              <li className="flex items-start gap-2 text-white text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Unlimited orders</span>
              </li>
              <li className="flex items-start gap-2 text-white text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Official WhatsApp API</span>
              </li>
              <li className="flex items-start gap-2 text-white text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2 text-white text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Full audit logs</span>
              </li>
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base">
              Install Now
            </Button>
          </div>

          {/* Pro */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 md:p-8 hover:border-slate-600 transition">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Pro</h3>
            <p className="text-xs md:text-sm text-slate-400 mb-5 md:mb-6">Custom, high-volume</p>
            <div className="mb-6 md:mb-8">
              <span className="text-3xl md:text-4xl font-bold text-white">₹45,000</span>
              <p className="text-xs text-slate-400 mt-1 md:mt-2">/month + custom</p>
            </div>

            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Everything in Growth</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Unlimited scaling</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Custom webhooks</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Slack channel</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-xs md:text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                <span>Custom features</span>
              </li>
            </ul>

            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-sm md:text-base">
              Contact Sales
            </Button>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6 text-center">
          <p className="text-xs md:text-sm text-slate-300 mb-3 md:mb-4">
            💰 First month is <span className="font-bold text-green-400">setup + onboarding free</span>. Pay from month 2.
          </p>
          <p className="text-xs text-slate-400">
            Billing through Shopify. No separate invoices.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ SECTION ───
function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      q: "Is this official Shopify?",
      a: "Yes. Threxa is an official Shopify ecosystem app. It goes through Shopify's security review and is distributed through the Shopify App Store.",
    },
    {
      id: 2,
      q: "Will WhatsApp ban my number?",
      a: "No. Threxa uses the official WhatsApp Business Cloud API through a Meta-approved BSP. We never device-link. Your number is always safe.",
    },
    {
      id: 3,
      q: "What if Threxa stops working?",
      a: "You get a WhatsApp + email alert immediately, same business day. Every action is logged so you can see exactly what happened.",
    },
    {
      id: 4,
      q: "Do I need to install anything?",
      a: "For Tally, yes — a lightweight bridge on your accounts machine. For WhatsApp, returns, inventory: all cloud-based, nothing to install.",
    },
    {
      id: 5,
      q: "Can I cancel anytime?",
      a: "Yes. Uninstall from Shopify admin. You stop being charged the next billing cycle. No contracts.",
    },
    {
      id: 6,
      q: "What about GDPR / data export?",
      a: "Full GDPR compliance. On uninstall, all data is deleted within 48 hours. You can export audit logs anytime.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-20 bg-slate-900 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">FAQ</h2>
          <p className="text-base md:text-lg text-slate-400">Common questions from D2C merchants</p>
        </div>

        <div className="faq-grid space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full text-left bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-lg font-semibold text-white pr-3">{faq.q}</h3>
                <span className={`transform transition flex-shrink-0 ${openId === faq.id ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {openId === faq.id && (
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-700 text-xs md:text-sm text-slate-300">
                  {faq.a}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ───
function CTA() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Install Threxa Today</h2>
        <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8">First month setup is free. Start automating from month 2.</p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-6 md:px-8 text-sm md:text-base">
            <ShoppingCart size={16} md:size={18} className="mr-2" />
            Shopify App Store
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-6 md:px-8 text-sm md:text-base">
            Schedule Demo
          </Button>
        </div>
        <p className="text-xs md:text-sm text-blue-100 mt-4 md:mt-6">Questions? +91 7483 992 418 (WhatsApp)</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
          <div>
            <img src={thexaLogo} alt="Threxa" className="h-6 md:h-8 mb-3 md:mb-4" />
            <p className="text-slate-400 text-xs md:text-sm">D2C automation for Shopify brands in India.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-xs md:text-sm">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="https://theingredientlist.co" className="hover:text-white transition">Built by TIL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-xs md:text-sm">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Status Page</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-xs md:text-sm">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={14} md:size={16} />
                <a href="tel:+917483992418" className="hover:text-white transition">+91 7483 992 418</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} md:size={16} />
                <a href="mailto:sachin@theingredientlist.co" className="hover:text-white transition">Email</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} md:size={16} />
                <span>Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-slate-400 text-center md:text-left">
            © 2026 Threxa by The Ingredient List. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin size={16} md:size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN COMPONENT ───
export default function Index() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <AnimationStyles />
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
