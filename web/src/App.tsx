import "./styles/main.css";

import { useEffect, useState } from "react";

import logImg from "./assets/Logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((ad) => (
          <GameBanner
            key={ad.id}
            bannerUrl={ad.bannerUrl}
            title={ad.title}
            adsCount={ad._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner
          title="Não encontrou o seu Duo?"
          subtitle="Publica um anúncio para encontrar novos players!"
          buttonTitle="Publicar anúncio"
        />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
