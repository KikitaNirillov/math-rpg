import { LocationName } from '@base/locations';
import * as math from 'mathjs';
export type EquationAnswer = {
    x: Array<number>
    y?: Array<number>
}

export type EquationData = {
    equation: string
    equationAnswer: EquationAnswer
}

const getRandomNumber = () => {
    const number = Math.floor(Math.random() * 99) + 1 / ((Math.random() <= 0.5) ? 10 : 1)
    return ((Math.random() <= 0.5) ? (-number) : number)
}

const generateLinearEquation = (): Promise<EquationData> => {
    const answer = getRandomNumber();
    const firstNumber = getRandomNumber();
    const secondNumber = getRandomNumber();
    const product = +math.format(math.multiply(math.bignumber(answer), math.bignumber(firstNumber)), { notation: 'fixed' })
    const rightPart = +math.format(math.add(math.bignumber(product), math.bignumber(secondNumber)), { notation: 'fixed' })
    const equation = firstNumber + 'x' + (secondNumber < 0 ? secondNumber : `+${secondNumber}`) + '=' + rightPart
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                answer
            ]
        }
    })
}

const generateSystemOfEquations = (): Promise<EquationData> => {
    const answerX = getRandomNumber();
    const answerY = getRandomNumber();
    const firstNumber = getRandomNumber();
    const secondNumber = getRandomNumber();
    const thirdNumber = getRandomNumber();
    const fourthNumber = getRandomNumber();
    //for first equation:
    const product1 = +math.format(math.multiply(math.bignumber(answerX), math.bignumber(firstNumber)), { notation: 'fixed' })
    const product2 = +math.format(math.multiply(math.bignumber(answerY), math.bignumber(secondNumber)), { notation: 'fixed' })
    const rightPart1 = +math.format(math.add(math.bignumber(product1), math.bignumber(product2)), { notation: 'fixed' })
    const firstEquation = firstNumber + 'x' + (secondNumber < 0 ? secondNumber : `+${secondNumber}`) + 'y=' + rightPart1
    //for second equation:
    const product3 = +math.format(math.multiply(math.bignumber(answerX), math.bignumber(thirdNumber)), { notation: 'fixed' })
    const product4 = +math.format(math.multiply(math.bignumber(answerY), math.bignumber(fourthNumber)), { notation: 'fixed' })
    const rightPart2 = +math.format(math.add(math.bignumber(product3), math.bignumber(product4)), { notation: 'fixed' })
    const secondEquation = thirdNumber + 'x' + (fourthNumber < 0 ? fourthNumber : `+${fourthNumber}`) + 'y=' + rightPart2

    const equation = firstEquation + ', ' + secondEquation
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                answerX
            ],
            "y": [
                answerY
            ]
        }
    })
}
const generateQuadraticEquation = (): Promise<EquationData> => {
    const firstAnswer = getRandomNumber();
    const secondAnswer = getRandomNumber();
    const answersSum = +math.format(math.add(math.bignumber(firstAnswer), math.bignumber(secondAnswer)), { notation: 'fixed' })
    const answersProduct = +math.format(math.multiply(math.bignumber(firstAnswer), math.bignumber(secondAnswer)), { notation: 'fixed' })
    const equation = 'x²' +
        (answersSum > 0 ? `-${answersSum}` : (answersSum === 0 ? '' : `+${-answersSum}`))
        + 'x'
        + (answersProduct > 0 ? `+${answersProduct}` : (answersProduct === 0 ? '' : answersProduct))
        + '=0'
    return Promise.resolve({
        equation,
        equationAnswer: {
            "x": [
                firstAnswer,
                secondAnswer
            ]
        }
    })
}

export const generateEquation = (locationName: LocationName): Promise<EquationData> => {
    switch (locationName) {
        case 'location1':
        default:
            return generateLinearEquation()
        case 'location2':
            return generateSystemOfEquations()
        case 'location3':
            return generateQuadraticEquation()
    }

}