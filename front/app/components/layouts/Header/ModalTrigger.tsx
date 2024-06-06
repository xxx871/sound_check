"use client"

import React, { useState } from 'react'

const ModalTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [mode1Page, setMode1Page] = useState(1);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPage('home');
    setMode1Page(1);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderMode1Content = () => {
    switch (mode1Page) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">通常モード</h2>
            <p>通常モードの説明の1ページ目です。</p>
            <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick= {() => setPage('home')}
            >
              戻る
            </button>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setMode1Page(2)}
            >
              進む
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">通常モード</h2>
            <p>通常モードの説明の2ページ目です。</p>
            <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick= {() => setMode1Page(1)}
            >
              戻る
            </button>
            {/* <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setMode1Page(2)}
            >
              進む
            </button> */}
          </>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return (
          <>
            <h2 className="text-xl font-bold mb-4">遊び方</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('mode1')}
            >
              通常モード
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('mode2')}
            >
              練習モード
            </button>
            <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('mode3')}
            >
              ハモりモード
            </button>
            <p className="mt-4">
              3種類のモードからゲームを選択できます。
              モードを選択して、STARTしてください。
              各モードの説明については上記ボタンより
            </p>
          </>
        );
      case 'mode1':
        return renderMode1Content();
      case 'mode2':
        return (
          <>
            <h2 className="text-xl font-bold mb-4">練習モード</h2>
            <p>練習モードの説明を書きます。</p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('home')}
            >
              戻る
            </button>
          </>
        );
      case 'mode3':
        return (
          <>
            <h2 className="text-xl font-bold mb-4">ハモりモード</h2>
            <p>ハモりモードの説明を書きます。</p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('home')}
            >
              戻る
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        className="text-white"
        onClick={handleOpenModal}
      >
        遊び方</button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white p-4 rounded shadow-lg max-w-lg">
            {renderContent()}
            <button
              className="mt-4 bg-red-500 px-4 py-2 rounded text-white"
              onClick={handleCloseModal}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTrigger