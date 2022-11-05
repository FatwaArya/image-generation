import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page(props) {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      prompt: form.prompt.value,
    };
    //set prompt
    setPrompt(data.prompt);
    //send request
    const response = await axios.post("/api/image", data);
    setImage(response.data.image.url);
  };

  return (
    <div>
      <Head>
        <title>Image Generation Powered by DALL-E</title>
      </Head>
      <div className="form-control px-auto mx-32 pt-16">
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
      {/* if prompt is empty dont show anything */}
      {prompt && (
        <div className="px-auto mx-32 pt-16">
          <Image
            src={image}
            alt="Generated Image"
            width={256}
            height={256}
          ></Image>
        </div>
      )}
    </div>
  );
}
