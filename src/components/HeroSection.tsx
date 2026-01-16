import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home, Building2, Warehouse, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "commercial">("buy");
  const [location, setLocation] = useState("");

  const tabs = [
    { id: "buy", label: "Buy", icon: Home },
    { id: "rent", label: "Rent", icon: Building2 },
    { id: "commercial", label: "Commercial", icon: Warehouse },
  ] as const;

  const popularSearches = [
    "3 BHK in Mumbai",
    "Villa in Bangalore",
    "Apartments near Metro",
    "Office Space in Pune",
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
            AI-Powered Property Search
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Find Your Perfect
            <span className="block mt-2 text-gradient">Dream Home</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Discover 50,000+ properties with AI-powered recommendations, 
            virtual tours, and smart insights to make your perfect choice.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Tabs */}
            <div className="flex gap-1 mb-3 p-1 bg-secondary rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter city, area or landmark..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Property Type */}
              <button className="flex items-center justify-between gap-3 px-4 py-3 bg-secondary/50 rounded-xl md:w-48">
                <span className="text-muted-foreground">Property Type</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Budget */}
              <button className="flex items-center justify-between gap-3 px-4 py-3 bg-secondary/50 rounded-xl md:w-48">
                <span className="text-muted-foreground">Budget</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Search Button */}
              <Button variant="accent" size="xl" className="md:w-auto">
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <span className="text-white/50 text-sm">Popular:</span>
            {popularSearches.map((search) => (
              <button
                key={search}
                className="px-4 py-2 text-sm text-white/80 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            {[
              { value: "50K+", label: "Properties Listed" },
              { value: "10K+", label: "Happy Customers" },
              { value: "200+", label: "Cities Covered" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
