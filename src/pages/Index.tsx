import { useState, useEffect } from "react";
import {
  ArrowRight, Check, Clock, Zap, Shield, Users, TrendingUp, Phone, Mail,
  MapPin, Linkedin, Menu, X, ShoppingCart, Send, Loader, ExternalLink,
  Sparkles, BookOpen, BarChart3, Target, AlertCircle, Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import tilLogo from "@/assets/til-logo.png";
import thexaLogo from "@/assets/threxa-logo.png";
import shopifyBadge from "@/assets/shopify-badge.png";

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
  `}</style>
);

// ─── NAVBAR ───
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={thexaLogo} alt="Threxa" className="h-8" />
          <span className="text-white font-bold text-lg">Threxa</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-white transition text-sm">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition text-sm">Pricing</a>
          <a href="#faq" className="text-slate-300 hover:text-white transition text-sm">FAQ</a>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <ShoppingCart size={16} className="mr-2" />
            Shopify App Store
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-slate-800 border-b border-slate-700 p-6 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white">Pricing</a>
              <a href="#faq" className="text-slate-300 hover:text-white">FAQ</a>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
    elements.forEach((el) => el.classList.add("d" + (Math.random() * 4 | 0)));
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8 fade-in-up">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Shopify App — Official Ecosystem</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="fade-in-up">Tally + WhatsApp + Returns +</span>
            <br />
            <span className="fade-in-up">Inventory in One App</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 fade-in-up">
            Indian D2C merchants save <span className="font-bold text-blue-300">8+ hours per week</span> automating order reconciliation, COD verification, returns, and inventory sync. No manual reconciliations. No device-linking risks. No surprise charges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              <ShoppingCart size={18} className="mr-2" />
              Install on Shopify App Store
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8">
              Watch Demo <ExternalLink size={18} className="ml-2" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 fade-in-up">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8 hrs</div>
              <div className="text-sm text-slate-400">Saved per week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-slate-400">Reconciliation errors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">₹8-45k</div>
              <div className="text-sm text-slate-400">Monthly, INR pricing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Real-time</div>
              <div className="text-sm text-slate-400">Inventory sync</div>
            </div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-16 fade-in-up">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 overflow-hidden">
            <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="pulse-animation mb-4">
                  <Loader size={48} className="text-blue-400 mx-auto" />
                </div>
                <p className="text-slate-400">Dashboard Preview</p>
                <p className="text-xs text-slate-500 mt-2">Real-time automation status, audit logs, configuration</p>
              </div>
            </div>
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
      description: "Every paid order becomes a GST-ready sales voucher in Tally Prime within seconds. No manual data entry, no missed transactions.",
      icon: BarChart3,
      benefits: [
        "GST-ready voucher format",
        "Automatic credit note generation",
        "Every push logged with audit trail",
        "Failed pushes retry + alert you",
      ],
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
    },
    {
      id: 2,
      title: "WhatsApp COD Verification",
      description: "Official WhatsApp Business Cloud API — never device-linking. Keep your merchant number safe from Meta bans.",
      icon: Send,
      benefits: [
        "Official Meta Cloud API only",
        "Send verification OTP within seconds",
        "Auto-tag confirmed vs. cancelled orders",
        "No device linking = no permanent bans",
      ],
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: 3,
      title: "Returns Management",
      description: "Branded returns portal with Shiprocket, Delhivery, and Blue Dart integrations. Idempotent restock logic — no duplicate additions.",
      icon: Target,
      benefits: [
        "Customer self-service portal",
        "Automatic courier pickup creation",
        "Idempotent restocking (no duplicates)",
        "Exchange-first flows to retain value",
      ],
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: 4,
      title: "Inventory Sync",
      description: "Real-time, webhook-driven inventory sync with SKU normalization and safety-stock buffer to prevent overselling.",
      icon: Zap,
      benefits: [
        "Real-time sync via webhooks",
        "SKU normalization (case + whitespace)",
        "Safety-stock buffer for flash sales",
        "Every change logged with its source",
      ],
      color: "from-yellow-500/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Four Automations, One App</h2>
          <p className="text-lg text-slate-400">Every problem Indian D2C merchants face, solved</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-gradient-to-br ${feature.color} border ${feature.borderColor} rounded-lg p-8 hover:border-opacity-100 transition`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-slate-300 mb-6">{feature.description}</p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <Check size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Key Differentiators */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield size={20} className="text-blue-400" />
              <h4 className="font-semibold text-white">Safety First</h4>
            </div>
            <p className="text-sm text-slate-400">Never device-linking for WhatsApp. Your merchant numbers never get permanently banned by Meta like competitor apps.</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 size={20} className="text-green-400" />
              <h4 className="font-semibold text-white">Full Transparency</h4>
            </div>
            <p className="text-sm text-slate-400">Complete audit log of every action. You always know what ran, when, and whether it succeeded. Silent failures are impossible.</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Users size={20} className="text-purple-400" />
              <h4 className="font-semibold text-white">Same-Day Support</h4>
            </div>
            <p className="text-sm text-slate-400">Founder-led support. Reply within the same business day (IST). No bots, no waiting queues.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ───
function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple INR Pricing</h2>
          <p className="text-lg text-slate-400">Flat monthly price. No per-order fees. No surprise usage charges.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Launch */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
            <h3 className="text-2xl font-bold text-white mb-2">Launch</h3>
            <p className="text-slate-400 mb-6 text-sm">For 1-2 automations</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹8,000</span>
              <p className="text-sm text-slate-400 mt-2">/month, first month setup free</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>1 automation (Tally or WhatsApp or Inventory)</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Up to 1,000 orders/month</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Audit log + basic support</span>
              </li>
              <li className="flex items-start gap-2 text-slate-500 text-sm">
                <AlertCircle size={16} className="flex-shrink-0 mt-1" />
                <span>Returns not included</span>
              </li>
            </ul>

            <Button className="w-full bg-slate-700 hover:bg-slate-600">
              Get Started
            </Button>
          </div>

          {/* Growth - Featured */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500 rounded-lg p-8 relative md:-translate-y-4 shadow-xl shadow-blue-500/10">
            <div className="absolute -top-4 left-8 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">MOST POPULAR</div>
            <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
            <p className="text-blue-300 mb-6 text-sm">For all 4 automations</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹16,000</span>
              <p className="text-sm text-slate-300 mt-2">/month, unlimited orders</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-white text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>All 4 automations included</span>
              </li>
              <li className="flex items-start gap-2 text-white text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Unlimited orders & inventory items</span>
              </li>
              <li className="flex items-start gap-2 text-white text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>WhatsApp official Cloud API</span>
              </li>
              <li className="flex items-start gap-2 text-white text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Priority founder support (same day)</span>
              </li>
              <li className="flex items-start gap-2 text-white text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Full audit logs + analytics</span>
              </li>
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Install Now
            </Button>
          </div>

          {/* Pro */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-slate-600 transition">
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-slate-400 mb-6 text-sm">Custom, high-volume setups</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">₹45,000</span>
              <p className="text-sm text-slate-400 mt-2">/month + custom features</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Everything in Growth</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Unlimited scaling (10k+/month orders)</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Custom webhook integrations</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Dedicated Slack channel</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-green-400 flex-shrink-0 mt-1" />
                <span>Custom features (1 per quarter)</span>
              </li>
            </ul>

            <Button className="w-full bg-slate-700 hover:bg-slate-600">
              Contact Sales
            </Button>
          </div>
        </div>

        <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
          <p className="text-slate-300 mb-4">
            💰 First month is <span className="font-bold text-green-400">setup + onboarding free</span>. You only pay from month 2.
          </p>
          <p className="text-sm text-slate-400">
            Billing happens through Shopify. No separate invoices, no surprises.
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
      a: "Yes. Threxa is an official Shopify ecosystem app. It goes through Shopify's security review and is distributed through the Shopify App Store. You install it like any other Shopify app.",
    },
    {
      id: 2,
      q: "Will WhatsApp get my merchant number banned?",
      a: "No. Threxa uses the official WhatsApp Business Cloud API through a Meta-approved Business Solution Provider (BSP). We never device-link, which is what causes permanent Meta bans. Your number is always safe.",
    },
    {
      id: 3,
      q: "What if Threxa breaks or stops working?",
      a: "You get a WhatsApp + email alert immediately, same business day. We track every action in an audit log so you can see exactly what happened. No silent failures.",
    },
    {
      id: 4,
      q: "Do I need to install anything on my computer?",
      a: "For Tally reconciliation, yes — you run a lightweight bridge on your accounts machine (1 HTTP server, ~50 lines). For WhatsApp, returns, and inventory: all cloud-based, nothing to install.",
    },
    {
      id: 5,
      q: "Can I cancel anytime?",
      a: "Yes. Uninstall the app from your Shopify admin. You stop being charged the next billing cycle. No long-term contracts.",
    },
    {
      id: 6,
      q: "What about data export / GDPR?",
      a: "Full GDPR compliance. On uninstall, all your data is deleted within 48 hours. You can export audit logs anytime. No vendor lock-in.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">FAQ</h2>
          <p className="text-lg text-slate-400">Common questions from D2C merchants</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full text-left bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                <span className={`transform transition ${openId === faq.id ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {openId === faq.id && (
                <div className="mt-4 pt-4 border-t border-slate-700 text-slate-300">
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
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Install Threxa on Your Shopify Store Today</h2>
        <p className="text-lg text-blue-100 mb-8">First month setup is free. Start automating from month 2.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-8">
            <ShoppingCart size={18} className="mr-2" />
            Shopify App Store
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8">
            Schedule Demo
          </Button>
        </div>
        <p className="text-sm text-blue-100 mt-6">Questions? Founder-led support: +91 7483 992 418 (WhatsApp)</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <img src={thexaLogo} alt="Threxa" className="h-8 mb-4" />
            <p className="text-slate-400 text-sm">D2C automation for Shopify brands in India.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="https://theingredientlist.co" className="hover:text-white transition">Built by TIL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Status Page</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+917483992418" className="hover:text-white transition">+91 7483 992 418</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:sachin@theingredientlist.co" className="hover:text-white transition">Email</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400">
            © 2026 Threxa by The Ingredient List. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin size={18} />
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
