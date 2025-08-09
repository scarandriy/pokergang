'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const funnyLoadingMessages = [
  "Пересчитываем кто кому должен...",
  "Восстанавливаем память о том, кто что говорил...",
  "Ищем отговорки почему проиграл...",
  "Загружаем болезненные воспоминания...",
  "Синхронизируем версии правды...",
  "Проверяем честность дилера...",
  "Анализируем качество фишек...",
  "Подсчитываем слезы проигравших...",
  "Проверяем, не забыл ли кто-то фишки...",
  "Ищем потерянные карты...",
  "Пересчитываем пот-оддсы...",
  "Проверяем, не блефует ли сервер...",
  "Анализируем качество блефа...",
  "Подсчитываем количество 'это дисперсия'...",
  "Проверяем, не забыл ли кто-то про комиссию...",
  "Ищем оправдания для проигрышей...",
  "Проверяем, не перепутали ли фишки...",
  "Анализируем качество позиции...",
  "Подсчитываем количество тильтов...",
  "Проверяем, не забыл ли кто-то про аутсы..."
];

const loadingEmojis = ['🎰', '🃏', '💰', '🎲', '🏆', '💎', '🃏', '🎯', '🎪', '🎭'];

export function FunnyLoading() {
  const [message, setMessage] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomMessage = funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)];
    const randomEmoji = loadingEmojis[Math.floor(Math.random() * loadingEmojis.length)];
    
    setMessage(randomMessage);
    setEmoji(randomEmoji);
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="max-w-md mx-4">
        <CardContent className="p-6 text-center">
          {/* Анимация карт с flip эффектом */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="text-2xl animate-card-flip" style={{ animationDelay: '0s' }}>🃏</div>
            <div className="text-2xl animate-card-flip" style={{ animationDelay: '0.2s' }}>💰</div>
            <div className="text-2xl animate-card-flip" style={{ animationDelay: '0.4s' }}>🎲</div>
            <div className="text-2xl animate-card-flip" style={{ animationDelay: '0.6s' }}>🏆</div>
            <div className="text-2xl animate-card-flip" style={{ animationDelay: '0.8s' }}>💎</div>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-medium">{message}</p>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Пока сервер думает, подумай о своей стратегии
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 