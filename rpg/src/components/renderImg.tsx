import { connect } from "react-redux"
import { changeUnloadedImagesQuantity } from "@redux/sceneReducer"
import { AppStateType } from "@redux/store"
import { useEffect, useState } from "react"

type RenderImgOwnProps = {
    src: string | undefined
    alt?: string
    className?: string
}

const mapStateToProps = (state: AppStateType, ownProps: RenderImgOwnProps) => ({
    src: ownProps.src,
    alt: ownProps.alt,
    className: ownProps.className
})

type MapDispatchToProps = {
    changeUnloadedImagesQuantity: (action: "PLUS_ONE" | "MINUS_ONE") => void
}

type RenderImgProps = ReturnType<typeof mapStateToProps> & MapDispatchToProps

const RenderImg: React.FC<RenderImgProps> = ({ src, alt = 'img', className = undefined, changeUnloadedImagesQuantity }) => {

    useEffect(() => {
        changeUnloadedImagesQuantity("PLUS_ONE")
    }, [])

    return (
        <img src={src} alt={alt} className={className} onLoad={() => changeUnloadedImagesQuantity("MINUS_ONE")} />
    )
}

export default connect(mapStateToProps, { changeUnloadedImagesQuantity })(RenderImg)