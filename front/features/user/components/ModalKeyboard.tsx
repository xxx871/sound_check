import React, { useState } from 'react';
import * as Tone from 'tone';

interface Note {
  id: number;
  ja_note_name: string;
  en_note_name: string;
  frequency: number;
}

const ModalKeyboard: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const synth = new Tone.Synth().toDestination();

  const handleKeyClick = async (frequency: number) => {
    await Tone.start();
    synth.triggerAttackRelease(frequency, '8n');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const renderKey = (note: Note) => {
    const isBlackKey = note.en_note_name.includes('#');
    const keyStyle = isBlackKey
      ? {
          backgroundColor: '#000000',
          width: '20px',
          height: '120px',
          left: '25px',
          zIndex: 1,
          color: 'white',
          cssFloat: 'left',
        }
      : {
          backgroundColor: '#ffffff',
          border: '1px solid #c0c0c0',
          width: '30px',
          height: '200px',
          cssFloat: 'left',
        };

    return (
      <div
        key={note.id}
        style={keyStyle}
        onMouseDown={() => handleKeyClick(note.frequency)}
        onMouseUp={() => synth.triggerRelease()}
        onMouseLeave={() => synth.triggerRelease()}
      >
        <span>{note.ja_note_name}</span>
      </div>
    );
  };

  return (
    <div>
      <button type="button" onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded">
        キーボードを表示
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-8 rounded-lg relative">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-300 rounded-full p-1"
              style={{ right: '1rem' }}
            >
              ✖
            </button>
            <h2 className="text-xl mb-4">音階を選択してください</h2>
            <div className="flex" id="keyboard">
              {notes.map((note) => renderKey(note))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalKeyboard;
