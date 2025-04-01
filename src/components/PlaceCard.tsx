
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Place = {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  categories: string[];
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  openNow?: boolean;
  distance?: string;
};

const PlaceCard = ({ place }: { place: Place }) => {
  const { name, description, address, image, categories, rating, priceLevel, openNow, distance } = place;
  
  // Función helper para mostrar nivel de precio
  const getPriceSymbol = (level: number) => {
    return Array(level).fill('$').join('');
  };
  
  // Rating stars helper
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (halfStar) {
      stars.push(
        <svg key="half-star" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };
  
  return (
    <div className="place-card flex flex-col h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="h-48 w-full object-cover"
        />
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white/100"
        >
          <Heart className="h-5 w-5 text-pink-500" />
        </Button>
        
        {openNow !== undefined && (
          <Badge 
            variant={openNow ? "default" : "outline"} 
            className="absolute bottom-2 left-2"
          >
            {openNow ? "Abierto ahora" : "Cerrado"}
          </Badge>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
          <span className="text-sm font-medium text-muted-foreground">
            {getPriceSymbol(priceLevel)}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
          
          {distance && (
            <span className="text-sm text-muted-foreground ml-auto">{distance}</span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-auto line-clamp-1">{address}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
