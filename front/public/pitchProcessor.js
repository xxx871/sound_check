class PitchProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.pitchFinder = Pitchfinder.YIN({ sampleRate: sampleRate });
    console.log('PitchProcessor initialized'); // デバッグログ追加
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const inputBuffer = input[0];
      const pitch = this.pitchFinder(inputBuffer);
      console.log('Pitch detected:', pitch); // デバッグログ追加
      this.port.postMessage(pitch);
    }
    return true;
  }
}

registerProcessor('pitch-processor', PitchProcessor);