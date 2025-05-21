"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import avatar1 from "../assets/avatars/openart-image_3ZGNVTGQ_1743066489893_raw.jpg";
import avatar2 from "../assets/avatars/openart-image_G45fsNJS_1743066522612_raw.jpg";
import avatar3 from "../assets/avatars/openart-image_KLUe525P_1743066599900_raw.jpg";
import avatar4 from "../assets/avatars/openart-image_XELWcfwb_1743066317195_raw.jpg";
import avatar5 from "../assets/avatars/openart-image_b_Sae_a0_1743066445983_raw.jpg";

export const PlayerTestimonials: React.FC = () => {
  // Reference to the scrollable container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Emily R.",
      rating: 5,
      comment:
        "Vegas Bonanza is my go-to for casino fun! The daily bonuses keep me coming back!",
      location: "Los Angeles, USA",
      timeAgo: "2 days ago",
      img: avatar2.src,
    },
    {
      id: 2,
      name: "James L.",
      rating: 4,
      comment:
        "I love the tournaments! Competing against others makes it even more exciting!",
      location: "London, UK",
      timeAgo: "1 week ago",
      img: avatar1.src,
    },
    {
      id: 3,
      name: "Sophia M.",
      rating: 5,
      comment:
        "The slot variety is amazing, and I've made so many friends here!",
      location: "Toronto, Canada",
      timeAgo: "5 days ago",
      img: avatar3.src,
    },
    {
      id: 4,
      name: "Carlos G.",
      rating: 4,
      comment:
        "Great rewards and fun gameplay. Just wish there were even more poker tables!",
      location: "Madrid, Spain",
      timeAgo: "3 weeks ago",
      img: avatar1.src,
    },
    {
      id: 5,
      name: "Liam T.",
      rating: 5,
      comment:
        "I've played tons of social casinos, and this is by far the best!",
      location: "Sydney, Australia",
      timeAgo: "1 month ago",
      img: avatar5.src,
    },
    // Repeat
    {
      id: 6,
      name: "Emily R.",
      rating: 5,
      comment:
        "Vegas Bonanza is my go-to for casino fun! The daily bonuses keep me coming back!",
      location: "Los Angeles, USA",
      timeAgo: "2 days ago",
      img: avatar4.src,
    },
    {
      id: 7,
      name: "James L.",
      rating: 4,
      comment:
        "I love the tournaments! Competing against others makes it even more exciting!",
      location: "London, UK",
      timeAgo: "1 week ago",
      img: avatar1.src,
    },
    {
      id: 8,
      name: "Sophia M.",
      rating: 5,
      comment:
        "The slot variety is amazing, and I've made so many friends here!",
      location: "Toronto, Canada",
      timeAgo: "5 days ago",
      img: avatar3.src,
    },
    {
      id: 9,
      name: "Carlos G.",
      rating: 4,
      comment:
        "Great rewards and fun gameplay. Just wish there were even more poker tables!",
      location: "Madrid, Spain",
      timeAgo: "3 weeks ago",
      img: avatar5.src,
    },
    {
      id: 10,
      name: "Liam T.",
      rating: 5,
      comment:
        "I've played tons of social casinos, and this is by far the best!",
      location: "Sydney, Australia",
      timeAgo: "1 month ago",
      img: avatar4.src,
    },
  ];

  // Scroll functions for the navigation arrows
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 relative">
      <div className="md:container mx-auto px-4">
        <div className="container text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="">Player Testimonials</span>
          </h2>
          <p className="text-platinum max-w-2xl mx-auto text-base sm:text-xl lg:text-lg xl:text-xl">
            See what our community of over 500,000 players has to say about
            VegasBonanza.
          </p>
        </div>

        {/* Horizontal scrollable row with navigation arrows */}
        <div className="relative mx-auto">
          {/* Left arrow */}
          <Button
            isIconOnly
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20  w-8 h-8 min-w-0"
            radius="full"
            size="lg"
            onPress={scrollLeft}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-left" />
          </Button>
          {/* Right arrow */}
          <Button
            isIconOnly
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-content1/80 backdrop-blur-sm border border-gold/30 shadow-neon-gold hover:bg-gold/20  w-8 h-8 min-w-0"
            radius="full"
            size="lg"
            onPress={scrollRight}
          >
            <Icon className="text-white text-xl" icon="lucide:chevron-right" />
          </Button>

          {/* Scrollable container */}
          <ScrollShadow
            ref={scrollContainerRef}
            hideScrollBar
            className="flex pb-6 gap-4 snap-x px-2 md:px-12"
            orientation="horizontal"
          >
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                disableRipple
                className="text-xs sm:text-sm lg:text-base bg-content1 neon-border w-[180px] lg:w-[450px] flex-shrink-0 "
              >
                <CardBody className="flex flex-col items-center text-center p-3">
                  <Avatar
                    isBordered
                    className="w-20 h-20 mb-3 mt-3"
                    classNames={{
                      img: "scale-150 object-[0_10px]",
                    }}
                    color="secondary"
                    src={testimonial?.img}
                  />
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        className={`${i < testimonial.rating ? "text-amber" : "text-default-400"} text-sm`}
                        icon="lucide:star"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-3">{testimonial.comment}</p>
                  <div className="mt-auto">
                    <h4 className="font-semibold text-yellow-400">
                      {testimonial.name}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            ))}
          </ScrollShadow>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl -z-10" />
    </section>
  );
};
