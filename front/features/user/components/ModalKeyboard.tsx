import { Button } from "@/components/ui/button";
import { Note } from "@/types/interface";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from 'tone';

const ModalKeyboard: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const synth = new Tone.Synth().toDestination();
  const keyboardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isModalOpen && keyboardRef.current) {
      keyboardRef.current.scrollLeft = 0;
    }
  }, [isModalOpen]);

  const renderKey = (note: Note, index: number) => {
    const isBlackKey = note.en_note_name.includes('#');
    const noteName = note.en_note_name.replace('#', '');
    const noteWithoutOctave = noteName.slice(0, -1);

    const whiteKeyWidth = 46;
    const blackKeyWidth = 30;
    const whiteKeyHeight = 160;
    const blackKeyHeight = 100;

    const keyStyle = isBlackKey
      ? {
          backgroundColor: '#000000',
          width: `${blackKeyWidth}px`,
          height: `${blackKeyHeight}px`,
          marginLeft: `-${blackKeyWidth / 2}px`,
          marginRight: `-${blackKeyWidth / 2}px`,
          zIndex: 1,
          color: 'white',
        }
      : {
          backgroundColor: '#ffffff',
          border: '1px solid #c0c0c0',
          width: `${whiteKeyWidth}px`,
          height: `${whiteKeyHeight}px`,
          zIndex: 0,
          borderRadius: '0 0 4px 4px',
        };

    return (
      <div
        key={note.id}
        style={{
          ...keyStyle,
          position: isBlackKey ? 'relative' : 'static',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
        onMouseDown={() => handleKeyClick(note.frequency)}
        onMouseUp={() => synth.triggerRelease()}
        onMouseLeave={() => synth.triggerRelease()}
      >
        <span style={{
          position: 'absolute',
          bottom: '5px',
          fontSize: isBlackKey ? '8px' : '10px',
        }}>
          {note.ja_note_name}
        </span>
      </div> 
    );
  };

  return (
    <div>
      <Button type="button" onClick={() => setIsModalOpen(true)}>
        キーボードを表示
      </Button>
      {isModalOpen && (
        <div
          className="bg-black bg-opacity-50 flex"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white"
            style={{
              width: '90%',
              maxWidth: '1200px',
              height: '300px',
              overflowX: 'auto',
              overflowY: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '8px',
            }}
          >
            <Button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-300 rounded-full p-1"
            >
              ✖
            </Button>
            <h2 className="m-4 text-center mb-12 text-2xl">音階を選択してください</h2>
            <div
              ref={keyboardRef}
              style={{
                height: '160px',
                width: '100%',
                position: 'relative',
                overflowX: 'auto',
                overflowY: 'hidden',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div style={{
                display: 'flex',
                position: 'relative',
                height: '100%',
              }}>
                {notes.map((note, index) => renderKey(note, index))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalKeyboard;