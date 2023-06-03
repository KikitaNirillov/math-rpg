import React, { Suspense, useEffect, useState } from 'react'
import './App.scss'
import { connect } from 'react-redux'
import { SceneName, scenes } from './scenes'
import { AppStateType } from './redux/store'
import settings from 'settings'
import { setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount, setSceneWithTransition } from 'redux/sceneReducer'
import LoadingScreen from 'components/main/loadingScreen'

type AppProps = StatePropsType & DispatchPropsType

const App: React.FC<AppProps> = ({ setOpacity, setSceneWithTransition, setOpacityTransitionIsOver, setCurrentSceneDidMount, ...props }) => {

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const [screenHeight, setScreenHeigth] = useState<number>(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      setScreenHeigth(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const appStyle = {
    '--vh': screenHeight*0.01 + 'px',
    width: '100%',
  }

  const [isLandscape, setIsLandscape] = useState(true);
  const checkOrientation = () => {
    const isLandscape = (window.innerHeight / window.innerWidth) <= 9/16;
    setIsLandscape(isLandscape);
  };
  useEffect(() => {
    window.addEventListener('resize', checkOrientation);
    checkOrientation();

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);
  
  const [loadingExistedForEnoughTime, setLoadingExistedForEnoughTime] = useState<boolean>(true)
  const CurrentScene = props.currentScene ? scenes[props.currentScene] : () => { return <div /> }
  const [currentSceneName, setCurrentSceneName] = useState<SceneName | null>(props.currentScene)

  useEffect(() => {
    console.log("This place is for employers! If you are a regular player, please close the console")
    setSceneWithTransition('EpilepsyWarningScreen') 
  }, [setSceneWithTransition])

  useEffect(() => {
    setCurrentSceneDidMount(false)
    setCurrentSceneName(props.currentScene)
  }, [props.currentScene])

  useEffect(() => { // for loading and scene changing
    if (props.downloadQuantity === 0 && props.opacityTransitionToZeroIsOver && props.opacity !== 1 && props.currentSceneDidMount) {
      if (currentSceneName === props.currentScene) {
        setOpacity(1)
        setTimeout(() => {
          setOpacityTransitionIsOver(true)
        }, settings.opacityTransitionForUnblockScreen)
      }
    }
  }, [currentSceneName, props.downloadQuantity, props.opacityTransitionToZeroIsOver, props.opacity, props.currentSceneDidMount, setOpacity, setOpacityTransitionIsOver])

  return (
    <div className='app' style={appStyle} translate="no">
      {!isLandscape && <div className='rotateRequest'>
        <p className='rotateRequest_text'>
          Please, rotate your phone <br />
          (If this screen does not disappear, then the game is not supported on your device or screen)
        </p>
      </div>}
      <div className='appMain'>
        {
          ((props.downloadQuantity !== 0 && props.opacityTransitionToZeroIsOver) || loadingExistedForEnoughTime === false) ?
            <LoadingScreen setLoadingExistedForEnoughTime={setLoadingExistedForEnoughTime} /> :
            <div className={`appWrapper ${!props.opacityTransitionIsOver || props.opacity === 0 ? `blocked` : ``}`} style={{ opacity: `${props.opacity}`, transition: `opacity ${settings.opacityTransition}ms` }}>
              <Suspense fallback={<div />}>
                <CurrentScene />
              </Suspense>
            </div >
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  currentScene: state.scene.currentScene,
  currentSceneDidMount: state.scene.currentSceneDidMount,
  opacity: state.scene.opacity,
  opacityTransitionIsOver: state.scene.opacityTransitionIsOver,
  opacityTransitionToZeroIsOver: state.scene.opacityTransitionToZeroIsOver,
  downloadQuantity: state.scene.downloadQuantity,
  unloadedImagesQuantity: state.scene.unloadedImagesQuantity
})
type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  setOpacity: (opacity: number) => void
  setOpacityTransitionIsOver: (isOver: boolean) => void
  setCurrentSceneDidMount: (didMount: boolean) => void
  setSceneWithTransition: (scene: SceneName) => void
}

export default connect(mapStateToProps, { setSceneWithTransition, setOpacity, setOpacityTransitionIsOver, setCurrentSceneDidMount })(App);
