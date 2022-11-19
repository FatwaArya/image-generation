import Head from "next/head";
import { FormEvent, useState } from "react";
import CreateImage from "../components/createImage";
export default function Page() {
  const [prompt, setPrompt] = useState<String>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      prompt: form.prompt.value as string,
    };
    //set prompt
    setPrompt(data.prompt);
  };

  return (
    <div>
      <Head>
        <title>Image Generation Powered by DALL-E</title>
      </Head>
      <div className="pt-16">
        <div className="flex justify-center mb-4 sm:justify-around sm:-ml-3 md:-ml-6 lg:-ml-8">
          <div className="text-sm sm:text-md">
            Start with detail description
            <button className="btn btn-xs glass mx-2 text-bold hover:bg-sky-700 hover:text-white">
              Surprise me
            </button>
          </div>
          <div></div>
        </div>
        <div className="form-control">
          <form
            className="input-group input-group-md flex flex-row justify-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase"
              maxLength={100}
              id="prompt"
              className="input input-bordered input-md outline-none bg-slate-200 w-3/5"
              required
              autoComplete="off"
            />
            <button
              className="btn btn-md outline-none bg-slate-200"
              type="submit"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
      <div className="pt-8">
        <CreateImage prompt={prompt} />
      </div>
    </div>
  );
}
