interface GameBanner {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = ({ bannerUrl, title, adsCount }: GameBanner) => {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bolt text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm">{adsCount} anuncios</span>
      </div>
    </a>
  );
};
