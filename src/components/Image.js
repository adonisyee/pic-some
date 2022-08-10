import React, {useContext} from "react"
import PropTypes from "prop-types"
import {Context} from "../Context"
import useHover from "../hooks/useHover"

function Image({className, img}) {
    const [hovered, ref] = useHover()
    const {toggleFavorite, cartItems, addToCart, removeFromCart} = useContext(Context)

    function heartIcon(){
        return img.isFavorite ?
            <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
            : hovered && <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
    }

    function cartIcon() {
        const isInCart = cartItems.find(cartItem => cartItem.id === img.id)
        return isInCart ?
            <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
            : hovered && <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
    }

    return (
        <div
            className={`${className} image-container`}
            ref={ref}
        >
            <img src={img.url} className="image-grid" alt={img.url}/>
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })

}

export default Image
