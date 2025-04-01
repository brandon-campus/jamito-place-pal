
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">PlacePal</h4>
            <p className="text-muted-foreground">
              Encuentra el lugar perfecto basado en tu estado emocional y necesidades.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Enlaces</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/chat" className="hover:text-primary transition-colors">Chat con Jamito</Link></li>
              <li><Link to="/places" className="hover:text-primary transition-colors">Lugares</Link></li>
              <li><Link to="/favorites" className="hover:text-primary transition-colors">Favoritos</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Categorías</h5>
            <ul className="space-y-2">
              <li><Link to="/places?category=work" className="hover:text-primary transition-colors">Trabajo</Link></li>
              <li><Link to="/places?category=dates" className="hover:text-primary transition-colors">Citas</Link></li>
              <li><Link to="/places?category=family" className="hover:text-primary transition-colors">Familia</Link></li>
              <li><Link to="/places?category=friends" className="hover:text-primary transition-colors">Amigos</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Términos</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} PlacePal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
