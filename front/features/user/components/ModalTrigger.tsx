import React, { useState } from 'react';
import * as Tone from 'tone'; // 変更箇所

interface Note {
  id: number;
  ja_note_name: string;
  en_note_name: string;
  frequency: number;
}

const ModalTrigger: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const synth = new Tone.Synth().toDestination(); // 変更箇所

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
    const keyClass = isBlackKey ? 'bg-black text-white h-40 w-10 ml-[-0.5rem] z-10' : 'bg-white text-black h-64 w-16 border-black';
    const labelClass = isBlackKey ? 'text-xs' : 'text-sm';
    
    return (
      <div
        key={note.id}
        className={`relative ${keyClass} flex items-end justify-center`}
        onClick={() => handleKeyClick(note.frequency)}
      >
        <span className={labelClass}>{note.ja_note_name}</span>
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
            <button type="button" onClick={closeModal} className="absolute top-2 right-2 bg-gray-300 rounded-full p-1">
              ✖
            </button>
            <h2 className="text-xl mb-4">音階を選択してください</h2>
            <div className="flex">
              {notes.map(note => renderKey(note))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTrigger;
