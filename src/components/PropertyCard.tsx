import { Heart, MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    price: string;
    pricePerSqft: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    status: "Ready to Move" | "Under Construction";
    image: string;
    isNew?: boolean;
    isFeatured?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isNew && (
            <Badge className="bg-accent text-accent-foreground border-0">New</Badge>
          )}
          {property.isFeatured && (
            <Badge className="bg-primary text-primary-foreground border-0">Featured</Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {property.status}
          </Badge>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked
              ? "bg-accent text-white"
              : "bg-white/90 text-muted-foreground hover:text-accent"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="text-2xl font-bold text-white">{property.price}</div>
          <div className="text-sm text-white/80">{property.pricePerSqft}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>
          <Badge variant="outline" className="flex-shrink-0">
            {property.type}
          </Badge>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 py-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bed className="w-4 h-4" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Square className="w-4 h-4" />
            <span>{property.sqft} sq.ft</span>
          </div>
        </div>

        {/* Action */}
        <Button variant="outline" className="w-full group/btn">
          View Details
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
