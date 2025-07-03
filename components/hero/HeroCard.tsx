import React from "react";
import { Card } from "../ui/card";
import { Book, BookA } from "lucide-react";

const heroCard = [
  {
    title: "Courses",
    description: "Comprehensive courses",
    logo: <BookA />,
  },
  {
    title: "Courses",
    description: "Comprehensive courses",
    logo: <Book />,
  },
  {
    title: "Courses",
    description: "Comprehensive courses",
    logo: <Book />,
  },
  {
    title: "Courses",
    description: "Comprehensive courses",
    logo: <Book />,
  },
];

function HeroCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mb-4 pt-6 w-full">
      {heroCard.map((card, index) => (
        <Card
          key={index}
          className="p-6 flex flex-col items-start w-full md:min-w-[250px] md:min-h-[180px]"
        >
          <h2 className="text-lg font-semibold mb-2 flex-col items-center gap-1">
            {" "}
            {card.logo} {card.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {card.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default HeroCard;
