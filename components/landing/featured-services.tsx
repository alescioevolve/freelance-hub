import { Star, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const featuredServices = [
  {
    id: "1",
    title: "I will create a modern responsive website using React and Next.js",
    freelancer: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Level 2 Seller",
      rating: 4.9,
      reviewCount: 127,
    },
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    tags: ["React", "Next.js", "Responsive"],
    isFavorite: false,
  },
  {
    id: "2",
    title: "I will design a professional logo and brand identity package",
    freelancer: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Top Rated Seller",
      rating: 5.0,
      reviewCount: 89,
    },
    image: "/placeholder.svg?height=200&width=300",
    price: 75,
    tags: ["Logo Design", "Branding", "Identity"],
    isFavorite: true,
  },
  {
    id: "3",
    title: "I will write engaging content for your website and blog",
    freelancer: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Level 2 Seller",
      rating: 4.8,
      reviewCount: 203,
    },
    image: "/placeholder.svg?height=200&width=300",
    price: 50,
    tags: ["Content Writing", "SEO", "Blog"],
    isFavorite: false,
  },
  {
    id: "4",
    title: "I will create stunning video animations for your business",
    freelancer: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Level 1 Seller",
      rating: 4.7,
      reviewCount: 156,
    },
    image: "/placeholder.svg?height=200&width=300",
    price: 200,
    tags: ["Animation", "Video", "Motion Graphics"],
    isFavorite: false,
  },
]

export function FeaturedServices() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top-rated services from our most talented freelancers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
              <div className="relative">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className={`h-4 w-4 ${service.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={service.freelancer.avatar || "/placeholder.svg"}
                    alt={service.freelancer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{service.freelancer.name}</p>
                    <p className="text-xs text-muted-foreground">{service.freelancer.level}</p>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-card-foreground">{service.freelancer.rating}</span>
                  <span className="text-sm text-muted-foreground">({service.freelancer.reviewCount})</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <p className="text-lg font-bold text-card-foreground">${service.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            View all services
          </Button>
        </div>
      </div>
    </section>
  )
}
