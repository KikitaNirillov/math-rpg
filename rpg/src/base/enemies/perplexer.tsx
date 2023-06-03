import { EnemyData } from '@base/enemies'
import perplexerDefaultImg from '@sprites/enemies/perplexer.gif'
import perplexerStaticImg from '@sprites/enemies/perplexerStatic.png'

export const data: EnemyData = {
    name: 'Perplexer',
    defaultImg: perplexerDefaultImg,
    staticImg: perplexerStaticImg,
    enemyType: 'miniBoss',
    questions: [
        {
            question: 'What is the standard form of a linear equation?',
            answers: { correctAnswer: 'Ax + By = C', incorrectAnswer: 'y = mx + b' }
        },
        {
            question: 'What is the order of operations in math?',
            answers: { correctAnswer: 'Parentheses, Exponents, Multiplication and Division, Addition and Subtraction.', incorrectAnswer: 'Addition, Subtraction, Multiplication, Division, Exponents, Parentheses.' }
        },
        {
            question: 'How do you react if an adult says something you disagree with?',
            answers: { correctAnswer: 'I listen to their opinion and express my own to come to a mutual understanding.', incorrectAnswer: 'I simply agree with them because they are an adult and therefore know better.' }
        }
    ]
}

