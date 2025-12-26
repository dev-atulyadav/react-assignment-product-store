import { motion } from 'framer-motion'

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, isLoading }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-wrap gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectCategory('all')}
        className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize shadow-md ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
        }`}
        disabled={isLoading}
      >
        All Products
      </motion.button>
      
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize shadow-md ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          }`}
          disabled={isLoading}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  )
}

export default CategoryFilter
