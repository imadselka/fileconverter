"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function RandomUserGenerator() {
  const [user, setUser] = useState<User | null>(null);

  const generateUser = () => {
    const firstNames = ["John", "Jane", "Mike", "Emily", "David", "Sarah"];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
    ];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const streets = ["Main St", "Oak Ave", "Pine Rd", "Maple Ln", "Cedar Blvd"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

    const randomItem = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];

    const name = `${randomItem(firstNames)} ${randomItem(lastNames)}`;
    const email = `${name.toLowerCase().replace(" ", ".")}@${randomItem(
      domains
    )}`;
    const phone = `(${Math.floor(Math.random() * 900) + 100}) ${
      Math.floor(Math.random() * 900) + 100
    }-${Math.floor(Math.random() * 9000) + 1000}`;
    const address = `${Math.floor(Math.random() * 1000) + 1} ${randomItem(
      streets
    )}, ${randomItem(cities)}`;

    setUser({ name, email, phone, address });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Random User Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateUser}>Generate Random User</Button>
        {user && (
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
