import { SceneName } from "scenes" 

export type SlideData = {
    text: string,
    img: string,
}

export type CutsceneData = {
    slideList: Array<SlideData>
    nextSceneName: SceneName
}

const cutscenes = {
    beginning: 'base/cutscenes/beginning/beginning',
    ending1: 'base/cutscenes/ending1',
    ending2: 'base/cutscenes/ending2',
    ending3: 'base/cutscenes/ending3',
}

export type CutsceneName = keyof typeof cutscenes

export const requestCutscene = async (cutsceneName: CutsceneName): Promise<CutsceneData> => {
    let cutscene = await import("" + cutscenes[cutsceneName])
    // delete require.cache[require.resolve("" + cutscenes[cutsceneName]];
    return cutscene.data;
}