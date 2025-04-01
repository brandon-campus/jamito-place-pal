
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceCard, { Place } from '@/components/PlaceCard';
import { Heart } from 'lucide-react';

// Mock de lugares favoritos (en un entorno real esto vendría de una base de datos)
const mockFavorites: Place[] = [
  {
    id: "1",
    name: "Café del Arte",
    description: "Un café tranquilo con un ambiente acogedor, perfecto para trabajar o leer. Ofrecen café de especialidad y pasteles caseros.",
    address: "Calle Gran Vía 24, Madrid",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Café", "Tranquilo", "Trabajo", "WiFi"],
    rating: 4.7,
    priceLevel: 2,
    openNow: true,
    distance: "1.2 km"
  },
  {
    id: "5",
    name: "Bar La Noche",
    description: "Bar animado con música en vivo y una amplia selección de cócteles. Gran ambiente para salir con amigos.",
    address: "Calle Huertas 23, Madrid",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Bar", "Música", "Cócteles", "Amigos"],
    rating: 4.3,
    priceLevel: 2,
    openNow: false,
    distance: "1.5 km"
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulamos carga de favoritos desde el servidor
    const loadFavorites = () => {
      setLoading(true);
      setTimeout(() => {
        setFavorites(mockFavorites);
        setLoading(false);
      }, 800);
    };
    
    loadFavorites();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Tus Lugares Favoritos</h1>
          <p className="text-muted-foreground">
            Guarda tus lugares preferidos para acceder a ellos rápidamente.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="place-card animate-pulse-slow">
                <div className="h-48 bg-muted rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
                  <div className="h-12 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aún no tienes favoritos</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explora lugares y guárdalos como favoritos para acceder a ellos fácilmente.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
