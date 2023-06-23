"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useChat } from "ai/react";
import { FormEvent } from "react";
import { Textarea } from "./ui/textarea";

const initialPrompt = `I want you to act as a professional writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is “I need help writing a clear and concise summary for this paragraph of text that maintains as much details of importance as possible”.`;
const modelTokenLimit = 4096;

export function PromptCard() {
  const { messages, append, input, handleSubmit, handleInputChange } =
    useChat();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const chunks = [];
    // let startIndex = 0;
    // while (startIndex < caseMessage.length) {
    //   const endIndex = Math.min(
    //     startIndex + modelTokenLimit,
    //     caseMessage.length
    //   );
    //   const chunk = caseMessage.slice(startIndex, endIndex);

    //   chunks.push({
    //     content: chunk,
    //     role: "user",
    //     createdAt: new Date(),
    //   });
    //   startIndex = endIndex;
    // }
    await append({
      content: initialPrompt,
      role: "user",
    });

    handleSubmit(e);
  };

  return (
    <Card className="shadow-lg min-w-[500px] max-w-lg">
      <CardHeader>
        <CardTitle>Enter your case details below</CardTitle>
        <CardDescription>
          Get your case summarised in one click.
        </CardDescription>
      </CardHeader>
      <form onSubmit={submitForm}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="case">Case details</Label>
              <Textarea
                value={input}
                onChange={handleInputChange}
                id="case"
                placeholder="Paste your case details here..."
              />
            </div>
          </div>
          <div>
            <p>Messsages:</p>
            {messages.length > 0
              ? messages
                  .filter((m) => m.role !== "user")
                  .slice(1) // Skips the "As an AI Model: ..." message
                  .map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                      AI: {m.content}
                    </div>
                  ))
              : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="transition-all duration-500 bg-gradient-to-tl from-blue-600 via-teal-600 to-purple-600 bg-[size:200%_200%] bg-pos-0 hover:bg-pos-100 dark:text-slate-200"
            type="submit"
          >
            Summarise
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
