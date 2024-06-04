import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import * as Pitchfinder from "pitchfinder";

interface VoiceAnalysisComponentProps {
  targetNote: string;
  onResult: (isMatch: boolean) => void;
}

interface ProbabilityPitch {
  probability: number;
  freq: number;
}

const VoiceAnalysisComponent: React.FC<VoiceAnalysisComponentProps> = ({ targetNote, onResult }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const bufferLength = 2048;
  const threshold = 0.01; // 振幅のしきい値

  const startRecording = async () => {
    setIsRecording(true);
    setAnalyzing(false);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(bufferLength, 1, 1);

    source.connect(analyserRef.current);
    analyserRef.current.connect(scriptProcessorRef.current);
    scriptProcessorRef.current.connect(audioContextRef.current.destination);

    scriptProcessorRef.current.onaudioprocess = (event) => {
      if (!analyzing) {
        const inputBuffer = event.inputBuffer.getChannelData(0);
        const detectPitch = Pitchfinder.YIN({ sampleRate: audioContextRef.current!.sampleRate });
        const pitch = detectPitch(inputBuffer) as ProbabilityPitch | null;

        console.log('Pitch detection result:', pitch);

        if (pitch && pitch.probability > 0.8) {
          const frequency = pitch.freq;
          const amplitude = Math.max(...inputBuffer.map(sample => Math.abs(sample)));
          console.log('Detected frequency:', frequency);
          console.log('Amplitude:', amplitude);

          if (amplitude > threshold && frequency < 5000) { // 振幅のしきい値をチェック
            const detectedNote = Tone.Frequency(frequency).toNote();
            console.log('Detected note:', detectedNote);
            if (detectedNote === targetNote) {
              setAnalyzing(true);
              onResult(true);
            } else {
              onResult(false);
            }
          }
        }
      }
    };

    setTimeout(() => {
      setIsRecording(false);
      setAnalyzing(false);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }, 3000);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
    </div>
  );
};

export default VoiceAnalysisComponent;
