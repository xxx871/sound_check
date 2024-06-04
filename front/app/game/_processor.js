class PitchProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.pitchFinder = Pitchfinder.YIN();
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const inputBuffer = input[0];
      const pitch = this.pitchFinder(inputBuffer);
      this.port.postMessage({ pitch, inputBuffer });
    }
    return true;
  }
}

registerProcessor('pitch-processor', PitchProcessor);
