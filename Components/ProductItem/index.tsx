import { memo, useState } from "react";
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from "../AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
    return import('../AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
    loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    },
    onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
        <div className="">
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

            {
                isAddingToWishlist && (
                    <AddProductToWishlist
                        onAddToWishlist={() => onAddToWishList(product.id)}
                        onRequestClose={() => setIsAddingToWishlist(false)}
                    />
                )
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps, nextProps)
})

/**
 * memo
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 * 
 * useMemo
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */