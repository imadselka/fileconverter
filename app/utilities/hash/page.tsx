"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Buffer } from "buffer";
import { useState } from "react";

const algorithms = ["SHA-256", "PBKDF2 (with SHA-256)", "HMAC-SHA-256"];
const encodings = ["Hex", "Base64"];

// SHA-256 implementation
function sha256(message: string): number[] {
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  function rightRotate(value: number, amount: number): number {
    return (value >>> amount) | (value << (32 - amount));
  }

  let h0 = 0x6a09e667,
    h1 = 0xbb67ae85,
    h2 = 0x3c6ef372,
    h3 = 0xa54ff53a,
    h4 = 0x510e527f,
    h5 = 0x9b05688c,
    h6 = 0x1f83d9ab,
    h7 = 0x5be0cd19;

  const paddedMessage =
    message +
    String.fromCharCode(0x80) +
    String.fromCharCode(0).repeat(64 - ((message.length + 9) % 64));
  const dataView = new DataView(new ArrayBuffer(paddedMessage.length + 8));
  for (let i = 0; i < paddedMessage.length; i++) {
    dataView.setUint8(i, paddedMessage.charCodeAt(i));
  }
  dataView.setBigUint64(
    paddedMessage.length,
    BigInt(message.length * 8),
    false
  );

  for (let i = 0; i < dataView.byteLength; i += 64) {
    const w = new Uint32Array(64);
    for (let j = 0; j < 16; j++) {
      w[j] = dataView.getUint32(i + j * 4, false);
    }

    for (let j = 16; j < 64; j++) {
      const s0 =
        rightRotate(w[j - 15], 7) ^
        rightRotate(w[j - 15], 18) ^
        (w[j - 15] >>> 3);
      const s1 =
        rightRotate(w[j - 2], 17) ^
        rightRotate(w[j - 2], 19) ^
        (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
    }

    let a = h0,
      b = h1,
      c = h2,
      d = h3,
      e = h4,
      f = h5,
      g = h6,
      h = h7;

    for (let j = 0; j < 64; j++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[j] + w[j]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
    h5 = (h5 + f) | 0;
    h6 = (h6 + g) | 0;
    h7 = (h7 + h) | 0;
  }

  return [h0, h1, h2, h3, h4, h5, h6, h7];
}

// Simplified PBKDF2 implementation (not cryptographically secure)
function pbkdf2(
  password: string,
  salt: string,
  iterations: number,
  keyLength: number
): number[] {
  let result = sha256(password + salt);
  for (let i = 1; i < iterations; i++) {
    result = sha256(result.map((n) => String.fromCharCode(n)).join("") + salt);
  }
  return result.slice(0, keyLength / 4);
}

// Simplified HMAC implementation (not cryptographically secure)
function hmacSha256(key: string, message: string): number[] {
  const blockSize = 64;
  if (key.length > blockSize) {
    key = sha256(key)
      .map((n) => String.fromCharCode(n))
      .join("");
  }
  key = key.padEnd(blockSize, "\0");

  const outerPadding = key
    .split("")
    .map((c) => c.charCodeAt(0) ^ 0x5c)
    .map((n) => String.fromCharCode(n))
    .join("");
  const innerPadding = key
    .split("")
    .map((c) => c.charCodeAt(0) ^ 0x36)
    .map((n) => String.fromCharCode(n))
    .join("");

  return sha256(
    outerPadding +
      sha256(innerPadding + message)
        .map((n) => String.fromCharCode(n))
        .join("")
  );
}

export default function HashingTool() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [encoding, setEncoding] = useState("Hex");
  const [hash, setHash] = useState("");

  const generateHash = () => {
    if (!text) return;

    let hashedText: number[];
    switch (algorithm) {
      case "SHA-256":
        hashedText = sha256(text);
        break;
      case "PBKDF2 (with SHA-256)":
        hashedText = pbkdf2(text, "salt", 1000, 256);
        break;
      case "HMAC-SHA-256":
        hashedText = hmacSha256("key", text);
        break;
      default:
        return;
    }

    const encodedHash =
      encoding === "Hex"
        ? hashedText.map((n) => n.toString(16).padStart(8, "0")).join("")
        : Buffer.from(hashedText).toString("base64");

    setHash(encodedHash);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Text Hashing Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to hash"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex space-x-4">
          <Select value={algorithm} onValueChange={setAlgorithm}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algo) => (
                <SelectItem key={algo} value={algo}>
                  {algo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={encoding} onValueChange={setEncoding}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select encoding" />
            </SelectTrigger>
            <SelectContent>
              {encodings.map((enc) => (
                <SelectItem key={enc} value={enc}>
                  {enc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generateHash}>Generate Hash</Button>
        <Textarea placeholder="Generated hash" value={hash} readOnly />
      </CardContent>
    </Card>
  );
}
