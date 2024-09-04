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
  );
}
