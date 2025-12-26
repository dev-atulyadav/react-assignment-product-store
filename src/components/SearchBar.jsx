import { Search, X, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for amazing products..."
        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      )}
      {!value && (
        <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
      )}
    </motion.div>
  )
}

export default SearchBar
