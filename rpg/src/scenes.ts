import React from 'react';

export type SceneName = 'ChoosePlayer' | 'LocationMap' | 'Arena' | 'GameOver' | 'ImprovementScreen' | 'Cutscene'
export const scenes = {
    Arena: React.lazy(() => import('./components/main/arena/arenaContainer')),
    ChoosePlayer: React.lazy(() => import('./components/main/choosePlayer/choosePlayerContainer')),
    LocationMap: React.lazy(() => import('./components/main/locationMap/locationMapContainer')),
    GameOver: React.lazy(() => import('components/main/gameOver/gameOverContainer')),
    ImprovementScreen: React.lazy(() => import('components/main/improvementScreen/improvementScreenContainer')),
    Cutscene: React.lazy(() => import('components/main/cutscene/cutsceneContainer'))
};