import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  image: string;
  perks: string[];
}

export function RestaurantCard({ restaurant, index = 0 }: { restaurant: Restaurant, index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/70 backdrop-blur-sm h-full flex flex-col">
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1">{restaurant.name}</CardTitle>
              <CardDescription className="flex items-center text-sm text-slate-500">
                <MapPin className="w-3 h-3 mr-1" />
                {restaurant.location}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center bg-slate-100 font-medium shrink-0">
              <Star className="w-3 h-3 mr-1 text-amber-400 fill-amber-400" />
              {restaurant.rating}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <p className="text-sm text-slate-600 mb-3">{restaurant.cuisine}</p>
          <div className="flex flex-wrap gap-2">
            {restaurant.perks.slice(0, 2).map((perk, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                {perk}
              </Badge>
            ))}
            {restaurant.perks.length > 2 && (
              <Badge variant="outline" className="text-xs text-slate-500">
                +{restaurant.perks.length - 2} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all">
            <Link to={`/restaurant/${restaurant.id}`}>View Details & Perks</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
