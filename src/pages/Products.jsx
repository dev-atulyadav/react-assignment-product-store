import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories } from '../services/api'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ProductDetailModal from '../components/ProductDetailModal'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { Package, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 12

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: products = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [products, selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner fullScreen />
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <ErrorMessage 
          message={error?.message || 'Failed to load products'} 
          onRetry={refetch}
        />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Product Store
                </h1>
                <p className="text-gray-600 font-medium">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5 mb-10">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onClear={() => setSearchQuery('')}
            />
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              isLoading={isLoading}
            />
          </div>

          {paginatedProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-xl font-semibold">No products found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
              >
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onClick={() => setSelectedProduct(product.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center items-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-3 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition-all shadow-md border-2 border-gray-200 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </motion.button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all shadow-md ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-3 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition-all shadow-md border-2 border-gray-200 flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}

export default Products
