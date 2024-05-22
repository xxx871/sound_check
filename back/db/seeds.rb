Note.create!([
  { frequency: 97.999, ja_note_name: 'ソ2', en_note_name: 'G2' },
  { frequency: 103.826, ja_note_name: 'ソ#2', en_note_name: 'G#2' },
  { frequency: 110.000, ja_note_name: 'ラ2', en_note_name: 'A2' },
  { frequency: 116.541, ja_note_name: 'ラ#2', en_note_name: 'A#2' },
  { frequency: 123.471, ja_note_name: 'シ2', en_note_name: 'B2' },
  { frequency: 130.813, ja_note_name: 'ド3', en_note_name: 'C3' },
  { frequency: 138.591, ja_note_name: 'ド#3', en_note_name: 'C#3' },
  { frequency: 146.832, ja_note_name: 'レ3', en_note_name: 'D3' },
  { frequency: 155.563, ja_note_name: 'レ#3', en_note_name: 'D#3' },
  { frequency: 164.814, ja_note_name: 'ミ3', en_note_name: 'E3' },
  { frequency: 174.614, ja_note_name: 'ファ3', en_note_name: 'F3' },
  { frequency: 184.997, ja_note_name: 'ファ#3', en_note_name: 'F#3' },
  { frequency: 195.998, ja_note_name: 'ソ3', en_note_name: 'G3' },
  { frequency: 207.652, ja_note_name: 'ソ#3', en_note_name: 'G#3' },
  { frequency: 220.000, ja_note_name: 'ラ3', en_note_name: 'A3' },
  { frequency: 233.082, ja_note_name: 'ラ#3', en_note_name: 'A#3' },
  { frequency: 246.942, ja_note_name: 'シ3', en_note_name: 'B3' },
  { frequency: 261.626, ja_note_name: 'ド4', en_note_name: 'C4' },
  { frequency: 277.183, ja_note_name: 'ド#4', en_note_name: 'C#4' },
  { frequency: 293.665, ja_note_name: 'レ4', en_note_name: 'D4' },
  { frequency: 311.127, ja_note_name: 'レ#4', en_note_name: 'D#4' },
  { frequency: 329.628, ja_note_name: 'ミ4', en_note_name: 'E4' },
  { frequency: 349.228, ja_note_name: 'ファ4', en_note_name: 'F4' },
  { frequency: 369.994, ja_note_name: 'ファ#4', en_note_name: 'F#4' },
  { frequency: 391.995, ja_note_name: 'ソ4', en_note_name: 'G4' },
  { frequency: 415.305, ja_note_name: 'ソ#4', en_note_name: 'G#4' },
  { frequency: 440.000, ja_note_name: 'ラ4', en_note_name: 'A4' },
  { frequency: 466.164, ja_note_name: 'ラ#4', en_note_name: 'A#4' },
  { frequency: 493.883, ja_note_name: 'シ4', en_note_name: 'B4' },
  { frequency: 523.251, ja_note_name: 'ド5', en_note_name: 'C5' },
  { frequency: 554.365, ja_note_name: 'ド#5', en_note_name: 'C#5' },
  { frequency: 587.330, ja_note_name: 'レ5', en_note_name: 'D5' },
  { frequency: 622.254, ja_note_name: 'レ#5', en_note_name: 'D#5' },
  { frequency: 659.255, ja_note_name: 'ミ5', en_note_name: 'E5' },
  { frequency: 698.456, ja_note_name: 'ファ5', en_note_name: 'F5' },
  { frequency: 739.989, ja_note_name: 'ファ#5', en_note_name: 'F#5' },
  { frequency: 783.991, ja_note_name: 'ソ5', en_note_name: 'G5' },
  { frequency: 830.609, ja_note_name: 'ソ#5', en_note_name: 'G#5' },
  { frequency: 880.000, ja_note_name: 'ラ5', en_note_name: 'A5' },
  { frequency: 932.328, ja_note_name: 'ラ#5', en_note_name: 'A#5' },
  { frequency: 987.767, ja_note_name: 'シ5', en_note_name: 'B5' },
  { frequency: 1046.502, ja_note_name: 'ド6', en_note_name: 'C6' }
])

Gender.create!([
  { name: '男性' },
  { name: '女性' }
])

Mode.create!([
  { name: '通常' },
  { name: 'ハモり' },
  { name: '練習' }
])

Difficulty.create!([
  { name: '簡単' },
  { name: '普通' },
  { name: '難しい' }
])

GenderHighNote.create!([
  { gender_id: 1, note_id: 32 },
  { gender_id: 2, note_id: 39 },
])

GenderLowNote.create!([
  { gender_id: 1, note_id: 8 },
  { gender_id: 2, note_id: 18 },
])