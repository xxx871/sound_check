import React, { useRef, useState } from 'react'
import * as Pitchfinder from 'pitchfinder';
import { Note } from '@/types/interface';
import { Button } from '@/components/ui/button';

interface VoiceAnalysisProps {
  targetNote: string;
  notes: Note[];
  onResult: (isMatch: boolean) => void;
  onPitchDetected: (pitch: number, note: string) => void;
}

const VoiceAnalysis:React.FC<VoiceAnalysisProps> = ({ targetNote, notes, onResult, onPitchDetected }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [firstDetectedFrequency, setFirstDetectedFrequency] = useState<{ frequency: number, note: string } | null>(null);
  const pitchesRef = useRef<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const bufferLength = 2048;
  const threshold = 0.01;

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
    setFirstDetectedFrequency(null);
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
        const maxAmplitude = Math.max(...Array.from(inputBuffer).map(sample => Math.abs(sample)));

        if (maxAmplitude > threshold) {
          const detectPitch = Pitchfinder.AMDF({ sampleRate: audioContextRef.current!.sampleRate});
          const pitch = detectPitch(inputBuffer);

          if (pitch !== null) {
            if (pitchesRef.current.length === 0) {
              const closestNote = findClosestNote(pitch);
              setFirstDetectedFrequency({ frequency: pitch, note: closestNote });
              onPitchDetected(pitch, closestNote);
              const isMatch = closestNote === targetNote;
              onResult(isMatch);
            }
            pitchesRef.current.push(pitch);
          }
        }
      }
    };

    setTimeout(() => {
      setIsRecording(false);
      setAnalyzing(false);
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Button onClick={startRecording} disabled={isRecording} className="mt-4 w-72 text-2xl text-slate-300 text-center">
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>
      <div className="text-white mt-4 text-center">
        {firstDetectedFrequency && (
          <p>First Detected Frequency: {firstDetectedFrequency.frequency.toFixed(2)} Hz - {firstDetectedFrequency.note}</p>
        )}
      </div>
    </div>
  )
}

export default VoiceAnalysis