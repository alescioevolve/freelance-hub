import { Shield, Award, Users, Clock } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Secure payments",
    description: "Your payment is protected until you approve the work",
  },
  {
    icon: Award,
    title: "Quality guarantee",
    description: "Get refunded if the work isn't up to your standards",
  },
  {
    icon: Users,
    title: "24/7 support",
    description: "Our team is here to help you every step of the way",
  },
  {
    icon: Clock,
    title: "Fast delivery",
    description: "Most projects are completed within 1-3 days",
  },
]

const testimonials = [
  {
    name: "Jennifer Wilson",
    role: "Marketing Director",
    company: "TechStart Inc.",
    content: "FreelanceHub helped us find amazing talent quickly. The quality of work exceeded our expectations.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Thompson",
    role: "Startup Founder",
    company: "InnovateLab",
    content: "As a freelancer, this platform has been incredible for growing my business and finding great clients.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lisa Chang",
    role: "Creative Director",
    company: "Design Studio",
    content: "The variety of services and the quality of freelancers on this platform is unmatched.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why choose FreelanceHub?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Join millions of businesses and freelancers who trust our platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">What our users say</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-card rounded-lg p-6 border border-border">
                <p className="text-card-foreground mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
