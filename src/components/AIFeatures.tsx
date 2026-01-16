import { Bot, Mic, TrendingUp, FileText, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bot,
    title: "AI Chatbot Assistant",
    description: "Get instant answers about properties, loans, and localities. Available 24/7 to help you find your perfect home.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mic,
    title: "Voice Search",
    description: "Just speak! Search for properties naturally with our advanced voice recognition in multiple languages.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "AI-powered price predictions, growth analysis, and investment recommendations for smart decisions.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: FileText,
    title: "Document Assistant",
    description: "Understand complex agreements with AI explanations. Simplified legal terms and smart document management.",
    color: "from-emerald-500 to-teal-500",
  },
];

const AIFeatures = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Smart Features for
            <span className="text-gradient"> Smarter Decisions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience the future of real estate with our AI-powered tools designed 
            to make your property search effortless and informed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-accent/30 shadow-card hover:shadow-card-hover transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>
              <Button variant="ghost" className="p-0 h-auto text-accent hover:text-accent/80">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="accent" size="xl">
            <Bot className="w-5 h-5 mr-2" />
            Try AI Assistant Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
