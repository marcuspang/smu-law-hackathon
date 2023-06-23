import { PromptCard } from "@/components/prompt-card";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl w-full py-6">
          Summarise Your Cases.
        </h1>
      </div>
      <div className="mx-auto">
        <PromptCard />
      </div>
    </section>
  );
}
