import type { NextPage } from 'next'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { SearchResults } from '../Components/SearchResult';

type Results = {
  totalPrice: number;
  data: any[]
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [result, setResults] = useState<Results>({
    data: [],
    totalPrice: 0
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map((product: any) => {
      return{
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total:number, product:any) => {
      return total + product.price
    }, 0)

    setResults({ totalPrice, data:products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      <SearchResults results={result.data} totalPrice={result.totalPrice} onAddToWishList={addToWishlist} />
    </div>
  )
}

export default Home
