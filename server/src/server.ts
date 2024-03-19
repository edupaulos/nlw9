import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { convertHoursStrindToMinutes } from "./utils/convert-hours";
import { convertMinutesToHoursString } from "./utils/convert-minutes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    useVoiceChannel,
    hourStart,
    hourEnd,
  } = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(","),
      hourStart: convertHoursStrindToMinutes(hourStart),
      hourEnd: convertHoursStrindToMinutes(hourEnd),
      useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHoursString(ad.hourStart),
        hourEnd: convertMinutesToHoursString(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUnique({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad?.discord,
  });
});

app.listen(3333);
