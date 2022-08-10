import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [photos, setPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setPhotos(data))
    }, [])

    function toggleFavorite(id) {
        const updatedArr = photos.map(photo => {
            if(photo.id === id) {
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })

        setPhotos(updatedArr)
    }

    function addToCart(img) {
        setCartItems(prevCartItems => ([...prevCartItems, img]))
    }

    function removeFromCart(id) {
        setCartItems(prevCartItems => (prevCartItems.filter(prevCartItem => prevCartItem.id !== id)))
    }

    function emptyCart() {
        setCartItems([])
    }

    return (
        <Context.Provider value={{photos, toggleFavorite, cartItems, addToCart, removeFromCart, emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
