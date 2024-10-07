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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function SQLQueryBuilder() {
  const [table, setTable] = useState("");
  const [operation, setOperation] = useState("SELECT");
  const [columns, setColumns] = useState("");
  const [whereClause, setWhereClause] = useState("");
  const [query, setQuery] = useState("");

  const buildQuery = () => {
    let builtQuery = "";

    switch (operation) {
      case "SELECT":
        builtQuery = `SELECT ${columns || "*"} FROM ${table}`;
        if (whereClause) builtQuery += ` WHERE ${whereClause}`;
        break;
      case "INSERT":
        builtQuery = `INSERT INTO ${table} (${columns}) VALUES (...)`;
        break;
      case "UPDATE":
        builtQuery = `UPDATE ${table} SET ... WHERE ${whereClause}`;
        break;
      case "DELETE":
        builtQuery = `DELETE FROM ${table} WHERE ${whereClause}`;
        break;
    }

    setQuery(builtQuery);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>SQL Query Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SELECT">SELECT</SelectItem>
            <SelectItem value="INSERT">INSERT</SelectItem>
            <SelectItem value="UPDATE">UPDATE</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={table}
          onChange={(e) => setTable(e.target.value)}
          placeholder="Table name"
        />
        <Input
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          placeholder="Columns (comma-separated)"
        />
        <Input
          value={whereClause}
          onChange={(e) => setWhereClause(e.target.value)}
          placeholder="WHERE clause"
        />
        <Button onClick={buildQuery}>Build Query</Button>
        {query && <Textarea value={query} readOnly rows={5} />}
      </CardContent>
    </Card>
  );
}
