import React from 'react'
import Banner from './components/banner/Banner'
import ProductList from './components/product/ProductList'

const page = () => {
  return (
    <div>
      <Banner />
      <div className=' my-10 ' >
        <ProductList />
      </div>
    </div>
  )
}

export default page