import { AlertCircle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-2 border-red-200 rounded-3xl p-10 max-w-md w-full shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="bg-red-100 p-5 rounded-2xl mb-6"
          >
            <AlertCircle className="w-12 h-12 text-red-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6 font-medium">{message}</p>
          
          {onRetry && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ErrorMessage
