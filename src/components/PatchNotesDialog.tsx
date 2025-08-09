"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PatchNote {
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'fix' | 'feature' | 'improvement';
  priority: 'high' | 'medium' | 'low';
  affectedAreas?: string[];
  show: boolean; // Controls if this patch note should be shown to users
}

const patchNotesData: PatchNote[] = [
  {
    version: "1.2.0",
    date: "2025-8-9",
    title: "Добавлено боковое меню навигации",
    description: "Добавлено профессиональное боковое меню с навигацией по всем разделам приложения. Включает возможность скрытия/показа меню, адаптивный дизайн для мобильных устройств и автоматическое закрытие на мобильных устройствах при переходе между страницами.",
    type: "feature",
    priority: "high",
    affectedAreas: ["Навигация", "Пользовательский интерфейс", "Мобильная версия", "Удобство использования"],
    show: true
  },
  {
    version: "1.1.4",
    date: "2025-01-27",
    title: "Добавлены данные игры №5",
    description: "Добавлена статистика для новой игровой сессии, проведенной у Димы дома. Включены результаты всех участников и детальная информация о бай-инах.",
    type: "feature",
    priority: "medium",
    affectedAreas: ["Статистика игр", "Глобальные метрики", "История сессий"],
    show: false
  },
  {
    version: "1.1.3",
    date: "2025-01-27",
    title: "Обновление аватаров игроков",
    description: "Добавлены новые аватары для игроков, у которых их не было, и обновлены существующие аватары для лучшего визуального представления.",
    type: "improvement",
    priority: "medium",
    affectedAreas: ["Профили игроков", "Карточки игроков", "Визуальный дизайн"],
    show: false
  },
  {
    version: "1.1.2",
    date: "2025-01-27",
    title: "Исправления точности расчетов и отображения валюты",
    description: "Критические исправления для обеспечения корректной работы системы расчетов и отображения валюты во всех разделах приложения.",
    type: "fix",
    priority: "high",
    affectedAreas: ["Расчеты результатов", "Отображение валюты", "Страница игроков", "Индивидуальные профили"],
    show: false
  },
  {
    version: "1.1.1",
    date: "2025-01-27",
    title: "Новые функции отображения статистики",
    description: "Добавлены новые элементы интерфейса для улучшения пользовательского опыта и предоставления более детальной информации о результатах игроков.",
    type: "feature",
    priority: "medium",
    affectedAreas: ["Карточки игроков", "Отображение результатов", "Пользовательский интерфейс"],
    show: false
  }
];

const patchNotes = patchNotesData
  .filter(note => note.show) // Only show patch notes where show is true
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const getTypeColor = (type: PatchNote['type']) => {
  switch (type) {
    case 'fix':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
    case 'feature':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
    case 'improvement':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
};

const getTypeLabel = (type: PatchNote['type']) => {
  switch (type) {
    case 'fix':
      return 'Исправление';
    case 'feature':
      return 'Новая функция';
    case 'improvement':
      return 'Улучшение';
    default:
      return 'Обновление';
  }
};

const getPriorityColor = (priority: PatchNote['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const getPriorityLabel = (priority: PatchNote['priority']) => {
  switch (priority) {
    case 'high':
      return 'Критично';
    case 'medium':
      return 'Важно';
    case 'low':
      return 'Низкий';
    default:
      return 'Средний';
  }
};

export function PatchNotesDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPatchNotes = localStorage.getItem('hasSeenPatchNotes');
    const lastVersion = localStorage.getItem('lastPatchNotesVersion');
    const currentVersion = patchNotes[0].version;

    if (!hasSeenPatchNotes || lastVersion !== currentVersion) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPatchNotes', 'true');
    localStorage.setItem('lastPatchNotesVersion', patchNotes[0].version);
  };

  const fixes = patchNotes.filter(note => note.type === 'fix');
  const features = patchNotes.filter(note => note.type === 'feature');
  const improvements = patchNotes.filter(note => note.type === 'improvement');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[85vh] overflow-y-auto sm:max-w-5xl px-4 sm:px-6" showCloseButton={false}>
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-3">
              🎉 Обновления ППГ
              <Badge variant="outline" className="text-xs">
                v{patchNotes[0].version}
              </Badge>
            </DialogTitle>
            <div className="text-xs text-muted-foreground">
              {new Date(patchNotes[0].date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <DialogDescription className="text-sm sm:text-base">
            Последние исправления и улучшения в системе отслеживания покерных игр
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Critical Fixes Section */}
          {fixes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  🔧 Критические исправления
                </h3>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  {fixes.length}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {fixes.map((note, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-900/10">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 flex-wrap">
                            <CardTitle className="text-base sm:text-lg">{note.title}</CardTitle>
                            <div className="flex gap-1 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTypeColor(note.type)}`}
                              >
                                {getTypeLabel(note.type)}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(note.priority)}`}>
                                {getPriorityLabel(note.priority)}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          v{note.version}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {note.affectedAreas && note.affectedAreas.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Затронутые области:</p>
                          <div className="flex flex-wrap gap-1">
                            {note.affectedAreas.map((area, areaIndex) => (
                              <Badge key={areaIndex} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Improvements Section */}
          {improvements.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                  ✨ Улучшения
                </h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  {improvements.length}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {improvements.map((note, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500 bg-green-50/30 dark:bg-green-900/10">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 flex-wrap">
                            <CardTitle className="text-base sm:text-lg">{note.title}</CardTitle>
                            <div className="flex gap-1 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTypeColor(note.type)}`}
                              >
                                {getTypeLabel(note.type)}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(note.priority)}`}>
                                {getPriorityLabel(note.priority)}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          v{note.version}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {note.affectedAreas && note.affectedAreas.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Затронутые области:</p>
                          <div className="flex flex-wrap gap-1">
                            {note.affectedAreas.map((area, areaIndex) => (
                              <Badge key={areaIndex} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* New Features Section */}
          {features.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  🚀 Новые функции
                </h3>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {features.length}
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {features.map((note, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 flex-wrap">
                            <CardTitle className="text-base sm:text-lg">{note.title}</CardTitle>
                            <div className="flex gap-1 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTypeColor(note.type)}`}
                              >
                                {getTypeLabel(note.type)}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(note.priority)}`}>
                                {getPriorityLabel(note.priority)}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{note.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          v{note.version}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {note.affectedAreas && note.affectedAreas.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Затронутые области:</p>
                          <div className="flex flex-wrap gap-1">
                            {note.affectedAreas.map((area, areaIndex) => (
                              <Badge key={areaIndex} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleClose} size="default" className="sm:size-default">
            Понятно
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 