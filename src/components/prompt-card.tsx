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
import { Loader2, Download } from "lucide-react";
import { useToast } from "./ui/use-toast";

// const modelTokenLimit = 16_384;

export function PromptCard() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();
  const { toast } = useToast();

  // TODO: implement token parsing and chunking
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
          <div className="grid w-full items-center gap-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="case">Case details</Label>
              <Textarea
                required
                value={input}
                onChange={handleInputChange}
                id="case"
                placeholder="Paste your case details here..."
              />
            </div>
          </div>
          <div>
            {messages.length > 0 ? (
              <>
                <Label>AI Response:</Label>
                {messages
                  .filter((m) => m.role !== "user")
                  .map((m) => (
                    <p key={m.id} className="whitespace-pre-wrap leading-7">
                      {m.content}
                    </p>
                  ))}
              </>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {isLoading && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          )}
          {!isLoading && (
            <>
              <Button
                className="transition-all duration-500 bg-gradient-to-tl from-blue-600 via-teal-600 to-purple-600 bg-[size:200%_200%] bg-pos-0 hover:bg-pos-100 dark:text-slate-200"
                type="submit"
              >
                Summarise
              </Button>
              <Button
                onClick={() => {
                  if (messages.length > 1) {
                    const blob = new Blob([messages.at(-1)!.content], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.download = "response.txt";
                    link.href = url;
                    link.click();

                    toast({
                      title: "Summary downloaded!",
                    });
                  } else {
                    toast({
                      title: "No summary found!",
                      description: "Please summarise a case first.",
                    });
                  }
                }}
                variant={"outline"}
              >
                <Download className="mr-2 h-4 w-4" />
                Download summary as .txt
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
