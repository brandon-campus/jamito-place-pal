
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryList from '@/components/CategoryList';
import JamitoCharacter from '@/components/JamitoCharacter';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-primary/10 to-background pt-10 pb-16">
          <div className="container px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Encuentra el lugar perfecto para cada momento
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Jamito te recomienda lugares según tu estado de ánimo y necesidades. ¡Dile qué buscas y te sorprenderá!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Hablar con Jamito
                  </Button>
                </Link>
                <Link to="/places">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500">
                    <Search className="mr-2 h-5 w-5" />
                    Explorar lugares
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -z-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <JamitoCharacter size="lg" animate={true} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categorías populares */}
        <section className="py-12">
          <div className="container px-4">
            <CategoryList />
          </div>
        </section>
        
        {/* Cómo funciona */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <MessageSquare className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cuéntale a Jamito</h3>
                <p className="text-muted-foreground">
                  Describe tu estado de ánimo o qué tipo de lugar estás buscando para tu actividad.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Search className="text-secondary-foreground h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Obtén recomendaciones</h3>
                <p className="text-muted-foreground">
                  Jamito analizará tus preferencias y te recomendará los lugares perfectos para ti.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <MapPin className="text-accent-foreground h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visita y disfruta</h3>
                <p className="text-muted-foreground">
                  Explora detalles de los lugares, guárdalos como favoritos y disfruta de tu experiencia.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-primary/10">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para encontrar tu lugar ideal?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Ya sea para trabajar, una cita romántica o un plan familiar, Jamito tiene la recomendación perfecta para ti.
            </p>
            
            <Link to="/chat">
              <Button size="lg" className="mx-auto">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
