"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateScript } from "../../api/scriptService";
import { useAuth } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [clipLength, setClipLength] = useState("");
  const [specificMoments, setSpecificMoments] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getCurrentUser } = useAuth();

  const { data: user, } = useQuery({
      queryKey: ['user'],
      queryFn: async () => await getCurrentUser(),
  })

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateScript({
        title,
        description,
        genre,
        clipLength,
        specificMoments,
      }, user?.id!);
      setGeneratedScript(result.content);
    } catch (error) {
      console.error("Error generating script:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-10">
      <div className="grid grid-cols-1 gap-4 w-1/2 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Video Script Title</CardTitle>
            <CardDescription>
              What do you want this script to be titled?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              id="title1"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-gray-500">
              This does not affect the script, it is only for your reference.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Script Description</CardTitle>
            <CardDescription>
              What do you want this script to be about?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="description2"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-gray-500">
              This is a prompt to tell our AI what the video should be about.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>
              Select genre, clip length, and include specific moments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clipLength">Clip Length</Label>
                <Select value={clipLength} onValueChange={setClipLength}>
                  <SelectTrigger id="clipLength">
                    <SelectValue placeholder="Select clip length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (1-3 min)</SelectItem>
                    <SelectItem value="medium">Medium (3-5 min)</SelectItem>
                    <SelectItem value="long">Long (5-10 min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specificMoments">Include specific moments</Label>
              <Input
                id="specificMoments"
                placeholder="Enter specific keywords you want to see in the video script"
                value={specificMoments}
                onChange={(e) => setSpecificMoments(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleGenerate}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Script"}
            </Button>
          </CardContent>
        </Card>

        {generatedScript && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Script</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedScript}
                readOnly
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
