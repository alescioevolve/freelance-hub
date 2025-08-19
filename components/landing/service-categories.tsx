import { Code, Palette, Megaphone, PenTool, Video, Music, BarChart3, Globe, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    icon: Code,
    title: "Programming & Tech",
    description: "Web development, mobile apps, and software solutions",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Palette,
    title: "Graphics & Design",
    description: "Logo design, web design, and creative services",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "SEO, social media, and online advertising",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: PenTool,
    title: "Writing & Translation",
    description: "Content writing, copywriting, and translation services",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Video,
    title: "Video & Animation",
    description: "Video editing, animation, and motion graphics",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Music,
    title: "Music & Audio",
    description: "Voice over, music production, and audio editing",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: BarChart3,
    title: "Business",
    description: "Business consulting, market research, and strategy",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: Globe,
    title: "AI Services",
    description: "Machine learning, chatbots, and AI development",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Product photography, portraits, and photo editing",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

export function ServiceCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore our marketplace</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our diverse categories and find the perfect service for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border bg-card"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
