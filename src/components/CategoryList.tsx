
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Utensils, Users, Heart, Briefcase, Music, Home, Library, Wine } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  slug: string;
};

const categories: Category[] = [
  {
    id: '1',
    name: 'Cafeterías',
    icon: <Coffee className="w-5 h-5 text-amber-600" />,
    slug: 'cafeterias'
  },
  {
    id: '2',
    name: 'Restaurantes',
    icon: <Utensils className="w-5 h-5 text-red-500" />,
    slug: 'restaurantes'
  },
  {
    id: '3',
    name: 'Citas románticas',
    icon: <Heart className="w-5 h-5 text-pink-500" />,
    slug: 'citas'
  },
  {
    id: '4',
    name: 'Trabajo',
    icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    slug: 'trabajo'
  },
  {
    id: '5',
    name: 'Bares',
    icon: <Wine className="w-5 h-5 text-purple-600" />,
    slug: 'bares'
  },
  {
    id: '6',
    name: 'Música y ocio',
    icon: <Music className="w-5 h-5 text-indigo-500" />,
    slug: 'musica-ocio'
  },
  {
    id: '7',
    name: 'Familia',
    icon: <Home className="w-5 h-5 text-green-500" />,
    slug: 'familia'
  },
  {
    id: '8',
    name: 'Amigos',
    icon: <Users className="w-5 h-5 text-orange-500" />,
    slug: 'amigos'
  },
  {
    id: '9',
    name: 'Lectura y cultura',
    icon: <Library className="w-5 h-5 text-teal-600" />,
    slug: 'lectura-cultura'
  }
];

const CategoryList = () => {
  return (
    <div className="py-6">
      <h3 className="text-xl font-bold mb-4">Categorías populares</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/places?category=${category.slug}`}
            className="category-pill flex-col text-center p-3"
          >
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary/10 mb-2">
              {category.icon}
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
