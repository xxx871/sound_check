importScripts('https://unpkg.com/pitchfinder@1.0.2/lib/index.umd.js');

class VoiceAnalysisProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.detectPitch = new Pitchfinder.YIN({ sampleRate: sampleRate });
    this.threshold = 0.01;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      const pitch = this.detectPitch(channelData);

      if (pitch && pitch.probability > 0.8) {
        const frequency = pitch.freq;
        const amplitude = Math.max(...channelData.map(sample => Math.abs(sample)));

        if (amplitude > this.threshold && frequency < 5000) {
          this.port.postMessage({ frequency });
        }
      }
    }
    return true;
  }
}

registerProcessor('voice-analysis-processor', VoiceAnalysisProcessor);
