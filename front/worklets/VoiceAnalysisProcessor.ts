/// <reference lib="webworker" />
/// <reference lib="esnext" />

// AudioWorkletProcessorの型定義
declare class AudioWorkletProcessor {
  constructor(options?: AudioWorkletNodeOptions);
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
  readonly port: MessagePort;
}

// AudioParamDescriptorの型定義
interface AudioParamDescriptor {
  name: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  automationRate?: 'a-rate' | 'k-rate';
}

// registerProcessorの型定義
declare function registerProcessor(
  name: string,
  processorCtor: (new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
): void;

class VoiceAnalysisProcessor extends AudioWorkletProcessor {
  analyzing: boolean;
  threshold: number;
  sampleRate: number;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);
    this.analyzing = false;
    this.threshold = 0.01;
    this.sampleRate = options?.processorOptions?.sampleRate || 44100;
  }

  yinAlgorithm(buffer: Float32Array, sampleRate: number): { probability: number, freq: number } {
    let tau;
    let minTau = 2;
    let maxTau = buffer.length / 2;
    let bestTau = -1;
    let minDifference = Infinity;
    let probability = 0;

    for (tau = minTau; tau < maxTau; tau++) {
      let difference = 0;
      for (let i = 0; i < buffer.length - tau; i++) {
        difference += (buffer[i] - buffer[i + tau]) ** 2;
      }
      if (difference < minDifference) {
        minDifference = difference;
        bestTau = tau;
      }
    }

    if (bestTau !== -1 && bestTau > 0) {
      probability = 1 - (minDifference / buffer.length);
      return {
        probability,
        freq: sampleRate / bestTau
      };
    }

    return {
      probability: 0,
      freq: 0
    };
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
    const input = inputs[0];
    console.log('Processing audio input:', input);
    if (input.length > 0) {
      const inputBuffer = input[0];
      const pitch = this.yinAlgorithm(inputBuffer, this.sampleRate);
      console.log('Pitch detected:', pitch);
      if (pitch && pitch.probability > 0.8) {
        const frequency = pitch.freq;
        const amplitude = Math.max(...inputBuffer.map(sample => Math.abs(sample)));

        if (amplitude > this.threshold && frequency < 5000) {
          this.port.postMessage({ frequency, amplitude });
        }
      }
    }
    return true;
  }
}

registerProcessor('voice-analysis-processor', VoiceAnalysisProcessor);
