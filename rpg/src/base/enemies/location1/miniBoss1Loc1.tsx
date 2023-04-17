import { EnemyData } from '@base/enemies'
import loc1MiniBoss1DefaultImg from '@sprites/locations/location1/enemies/understand.gif'
import loc1MiniBoss1StaticImg from '@sprites/locations/location1/enemies/understandStatic.png'

export const data: EnemyData = {
    name: 'miniBoss1Loc1',
    defaultImg: loc1MiniBoss1DefaultImg,
    staticImg: loc1MiniBoss1StaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the capital of Russia?',
            answers: { correctAnswer: 'Moscow', incorrectAnswer: 'St. Petersburg' }
        },
        {
            question: 'What is the capital of USA?',
            answers: { correctAnswer: 'Washington', incorrectAnswer: 'New York' }
        }
    ]
}

