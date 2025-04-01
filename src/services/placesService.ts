
import { Place } from "@/components/PlaceCard";

// Mock data para lugares
const mockPlaces: Place[] = [
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
    id: "2",
    name: "La Terraza Romántica",
    description: "Restaurante con una hermosa terraza y vistas espectaculares, ideal para cenas románticas. Cocina mediterránea de autor.",
    address: "Calle Alcalá 85, Madrid",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Restaurante", "Romántico", "Terraza", "Cena"],
    rating: 4.8,
    priceLevel: 3,
    openNow: true,
    distance: "2.5 km"
  },
  {
    id: "3",
    name: "Coworking Creativo",
    description: "Espacio de coworking con ambiente dinámico, ideal para freelancers y emprendedores. Dispone de salas de reuniones y eventos.",
    address: "Calle Fuencarral 56, Madrid",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Coworking", "Trabajo", "Networking", "WiFi"],
    rating: 4.5,
    priceLevel: 2,
    openNow: true,
    distance: "0.8 km"
  },
  {
    id: "4",
    name: "Parque Familiar El Retiro",
    description: "Gran parque urbano con zonas verdes, lago y actividades para toda la familia. Perfecto para un día al aire libre.",
    address: "Plaza de la Independencia, Madrid",
    image: "https://images.unsplash.com/photo-1494122353634-c310f45a6d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Parque", "Familia", "Aire libre", "Gratis"],
    rating: 4.9,
    priceLevel: 1,
    openNow: true,
    distance: "3.0 km"
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
  },
  {
    id: "6",
    name: "Biblioteca Central",
    description: "Biblioteca moderna con espacios de lectura tranquilos, Wi-Fi gratuito y una gran colección de libros y recursos digitales.",
    address: "Calle Serrano 118, Madrid",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Biblioteca", "Tranquilo", "Estudio", "Gratis"],
    rating: 4.6,
    priceLevel: 1,
    openNow: true,
    distance: "2.1 km"
  },
  {
    id: "7",
    name: "Restaurant Familia Torres",
    description: "Restaurante familiar con menú para niños y zona de juegos. Cocina tradicional en un ambiente acogedor.",
    address: "Calle Doctor Fleming 32, Madrid",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Restaurante", "Familia", "Niños", "Menú infantil"],
    rating: 4.2,
    priceLevel: 2,
    openNow: true,
    distance: "3.7 km"
  },
  {
    id: "8",
    name: "Museo Interactivo",
    description: "Museo con exposiciones interactivas para todas las edades. Perfecto para aprender y divertirse en familia o con amigos.",
    address: "Paseo de la Castellana 214, Madrid",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    categories: ["Museo", "Cultural", "Familia", "Educativo"],
    rating: 4.7,
    priceLevel: 2,
    openNow: false,
    distance: "4.2 km"
  }
];

// Servicio para obtener lugares
export const fetchPlaces = async (filters?: any): Promise<Place[]> => {
  // Simulamos una llamada a API con retraso
  return new Promise((resolve) => {
    setTimeout(() => {
      // Si hay filtros, aplicarlos (esto es un mock simple)
      if (filters) {
        let filteredPlaces = [...mockPlaces];
        
        // Filtrar por precio
        if (filters.priceRange) {
          filteredPlaces = filteredPlaces.filter(
            (place) => place.priceLevel >= filters.priceRange[0] && place.priceLevel <= filters.priceRange[1]
          );
        }
        
        // Filtrar por categorías
        if (filters.categories && filters.categories.length > 0) {
          // Este es un mock simple - en una app real habría una relación más compleja entre categorías
          filteredPlaces = filteredPlaces.filter((place) =>
            place.categories.some((cat) => 
              filters.categories.includes(cat.toLowerCase())
            )
          );
        }
        
        // Ordenar resultados
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'rating':
              filteredPlaces.sort((a, b) => b.rating - a.rating);
              break;
            case 'distance':
              filteredPlaces.sort((a, b) => {
                const distA = parseFloat(a.distance?.replace('km', '').trim() || '0');
                const distB = parseFloat(b.distance?.replace('km', '').trim() || '0');
                return distA - distB;
              });
              break;
            case 'price-low':
              filteredPlaces.sort((a, b) => a.priceLevel - b.priceLevel);
              break;
            case 'price-high':
              filteredPlaces.sort((a, b) => b.priceLevel - a.priceLevel);
              break;
            // Por defecto, relevancia (ya está ordenado)
            default:
              break;
          }
        }
        
        resolve(filteredPlaces);
      } else {
        resolve(mockPlaces);
      }
    }, 500);
  });
};

// Obtener un lugar por ID
export const getPlaceById = async (id: string): Promise<Place | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const place = mockPlaces.find((p) => p.id === id);
      resolve(place);
    }, 300);
  });
};

// Obtenemos lugares por texto de búsqueda
export const searchPlaces = async (query: string): Promise<Place[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredPlaces = mockPlaces.filter(
        (place) =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.description.toLowerCase().includes(query.toLowerCase()) ||
          place.categories.some((cat) => cat.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(filteredPlaces);
    }, 500);
  });
};

// Obtener lugares por categoría
export const getPlacesByCategory = async (category: string): Promise<Place[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mapeamos algunos slugs a categorías (esto sería más complejo en una app real)
      const categoryMap: Record<string, string[]> = {
        'cafeterias': ['Café'],
        'restaurantes': ['Restaurante'],
        'bares': ['Bar', 'Cócteles'],
        'trabajo': ['Trabajo', 'Coworking', 'WiFi'],
        'citas': ['Romántico', 'Cena'],
        'familia': ['Familia', 'Niños'],
        'amigos': ['Amigos', 'Música'],
        'lectura-cultura': ['Biblioteca', 'Cultural', 'Museo'],
        'musica-ocio': ['Música', 'Bar']
      };
      
      const categoriesToMatch = categoryMap[category] || [];
      
      if (categoriesToMatch.length === 0) {
        resolve(mockPlaces);
        return;
      }
      
      const filteredPlaces = mockPlaces.filter((place) =>
        place.categories.some((cat) => 
          categoriesToMatch.includes(cat)
        )
      );
      
      resolve(filteredPlaces);
    }, 500);
  });
};
