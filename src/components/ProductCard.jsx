import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden border border-gray-100 group"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-6"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-sm font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            ${product.price.toFixed(2)}
          </span>
        </div>
        {product.rating && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold">{product.rating.rate}</span>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-purple-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
            {product.category}
          </span>
          
          {product.rating && (
            <span className="text-xs text-gray-500 font-medium">
              {product.rating.count} reviews
            </span>
          )}
        </div>
        
        <motion.div 
          className="pt-2 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors font-medium">
            Click to view details →
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductCard
