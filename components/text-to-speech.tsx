"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface TextToSpeechProps {
  text: string;
  textEs?: string;
  className?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export function TextToSpeech({
  text,
  textEs,
  className,
  variant = "ghost",
  size = "icon",
}: TextToSpeechProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const textToSpeak = language === "es" && textEs ? textEs : text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Set language
    utterance.lang = language === "es" ? "es-ES" : "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Find appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const langCode = language === "es" ? "es" : "en";
    const voice = voices.find((v) => v.lang.startsWith(langCode));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    utteranceRef.current = utterance;
    setIsLoading(true);
    window.speechSynthesis.speak(utterance);
  }, [text, textEs, language]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      aria-label={isPlaying ? "Stop reading" : "Read aloud"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </Button>
  );
}

// Larger button with label for prominent use
export function TextToSpeechButton({
  text,
  textEs,
  className,
}: {
  text: string;
  textEs?: string;
  className?: string;
}) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const textToSpeak = language === "es" && textEs ? textEs : text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = language === "es" ? "es-ES" : "en-US";
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const langCode = language === "es" ? "es" : "en";
    const voice = voices.find((v) => v.lang.startsWith(langCode));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    setIsLoading(true);
    window.speechSynthesis.speak(utterance);
  }, [text, textEs, language]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="mr-2 h-4 w-4" />
      ) : (
        <Volume2 className="mr-2 h-4 w-4" />
      )}
      {isPlaying
        ? language === "es"
          ? "Detener"
          : "Stop"
        : language === "es"
        ? "Escuchar"
        : "Listen"}
    </Button>
  );
}
