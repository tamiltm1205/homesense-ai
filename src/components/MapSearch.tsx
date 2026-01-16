import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  School, 
  Hospital, 
  Train, 
  ShoppingBag, 
  Building2,
  Trash2,
  Pencil,
  Search,
  Filter,
  X,
  Home,
  IndianRupee
} from 'lucide-react';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

// Sample property data with coordinates
const properties = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment",
    price: 8500000,
    location: "Anna Nagar, Chennai",
    coordinates: [80.2089, 13.0850],
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
  },
  {
    id: 2,
    title: "Modern 2BHK Flat",
    price: 5500000,
    location: "T Nagar, Chennai",
    coordinates: [80.2341, 13.0418],
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
  },
  {
    id: 3,
    title: "Premium Villa",
    price: 25000000,
    location: "ECR, Chennai",
    coordinates: [80.2707, 12.9855],
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400"
  },
  {
    id: 4,
    title: "Spacious 3BHK",
    price: 7200000,
    location: "Velachery, Chennai",
    coordinates: [80.2209, 12.9815],
    bedrooms: 3,
    bathrooms: 2,
    area: 1350,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
  },
  {
    id: 5,
    title: "Compact 1BHK",
    price: 3200000,
    location: "Adyar, Chennai",
    coordinates: [80.2574, 13.0067],
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
  },
  {
    id: 6,
    title: "Penthouse Suite",
    price: 45000000,
    location: "Boat Club, Chennai",
    coordinates: [80.2645, 13.0524],
    bedrooms: 5,
    bathrooms: 5,
    area: 5000,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
  }
];

// Nearby places data
const nearbyPlaces = [
  { id: 1, name: "Chennai Public School", type: "school", coordinates: [80.2150, 13.0820] },
  { id: 2, name: "Apollo Hospital", type: "hospital", coordinates: [80.2250, 13.0600] },
  { id: 3, name: "Koyambedu Metro", type: "metro", coordinates: [80.1963, 13.0694] },
  { id: 4, name: "Phoenix Mall", type: "shopping", coordinates: [80.2209, 12.9915] },
  { id: 5, name: "TCS IT Park", type: "office", coordinates: [80.2507, 12.9055] },
  { id: 6, name: "Government Hospital", type: "hospital", coordinates: [80.2774, 13.0827] },
  { id: 7, name: "Central Station", type: "metro", coordinates: [80.2752, 13.0836] },
  { id: 8, name: "Express Avenue", type: "shopping", coordinates: [80.2625, 13.0600] },
];

const placeIcons: Record<string, React.ReactNode> = {
  school: <School className="w-3 h-3" />,
  hospital: <Hospital className="w-3 h-3" />,
  metro: <Train className="w-3 h-3" />,
  shopping: <ShoppingBag className="w-3 h-3" />,
  office: <Building2 className="w-3 h-3" />,
};

const placeColors: Record<string, string> = {
  school: '#10b981',
  hospital: '#ef4444',
  metro: '#6366f1',
  shopping: '#f59e0b',
  office: '#8b5cf6',
};

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)}Cr`;
  }
  return `₹${(price / 100000).toFixed(1)}L`;
};

const MapSearch = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const placeMarkersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [drawnPolygon, setDrawnPolygon] = useState<GeoJSON.Feature | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showNearby, setShowNearby] = useState({
    school: true,
    hospital: true,
    metro: true,
    shopping: true,
    office: true,
  });

  // Check if point is inside polygon
  const isPointInPolygon = useCallback((point: number[], polygon: number[][]) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1];
      const xj = polygon[j][0], yj = polygon[j][1];
      
      const intersect = ((yi > point[1]) !== (yj > point[1]))
          && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }, []);

  // Filter properties based on criteria and polygon
  const applyFilters = useCallback(() => {
    let filtered = properties.filter(p => 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1] &&
      (selectedTypes.length === 0 || selectedTypes.includes(p.type))
    );

    if (drawnPolygon && drawnPolygon.geometry.type === 'Polygon') {
      const polygonCoords = (drawnPolygon.geometry as GeoJSON.Polygon).coordinates[0];
      filtered = filtered.filter(p => 
        isPointInPolygon(p.coordinates, polygonCoords)
      );
    }

    setFilteredProperties(filtered);
  }, [priceRange, selectedTypes, drawnPolygon, isPointInPolygon]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [80.2707, 13.0827], // Chennai center
      zoom: 11,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right'
    );

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      'top-right'
    );

    // Initialize draw control
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'simple_select',
      styles: [
        {
          id: 'gl-draw-polygon-fill',
          type: 'fill',
          filter: ['all', ['==', '$type', 'Polygon']],
          paint: {
            'fill-color': '#d4a853',
            'fill-outline-color': '#d4a853',
            'fill-opacity': 0.2,
          },
        },
        {
          id: 'gl-draw-polygon-stroke',
          type: 'line',
          filter: ['all', ['==', '$type', 'Polygon']],
          paint: {
            'line-color': '#d4a853',
            'line-width': 2,
          },
        },
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex']],
          paint: {
            'circle-radius': 7,
            'circle-color': '#FFF',
          },
        },
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex']],
          paint: {
            'circle-radius': 5,
            'circle-color': '#d4a853',
          },
        },
      ],
    });

    map.current.addControl(draw.current, 'top-left');

    // Handle draw events
    map.current.on('draw.create', (e: { features: GeoJSON.Feature[] }) => {
      const polygon = e.features[0];
      setDrawnPolygon(polygon);
      setIsDrawMode(false);
    });

    map.current.on('draw.update', (e: { features: GeoJSON.Feature[] }) => {
      const polygon = e.features[0];
      setDrawnPolygon(polygon);
    });

    map.current.on('draw.delete', () => {
      setDrawnPolygon(null);
    });

    map.current.on('load', () => {
      setIsMapReady(true);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken, initializeMap]);

  // Add property markers
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for filtered properties
    filteredProperties.forEach(property => {
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `
        <div class="bg-primary text-primary-foreground px-2 py-1 rounded-lg shadow-elegant cursor-pointer transform hover:scale-110 transition-transform flex items-center gap-1" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);">
          <span class="text-xs font-bold">${formatPrice(property.price)}</span>
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(property.coordinates as [number, number])
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedProperty(property);
        map.current?.flyTo({
          center: property.coordinates as [number, number],
          zoom: 14,
          duration: 1000,
        });
      });

      markersRef.current.push(marker);
    });
  }, [filteredProperties, isMapReady]);

  // Add nearby place markers
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    // Clear existing place markers
    placeMarkersRef.current.forEach(marker => marker.remove());
    placeMarkersRef.current = [];

    // Add markers for visible place types
    nearbyPlaces.forEach(place => {
      if (!showNearby[place.type as keyof typeof showNearby]) return;

      const el = document.createElement('div');
      el.className = 'place-marker';
      el.innerHTML = `
        <div class="w-6 h-6 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform" style="background: ${placeColors[place.type]};">
          <div class="w-3 h-3 text-white flex items-center justify-center">
            ${place.type === 'school' ? '🏫' : place.type === 'hospital' ? '🏥' : place.type === 'metro' ? '🚇' : place.type === 'shopping' ? '🛍️' : '🏢'}
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <p class="font-semibold text-sm">${place.name}</p>
          <p class="text-xs text-gray-500 capitalize">${place.type}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(place.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current!);

      placeMarkersRef.current.push(marker);
    });
  }, [showNearby, isMapReady]);

  const handleDrawPolygon = () => {
    if (draw.current) {
      draw.current.changeMode('draw_polygon');
      setIsDrawMode(true);
    }
  };

  const handleClearPolygon = () => {
    if (draw.current) {
      draw.current.deleteAll();
      setDrawnPolygon(null);
      setIsDrawMode(false);
    }
  };

  const togglePropertyType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  if (!mapboxToken) {
    return (
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <MapPin className="w-3 h-3 mr-1" />
              Map Search
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Explore Properties on <span className="text-gradient">Interactive Map</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search properties visually, draw custom areas, and discover nearby amenities
            </p>
          </div>

          <Card className="max-w-md mx-auto p-8 glass-card">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enter Mapbox Token</h3>
              <p className="text-sm text-muted-foreground">
                To use the interactive map, please enter your Mapbox public token. 
                Get one free at{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="pk.eyJ1Ijo..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
              <Button 
                className="w-full" 
                onClick={() => mapboxToken && initializeMap()}
                disabled={!mapboxToken}
              >
                Load Map
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <MapPin className="w-3 h-3 mr-1" />
            Map Search
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Explore Properties on <span className="text-gradient">Interactive Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search properties visually, draw custom areas, and discover nearby amenities
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="p-4 glass-card sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={50000000}
                    step={500000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Property Types */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Property Type</Label>
                  <div className="space-y-2">
                    {['Apartment', 'Villa', 'Penthouse'].map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => togglePropertyType(type)}
                        />
                        <Label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Draw Area */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Draw Search Area</Label>
                  <div className="space-y-2">
                    <Button
                      variant={isDrawMode ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={handleDrawPolygon}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      {isDrawMode ? 'Drawing...' : 'Draw Polygon'}
                    </Button>
                    {drawnPolygon && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={handleClearPolygon}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Area
                      </Button>
                    )}
                  </div>
                </div>

                {/* Nearby Places Toggle */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Show Nearby</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(showNearby).map(([type, visible]) => (
                      <Button
                        key={type}
                        variant={visible ? "default" : "outline"}
                        size="sm"
                        className="text-xs capitalize"
                        onClick={() => setShowNearby(prev => ({ ...prev, [type]: !prev[type] }))}
                        style={visible ? { backgroundColor: placeColors[type] } : {}}
                      >
                        {placeIcons[type]}
                        <span className="ml-1">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
                    {drawnPolygon && <span className="text-primary"> in selected area</span>}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden glass-card">
              <div ref={mapContainer} className="h-[600px] w-full" />
            </Card>

            {/* Property List Below Map */}
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProperties.map(property => (
                <Card 
                  key={property.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-elegant ${
                    selectedProperty?.id === property.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedProperty(property);
                    map.current?.flyTo({
                      center: property.coordinates as [number, number],
                      zoom: 14,
                      duration: 1000,
                    });
                  }}
                >
                  <div className="flex gap-3">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{property.title}</h4>
                      <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.location}
                      </p>
                      <p className="text-primary font-bold mt-1 flex items-center">
                        <IndianRupee className="w-3 h-3" />
                        {formatPrice(property.price)}
                      </p>
                      <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{property.bedrooms} BHK</span>
                        <span>•</span>
                        <span>{property.area} sq.ft</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSearch;
