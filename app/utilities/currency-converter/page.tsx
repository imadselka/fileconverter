"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  DZD: 245.33,
};

type Currency = keyof typeof exchangeRates;

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }

    const baseAmount = Number(amount) / exchangeRates[fromCurrency];
    const convertedValue = baseAmount * exchangeRates[toCurrency];
    setConvertedAmount(convertedValue.toFixed(2));
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencies = Object.keys(exchangeRates) as Currency[];

  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="flex-grow"
          />
          <Select
            value={fromCurrency}
            onValueChange={(value) => setFromCurrency(value as Currency)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwapCurrencies}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            value={convertedAmount}
            readOnly
            placeholder="Converted amount"
            className="flex-grow"
          />
          <Select
            value={toCurrency}
            onValueChange={(value) => setToCurrency(value as Currency)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleConvert} className="w-full">
          Convert
        </Button>
      </CardContent>
    </Card>
  );
}
