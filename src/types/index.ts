export interface Player {
  description?: string;
  id: string;
  name: string;
  pfp?: string; // путь к аватарке игрока
}

export interface PlayerBuyin {
  playerId: string;
  buyins: number[];
  result: number; // результат игры (положительный - выигрыш, отрицательный - проигрыш)
}

export interface Session {
  id: number;
  date: string;
  notes?: string;
  players?: string[]; // массив playerId для сессий без бай-инов
  playersBuyins?: PlayerBuyin[]; // для сессий с бай-инами и результатами
}

export interface SessionsData {
  sessions: Session[];
} 