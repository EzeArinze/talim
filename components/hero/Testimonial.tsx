import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import { Badge } from "../ui/badge";

function Testimonial() {
  return (
    <section id="testimonials" className="py-10 lg:py-22">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="text-lg">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold ">
            Loved by educators worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of educators who have transformed their teaching with
            EduFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;EduFlow has completely transformed how I manage my online
                courses. The intuitive interface and powerful analytics have
                saved me countless hours.&quot;
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Sarah Johnson"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-primary">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    University Professor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;The student engagement features are incredible. My
                completion rates have increased by 60% since switching to
                EduFlow.&quot;
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Michael Chen"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-primary">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Corporate Trainer
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;Finally, an LMS that doesn&apos;t require a computer
                science degree to use. My team was up and running in
                minutes.&quot;
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Emily Rodriguez"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-primary">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">
                    Training Director
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
