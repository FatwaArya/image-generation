import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner">loading yagesyakk!</div>
    </div>
  );
}
function CreateImage({ prompt }) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      async function CreateImage() {
        setLoading(true);
        const response = await axios.post("/api/image", { prompt });
        setImage((url) => [
          ...url,
          response.data.image.data[0].url,
          response.data.image.data[1].url,
          response.data.image.data[2].url,
        ]);

        setLoading(false);
      }
      CreateImage();
    }
  }, [prompt]);

  return (
    <div className="flex flex-row items-center gap-4">
      {loading ? (
        <Loading />
      ) : (
        image.map((img) => (
          <div>
            <Image
              className="rounded-lg"
              key={img}
              src={img}
              alt="Picture of the author"
              width={256}
              height={256}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      prompt: form.prompt.value,
    };
    //set prompt
    setPrompt(data.prompt);
    //create image
  };

  return (
    <div>
      <Head>
        <title>Image Generation Powered by DALL-E</title>
      </Head>
      <div className="mx-64 pt-16">
        <div className="form-control w-full">
          <p className="text-sm mb-2">Start with detail description</p>
          <form className="input-group input-group-md" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="An Impressionist oil painting of sunflowers in a purple vase"
              maxLength={100}
              id="prompt"
              className="input input-bordered w-full input-md outline-none bg-slate-200"
              required
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
      <div className="mx-64 pt-16">
        <CreateImage prompt={prompt} />
      </div>
    </div>
  );
}
