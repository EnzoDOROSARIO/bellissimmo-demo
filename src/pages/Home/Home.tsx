import { Favorites } from "@/components/Favorites/Favorites";
import { Properties } from "@/components/Properties/Properties";

export const Home = () => {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 px-32 pt-5">
        <h1 className="text-5xl font-extrabold">Belliss'immo</h1>
        <div>
          <h2 className="text-3xl font-bold mt-5 mb-2">Vos favoris</h2>
          <Favorites />
        </div>
        <div>
          <h2 className="text-3xl font-bold mt-5 mb-2">Nos biens</h2>
          <Properties />
        </div>
      </div>
    </>
  );
};
