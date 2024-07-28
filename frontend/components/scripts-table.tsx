"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { ScriptDetails } from "@/app/(dashboard)/generated/script-details"

interface Script {
  id: string;
  title: string;
  genre: string;
  created_at: string;
}

interface ScriptsProps {
  scripts?: Script[];
  isLoading: boolean;
  error: unknown;
}

export default function ScriptsTable({ scripts, isLoading, error }: ScriptsProps) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Generated Scripts</CardTitle>
        <CardDescription>Recently generated scripts for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead className="hidden sm:table-cell">Title</TableHead>
              <TableHead className="hidden sm:table-cell">Genre</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              scripts?.map((script) => (
                <TableRow className="bg-accent" key={script.id}>
                  <TableCell>
                    {script.id}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{script.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {script.genre}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(script.created_at).toDateString()}</TableCell>
                  <TableCell className="text-right">
                    <ScriptDetails scriptId={script.id} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
