
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, Map, List, SortAsc, MapPin } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Opciones de filtro
const sortOptions = [
  { value: "relevance", label: "Relevancia" },
  { value: "rating", label: "Mejor valoración" },
  { value: "distance", label: "Distancia" },
  { value: "price-low", label: "Precio: de menor a mayor" },
  { value: "price-high", label: "Precio: de mayor a menor" },
];

const categories = [
  { value: "cafe", label: "Cafeterías" },
  { value: "restaurant", label: "Restaurantes" },
  { value: "bar", label: "Bares" },
  { value: "coworking", label: "Espacios de coworking" },
  { value: "library", label: "Bibliotecas" },
  { value: "park", label: "Parques" },
  { value: "cultural", label: "Espacios culturales" },
  { value: "shopping", label: "Centros comerciales" },
];

interface FilterBarProps {
  onViewChange?: (view: 'list' | 'map') => void;
  view?: 'list' | 'map';
  onFilterChange?: (filters: any) => void;
}

const FilterBar = ({ onViewChange, view = 'list', onFilterChange }: FilterBarProps) => {
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Actualización de precio
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    if (onFilterChange) {
      onFilterChange({
        priceRange: values,
        sortBy,
        categories: selectedCategories
      });
    }
  };
  
  // Actualización de orden
  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        sortBy: value,
        categories: selectedCategories
      });
    }
  };
  
  // Actualización de categorías
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        sortBy,
        categories: newCategories
      });
    }
  };
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-3 sticky top-[73px] z-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Filtro de Precio */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <span className="mr-1">Precio:</span> 
                <span className="font-bold">{Array(priceRange[0]).fill('$').join('')}</span>
                <span className="mx-1">-</span> 
                <span className="font-bold">{Array(priceRange[1]).fill('$').join('')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4 p-2">
                <h4 className="font-medium">Rango de precio</h4>
                <Slider
                  defaultValue={priceRange}
                  max={4}
                  min={1}
                  step={1}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div>Económico ($)</div>
                  <div>Lujoso ($$$$)</div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Filtro de Ordenación */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <SortAsc className="h-4 w-4 mr-2" />
                Ordenar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {sortOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSortChange}
                        className={sortBy === option.value ? "bg-accent" : ""}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <span className="ml-auto">✓</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Filtro de Categorías */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Categorías
                {selectedCategories.length > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar categoría..." />
                <CommandList>
                  <CommandEmpty>No se encontraron categorías.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={() => toggleCategory(category.value)}
                        className={selectedCategories.includes(category.value) ? "bg-accent" : ""}
                      >
                        {category.label}
                        {selectedCategories.includes(category.value) && (
                          <span className="ml-auto">✓</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Filtro de Ubicación */}
          <Button variant="outline" size="sm" className="h-9">
            <MapPin className="h-4 w-4 mr-2" />
            Cerca
          </Button>
        </div>
        
        {/* Cambio de vista: Lista/Mapa */}
        <div className="flex items-center">
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="h-9"
            onClick={() => onViewChange && onViewChange('list')}
          >
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={view === 'map' ? 'default' : 'ghost'}
            size="sm"
            className="h-9"
            onClick={() => onViewChange && onViewChange('map')}
          >
            <Map className="h-4 w-4 mr-2" />
            Mapa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
