import { faCircleCheck, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useCart } from '../../../Context/cart.context';
import { Link } from 'react-router-dom';
import './product.menu.css'

export interface ProductInfo {
    id: number,
    name: string,
    type: string,
    price: string,
    catchPhrase: string,
    imgLink: string,
    productUrl: string,
    productSize: string
}

interface ProductMenuProps extends ProductInfo {
    onSizeChange: (size: string) => void; // Added prop to handle size change
  }

function ProductMenu(props: ProductMenuProps,) {
    const {cartTotalQty} = useCart()
    const [selectedSize, setSelectedSize] = useState<string>(props.productSize)
    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const {handleAddProductToCart, cartProducts} = useCart()
    const [isProduictInCart, setIsProduictInCart] = useState(false)
    const [cartProduct, setCartProduct] = useState<ProductInfo>({
        id: props.id,
        name: props.name,
        type: props.type,
        price: props.price,
        catchPhrase: props.catchPhrase,
        imgLink: props.imgLink,
        productUrl: props.productUrl,
        productSize: props.productSize
    })

    useEffect(() => {
        setIsProduictInCart(false)

        if(cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === props.id)

            if (existingIndex > -1) {
                setIsProduictInCart(true)
            }
        }
    }, [cartProducts, props.id])

    useEffect(() => {
        setCartProduct(prevState => ({
          ...prevState,
          productSize: selectedSize
        }));
    }, [selectedSize]);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSize(event.target.value);
      props.onSizeChange(event.target.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (selectedSize !== '0') {
            handleAddProductToCart(cartProduct);
        } else {
            setIsSizeSelected(true)
        }
    };

    return (
        <div className='menu-container'>
            <h3 className='product-title'>{props.name}</h3>
            <div className='product-type'>{props.type}</div>
            <div className='price'>R$ {props.price}</div>
            <div className='product-catch-phrase'>{props.catchPhrase}</div>            
            <div className='warning-container'>
                <div className='warning'>
                    <div className='product-warning'>ALERTA! FORMA GRANDE.</div>
                    <div className='product-suggestion'>Sugerimos que compre 1 número menor. </div>
                </div>
                <a href='https://cdnv2.moovin.com.br/margilcalcados/imagens/produtos/det/tenis-converse-all-star-lona-ct00100007-chuck-taylor-a308c915b1fcc51eec63d8df5cb636aa.jpg' target='_blank' className='product-guide' rel="noreferrer">GUIA DE TAMANHOS</a>
            </div>
            <select id='select' className="form-select" aria-label="Default select example" value={selectedSize} onChange={handleSelectChange}>
                <option selected>Escolha um tamanho</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
            </select>
            {isProduictInCart ? (
                <>
                <div style={{display:'flex'}}>
                    {/* later require user to pick a size before adding to cart */}
                    <FontAwesomeIcon style={{margin:'6px 6px 0 0'}} icon={faCircleCheck} />
                    <div>Produto adicionado ao carrinho</div>
                </div>
                <Link to={'/cart'}>
                    <button className='btn btn-primary' id='see-cart'>Ver carrinho</button>
                </Link>
                </>
            ) : (
                <>
                <div className='product-options'>
                    {isSizeSelected ? (
                        <>
                            <div className='text-danger' id='size-warning'>Por favor selecione um tamanho</div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <button type='submit' className='btn btn-primary' id='cart-button' onClick={handleSubmit}>Adicionar ao carrinho</button>
                    <button className='btn btn-primary' id='wish-button'><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                </>
            )}
        </div>
    )
}

export default ProductMenu;