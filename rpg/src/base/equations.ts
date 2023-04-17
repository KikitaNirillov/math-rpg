import { LocationName } from "./locations"

export type EquationAnswer = {
    x: Array<number>
    y?: Array<number>
}

export type EquationData = {
    equation: string
    equationAnswer: EquationAnswer
}

const equations: { [key: string]: string } = {
    location1Folder: 'base/equations/location1/',
    location2Folder: 'base/equations/location2/',
    location3Folder: 'base/equations/location3/',
}

export const requestEquation = async (locationName: LocationName): Promise<EquationData> => {
    const randInt = Math.floor(Math.random() * 0) + 1 // 49, not 0)
    let equation = await import("" + equations[locationName + "Folder"] + 'equation' + randInt)
    // delete require.cache[require.resolve("" + equations[locationName + "Folder"] + 'euastion' + randInt)];
    return equation.data;
}