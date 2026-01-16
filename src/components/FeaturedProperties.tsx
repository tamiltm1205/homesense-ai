import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Luxurious 4 BHK Villa with Private Pool",
    price: "₹2.5 Cr",
    pricePerSqft: "₹12,500/sq.ft",
    location: "Whitefield, Bangalore",
    beds: 4,
    baths: 4,
    sqft: 3200,
    type: "Villa",
    status: "Ready to Move" as const,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Modern 3 BHK Apartment with Sea View",
    price: "₹1.8 Cr",
    pricePerSqft: "₹18,000/sq.ft",
    location: "Marine Drive, Mumbai",
    beds: 3,
    baths: 3,
    sqft: 1800,
    type: "Apartment",
    status: "Ready to Move" as const,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Spacious 2 BHK in Gated Community",
    price: "₹85 Lac",
    pricePerSqft: "₹8,500/sq.ft",
    location: "Hinjewadi, Pune",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    status: "Under Construction" as const,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    isNew: true,
  },
  {
    id: 4,
    title: "Premium Penthouse with Terrace Garden",
    price: "₹4.2 Cr",
    pricePerSqft: "₹25,000/sq.ft",
    location: "Jubilee Hills, Hyderabad",
    beds: 5,
    baths: 5,
    sqft: 4500,
    type: "Penthouse",
    status: "Ready to Move" as const,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    isFeatured: true,
  },
  {
    id: 5,
    title: "Cozy 1 BHK Studio Apartment",
    price: "₹45 Lac",
    pricePerSqft: "₹9,000/sq.ft",
    location: "Koramangala, Bangalore",
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "Studio",
    status: "Ready to Move" as const,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: 6,
    title: "Elegant 3 BHK Row House",
    price: "₹1.2 Cr",
    pricePerSqft: "₹10,000/sq.ft",
    location: "OMR, Chennai",
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: "Row House",
    status: "Under Construction" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    isNew: true,
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent font-semibold mb-3">
              <Sparkles className="w-5 h-5" />
              Featured Properties
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Handpicked Homes for You
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Explore our curated selection of premium properties, chosen based on location, 
              amenities, and investment potential.
            </p>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Properties
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg">
            Load More Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
