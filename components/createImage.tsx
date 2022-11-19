import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "./loading";
import Error from "./error";
import { ImagesResponse, ImagesResponseDataInner } from "openai";



export default function CreateImage({ prompt }) {
  const [image, setImage] = useState<ImagesResponse>({
    created: 0,   
    data: Array<ImagesResponseDataInner>(),
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    async function CreateImage(): Promise<void> {
      setLoading(true);
      try {
        if (prompt) {
          const response = await axios.post("/api/image", { prompt });
          setImage(response.data);
        }
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }
    CreateImage();
  }, [prompt]);

  if (error) return <Error />;

  // return card
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-wrap justify-center">
        

      {/* handle loading */}
      {loading ? (
          <Loading />
        ) : (
            image?.data?.map((image, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <Image
                  src={image.url}
                  alt="Image"
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
