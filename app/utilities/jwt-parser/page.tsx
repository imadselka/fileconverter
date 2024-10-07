"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface DecodedJWT {
  header: string;
  payload: string;
  signature: string;
}

export default function JWTParser() {
  const [jwt, setJwt] = useState("");
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);

  const decodeJWT = () => {
    try {
      const [headerB64, payloadB64, signatureB64] = jwt.split(".");
      const header = JSON.parse(atob(headerB64));
      const payload = JSON.parse(atob(payloadB64));

      setDecoded({
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        signature: signatureB64,
      });
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setDecoded(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>JWT Parser</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste JWT here"
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
        />
        <Button onClick={decodeJWT}>Decode</Button>
        {decoded && (
          <>
            <div>
              <h3 className="font-bold mb-2">Decoded Header</h3>
              <Textarea value={decoded.header} readOnly />
              <Button
                onClick={() => copyToClipboard(decoded.header)}
                className="mt-2"
              >
                Copy
              </Button>
            </div>
            <div>
              <h3 className="font-bold mb-2">Decoded Payload</h3>
              <Textarea value={decoded.payload} readOnly />
              <Button
                onClick={() => copyToClipboard(decoded.payload)}
                className="mt-2"
              >
                Copy
              </Button>
            </div>
            <div>
              <h3 className="font-bold mb-2">Signature</h3>
              <Textarea value={decoded.signature} readOnly />
              <Button
                onClick={() => copyToClipboard(decoded.signature)}
                className="mt-2"
              >
                Copy
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
