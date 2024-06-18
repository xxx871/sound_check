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
            <p>通常モードは登録されている音域内もしくは選択した性別ごとの音域内からランダムに音が出題され、</p>
              <p>マイクボタンを押して3秒以内に発声した最初の音の高さと判定を行います。</p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setPage('home')}
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
            <p>簡単モードでは半音なし、普通モードでは半音を含めた音域内からランダムに出題されます。</p>
            <p className="text-red-700">※現時点では簡単モードのみの実装で半音も含まれています。普通モードはありません。</p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setMode1Page(1)}
            >
              戻る
            </button>
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
            <div className="mt-4">
              <p>おんぴしゃはランダムに出る音と同じ高さの音が</p>
              <p>発声できるかゲーム感覚で練習できるアプリです。</p>
              <p>ユーザー登録をすると、編集画面から自分だけの</p>
              <p>音域を登録することができ、その中からランダムに</p>
              <p>音が出題されます。</p>
              <p>登録しなくても、選択した性別によって一定の</p>
              <p>音域内から出題されます。</p>
              <p>　</p>
              <p>各モードの説明については上のボタンよりご覧ください。</p>
            </div>
          </>
        );
      case 'mode1':
        return renderMode1Content();
      case 'mode2':
        return (
          <>
            <h2 className="text-xl font-bold mb-4">練習モード</h2>
            <p>随時実装予定です。乞うご期待！</p>
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
            <p>随時実装予定です。乞うご期待！</p>
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
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-black"
          onClick={handleBackgroundClick}
        >
          <div className="bg-white p-4 rounded shadow-lg max-w-lg relative">
            <button
              className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded text-white"
              onClick={handleCloseModal}
            >
              ✖
            </button>
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTrigger;
