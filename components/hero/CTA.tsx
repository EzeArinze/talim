import { CheckCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function CTA() {
  return (
    <section className="py-10 lg:py-20 bg-gradient-to-r from-primay-600 to-secondary-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold ">
            Ready to transform the way you learn ?
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join over 10,000 students who have already made the switch to
            EduFlow. Start today and see the difference for yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md w-full">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-secondary/10 border-primary/20 text-accent-foreground placeholder:primary/70 flex-1"
              />
              <Button
                size="default"
                className="text-secondary hover:bg-muted-foreground px-8"
              >
                Start Today
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>10% discount on first purchase</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Setup in under 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
