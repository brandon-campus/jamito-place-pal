
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Heart, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">J</span>
          </div>
          <h2 className="ml-2 font-bold text-xl tracking-tight">PlacePal</h2>
        </Link>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
