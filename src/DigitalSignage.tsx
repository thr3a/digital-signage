import type React from 'react';
import { useEffect, useState } from 'react';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';

const images = [image1, image2, image3];
const DEFAULT_INTERVAL = 10 * 1000;

// URLクエリパラメータから指定されたパラメータを取得する関数
const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const DigitalSignage: React.FC = () => {
  // 現在表示中の画像のインデックスを管理するステート
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // プログレスバーの進捗を管理するステート
  const [progress, setProgress] = useState(0);
  // URLクエリパラメータからインターバル時間を取得
  const intervalParam = getQueryParam('interval');
  // インターバル時間を設定（クエリパラメータがない場合はデフォルト値を使用）
  const interval = intervalParam ? Number.parseInt(intervalParam, 10) : DEFAULT_INTERVAL;
  // コンポーネントがマウントされたときに実行される副作用
  useEffect(() => {
    // 画像を切り替えるためのインターバル
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setProgress(0);
    }, interval);

    // プログレスバーを更新するためのインターバル
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 0;
        return prevProgress + 1;
      });
    }, interval / 100);

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => {
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    };
  }, [interval]); // intervalが変更されたときに再実行
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <img
        src={images[currentImageIndex]}
        alt='Digital Signage'
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          objectFit: 'contain'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20px'
          // backgroundColor: 'rgba(0, 0, 255, 0.3)'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'white',
            transition: 'width 0.1s linear'
          }}
        />
      </div>
    </div>
  );
};

export default DigitalSignage;
