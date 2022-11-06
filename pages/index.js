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

  // return card
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <Loading />
        ) : (
          image.map((url) => (
            <div
              className="flex flex-col items-center justify-center outline"
              key={url}
            >
              <Image
                src={url}
                alt="Picture of the author"
                width={256}
                height={256}
              />
            </div>
          ))
        )}
      </div>
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
  };

  return (
    <div>
      <Head>
        <title>Image Generation Powered by DALL-E</title>
      </Head>
      <div className="pt-16">
        <div className="form-control">
          <p className="text-sm sm:text-md mb-2 mx-auto">
            Start with detail description
          </p>
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

      <CreateImage prompt={prompt} />
    </div>
  );
}
