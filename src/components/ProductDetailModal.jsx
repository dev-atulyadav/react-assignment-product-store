import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchProduct, updateProduct, deleteProduct } from '../services/api'
import Modal from './Modal'
import ConfirmDialog from './ConfirmDialog'
import LoadingSpinner from './LoadingSpinner'
import { Edit2, Trash2, Star, X, Check, DollarSign, Tag, Package } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductDetailModal = ({ productId, onClose }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editedData, setEditedData] = useState({})
  const queryClient = useQueryClient()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  })

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldData) => {
        if (!oldData) return oldData
        return oldData.map((p) =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        )
      })
      
      queryClient.setQueryData(['product', productId], updatedProduct)
      
      setIsEditing(false)
      setEditedData({})
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.setQueryData(['products'], (oldData) => {
        if (!oldData) return oldData
        return oldData.filter((p) => p.id !== productId)
      })
      
      onClose()
    },
  })

  const handleEdit = () => {
    setEditedData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    updateMutation.mutate({
      id: productId,
      data: editedData,
    })
  }

  const handleDelete = () => {
    deleteMutation.mutate(productId)
  }

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={onClose} title="Loading...">
        <div className="flex justify-center items-center p-12">
          <LoadingSpinner size="large" />
        </div>
      </Modal>
    )
  }

  if (isError || !product) {
    return (
      <Modal isOpen={true} onClose={onClose} title="Error">
        <div className="p-6 text-center text-red-600">
          Failed to load product details
        </div>
      </Modal>
    )
  }

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title="Product Details">
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-10 border-2 border-purple-100"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {!isEditing ? (
                <>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-xl capitalize">
                        <Tag className="w-4 h-4" />
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-900">{product.rating.rate}</span>
                          <span className="text-gray-500 text-sm">({product.rating.count})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">Price</span>
                    </div>
                    <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-gray-900 text-lg">Description</h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEdit}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      disabled={updateMutation.isPending}
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Product
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Product Title
                    </label>
                    <input
                      type="text"
                      value={editedData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editedData.price}
                      onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editedData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editedData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-32 resize-y"
                    />
                  </div>

                  {updateMutation.isError && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg"
                    >
                      Failed to update product
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <Check className="w-5 h-5" />
                      )}
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsEditing(false)
                        setEditedData({})
                      }}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                      disabled={updateMutation.isPending}
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}

export default ProductDetailModal
