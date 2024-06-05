import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import * as Pitchfinder from 'pitchfinder';
import { notes } from '@/types/interface';

interface VoiceAnalysisComponentProps {
  targetNote: string;
  onResult: (isMatch: boolean) => void;
  onPitchDetected: (pitch: number, note: string) => void;
}

const VoiceAnalysisComponent: React.FC<VoiceAnalysisComponentProps> = ({ targetNote, onResult, onPitchDetected }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [firstDetectedFrequency, setFirstDetectedFrequency] = useState<{ frequency: number, note: string } | null>(null);
  const pitchesRef = useRef<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const bufferLength = 2048;
  const threshold = 0.01; // 振幅のしきい値

  const findClosestNote = (frequency: number) => {
    const closest = notes.reduce((acc, note) => {
      const diff = Math.abs(frequency - note.frequency);
      return diff < acc.diff ? { note: note.en_note_name, frequency: note.frequency, diff } : acc;
    }, { note: '', frequency: 0, diff: Infinity });
    return closest.note;
  };

  const startRecording = async () => {
    setIsRecording(true);
    setAnalyzing(false);
    pitchesRef.current = [];
    setFirstDetectedFrequency(null); // Reset the first detected frequency
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
        const maxAmplitude = Math.max(...inputBuffer.map(sample => Math.abs(sample)));
    
        if (maxAmplitude > threshold) {
          const detectPitch = Pitchfinder.AMDF({ sampleRate: audioContextRef.current!.sampleRate });
          const pitch = detectPitch(inputBuffer);

          console.log(pitch);
    
          if (pitch !== null) {
            if (pitchesRef.current.length === 0) { // Only set the first detected pitch
              const closestNote = findClosestNote(pitch);
              setFirstDetectedFrequency({ frequency: pitch, note: closestNote });
              onPitchDetected(pitch, closestNote);
            }
            pitchesRef.current.push(pitch); // Keep recording all pitches
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
      // コンソールにピッチ配列を出力
      console.log("All detected pitches:", pitchesRef.current);
    }, 3000);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      <div className="text-white">
        {firstDetectedFrequency && (
          <p>First Detected Frequency: {firstDetectedFrequency.frequency.toFixed(2)} Hz - {firstDetectedFrequency.note}</p>
        )}
      </div>
    </div>
  );
};

export default VoiceAnalysisComponent;
