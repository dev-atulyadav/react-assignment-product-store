import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'default', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-10 w-10',
    large: 'h-16 w-16',
  }

  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className={`${sizeClasses[size]} text-purple-600`} />
    </motion.div>
  )

  if (fullScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          {spinner}
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-600 font-semibold"
        >
          Loading amazing products...
        </motion.p>
      </motion.div>
    )
  }

  return spinner
}

export default LoadingSpinner
