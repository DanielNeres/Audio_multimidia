"use client"

import { useRef, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

export default function Home() {
  const [tocando, setTocando] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  const executarAudio = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.play();
    setTocando(true);
  }

  const pausarAudio = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setTocando(false);
  }

  const executarOuPausar = () => {
    if (tocando) {
      pausarAudio();
    } else {
      executarAudio();
    }
  }

  const alterarVolume = (novoVolume: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = novoVolume;
    setVolume(novoVolume);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-8 rounded-2xl w-80 flex flex-col items-center gap-6">

        <h1 className="text-2xl font-bold">Player de Áudio</h1>

        <audio 
          ref={audioRef}
          src="/audios/Nonatos_Astronauta.mp3"
          hidden
        />

        <button 
          onClick={executarOuPausar}
          className="text-6xl text-amber-400"
        >
          {
            tocando ? <FaPauseCircle /> : <FaPlayCircle />
          }
        </button>

        <div className="w-full flex flex-col gap-2">
          <label>Volume: {Math.round(volume * 100)}%</label>

          <input type="range" min={0} max={1} step={0.01} value={volume}
            onChange={(e) => alterarVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>

      </div>
    </div>
  );
}