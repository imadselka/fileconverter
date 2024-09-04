import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { utilities } from "@/utils/otherUtilities";
import Link from "next/link";

export default function OtherUtilities() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl text-center mt-10">
          Explore more utilities to make your life easier
        </h1>
        {/* TODO: ADD CMK use shadcn's or like vercel on so u can search for something or press the key to try something */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {utilities.map((utility) => (
          <Card key={utility.title} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{utility.title}</CardTitle>
              <CardDescription>{utility.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={utility.link} className="w-full">
                <Button variant="outline" className="w-full">
                  Try it
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
