import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/actions/event.action";
import { dateConverter, timeFormatConverter } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

export interface IEvent {
  title: string;
  description: string;
  photo: string;
  isOnline?: boolean;
  location?: string;
  landmark?: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  duration?: number;
  isMultipleDays: boolean;
  totalCapacity: number;
  availableTickets: number;
  dailyCapacity?: number;
  dailyAvailableTickets?: number;
  isFree: boolean;
  price?: number;
  category: string;
  tags?: string[];
  organizer: string;
  attendees?: string[];
  ageRestriction?: number;
  url?: string;
}

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const like = false;

  const event = await getEventById(params.id);

  return (
    <div className="font-medium">
      <div className="border rounded-md">
        <Image
          src={event.photo}
          alt={event.title}
          width={500}
          height={500}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-4xl max-sm:text-2xl mt-3">{event.title}</h2>

        <div className="flex max-sm:flex-wrap justify-left max-sm:justify-betwee items-center gap-3">
          <Badge className="text-base">
            {event.isFree ? `Free` : `$ ${event.price}`}
          </Badge>
          <Badge className="text-base" variant={"secondary"}>
            {event.category.name}
          </Badge>
          <Badge
            className="text-base"
            variant={"secondary"}
          >{`By ${event.organizer?.firstName} ${event.organizer?.lastName}`}</Badge>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={"secondary"}
            className="flex gap-1 rounded-full hover:scale-105 transition-all"
          >
            {!like && <FaRegHeart className="h-5 w-5 text-primary" />}
            {like && <FaHeart className="h-full w-full text-primary" />}
            Like
          </Button>
          <Button
            variant={"secondary"}
            className="flex gap-1 rounded-full hover:scale-105 transition-all"
          >
            <MdOutlineShoppingCart className="h-5 w-5 text-primary" />
            Book Now
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div>
            {new Date(event.endDate) > new Date(event.startDate)
              ? `{${dateConverter(event.startDate)} - ${dateConverter(
                  event.endDate
                )}}`
              : `${dateConverter(event.startDate)}`}
          </div>
          |
          <div>
            {timeFormatConverter(event.startTime)} -{" "}
            {timeFormatConverter(event.endTime)}
          </div>
        </div>

        <div>{event.isOnline ? "Online Event" : `${event.location}`}</div>

        <div>{event.description}</div>

        <div>{event.url}</div>

        <div className="flex flex-wrap gap-3">
          {event.tags?.map((tag: any) => {
            return (
              <Badge variant={"secondary"} className="">
                {tag.name}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-4xl max-sm:text-2xl mt-3 text-center">
          Related Events
        </h2>
      </div>
    </div>
  );
};

export default Page;
