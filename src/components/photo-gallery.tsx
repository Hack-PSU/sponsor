"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const photos = [
	{ src: "/event/event_1.jpg", alt: "" },
	{ src: "/event/event_2.jpg", alt: "" },
	{ src: "/event/event_3.jpg", alt: "" },
	{ src: "/event/event_4.jpg", alt: "" },
	{ src: "/event/event_5.jpg", alt: "" },
	{ src: "/event/event_6.jpg", alt: "" },
	{ src: "/event/event_7.jpg", alt: "" },
	{ src: "/event/event_8.jpg", alt: "" },
	{ src: "/event/event_9.jpg", alt: "" },
	{ src: "/event/event_10.jpg", alt: "" },
	{ src: "/event/event_11.jpg", alt: "" },
	{ src: "/event/event_12.jpg", alt: "" },
];

export function PhotoGallery() {
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true })
	);

	return (
		<Carousel
			className="h-full max-w-4xl mx-auto"
			opts={{ loop: true }}
			plugins={[plugin.current]}
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{photos.map((photo, index) => (
					<CarouselItem key={index}>
						<div className="">
							<Card className="p-0">
								<CardContent className="relative aspect-video flex items-center justify-center p-0  overflow-hidden rounded-lg py-0">
									<Image
										src={photo.src || "/placeholder.svg"}
										alt={photo.alt}
										fill
										className="object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden sm:flex" />
			<CarouselNext className="hidden sm:flex" />
		</Carousel>
	);
}