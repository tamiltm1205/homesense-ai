import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "First-time Home Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "The AI assistant helped me find my dream apartment in just 2 days! The recommendations were spot-on and saved me weeks of searching.",
    rating: 5,
    property: "3 BHK in Mumbai",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Property Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "As an investor, the market insights and ROI predictions were invaluable. Made my first investment decision with complete confidence.",
    rating: 5,
    property: "Commercial Space in Bangalore",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Relocating Professional",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "Virtual tours and the voice search feature made house hunting so easy while I was relocating from abroad. Absolutely recommended!",
    rating: 5,
    property: "2 BHK in Hyderabad",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of happy homeowners who found their perfect property with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/20 mb-4" />

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-accent mt-1">Bought: {testimonial.property}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["HDFC", "ICICI", "SBI", "Axis Bank", "Kotak"].map((brand) => (
              <div key={brand} className="text-xl font-bold text-muted-foreground">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
