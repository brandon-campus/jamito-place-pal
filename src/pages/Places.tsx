
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceCard, { Place } from '@/components/PlaceCard';
import FilterBar from '@/components/FilterBar';
import { fetchPlaces, getPlacesByCategory } from '@/services/placesService';
import { MapPin } from 'lucide-react';

const Places = () => {
  const [searchParams] = useSearchParams();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({});
  
  const category = searchParams.get('category');
  
  // Cargar lugares
  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        let data;
        if (category) {
          data = await getPlacesByCategory(category);
        } else {
          data = await fetchPlaces(filters);
        }
        setPlaces(data);
      } catch (error) {
        console.error('Error loading places:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPlaces();
  }, [category, filters]);
  
  // Manejar cambios de filtro
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            {category 
              ? `Lugares para ${category.replace('-', ' ')}`
              : 'Lugares recomendados'}
          </h1>
          <p className="text-muted-foreground">
            Explora los mejores lugares basados en tus preferencias.
          </p>
        </div>
        
        <FilterBar 
          view={view} 
          onViewChange={setView} 
          onFilterChange={handleFilterChange}
        />
        
        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
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
        ) : view === 'list' ? (
          places.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="mt-8 text-center py-12">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron lugares</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Prueba a ajustar los filtros o busca otra categoría para ver más resultados.
              </p>
            </div>
          )
        ) : (
          <div className="mt-8 h-[500px] rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Vista de mapa en desarrollo</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Places;
