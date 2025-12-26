# Product Store

A React application for browsing and managing products. Built with modern tools and patterns.

## Live Demo

**[https://productstore-react.netlify.app](https://productstore-react.netlify.app)**

## What It Does

This app lets you browse products from a fake store API. You can:

- Log in with a simple authentication system
- View products in a grid layout
- Search and filter products by category
- Click on products to see more details
- Edit product information
- Delete products (with confirmation)
- Navigate through pages of products

The app uses React Query to handle data fetching and caching, so it feels fast and doesn't make unnecessary API calls. When you edit or delete something, the UI updates right away.

## Built With

- React 18
- Vite
- React Query v5
- React Router v6
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Getting Started

You'll need Node.js installed (v18 or higher).

Clone the repo and install dependencies:

\`\`\`bash
git clone https://github.com/dev-atulyadav/react-assignment-product-store.git
cd react-assignment
npm install
\`\`\`

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Open `http://localhost:5173` in your browser.

To build for production:

\`\`\`bash
npm run build
\`\`\`

## Login

The login is just for demo purposes. Use these credentials:

- Username: `user`
- Password: `password`

## 📁 Project Structure

\`\`\`
react-assignment/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
│  How It Works

### Authentication
The login page stores your session in localStorage, so you stay logged in even if you refresh the page. Routes are protected, so you can't access the products page without logging in first.

### Data Management
I'm using React Query to handle all the API calls. It caches data for 5 minutes and automatically refetches when you switch back to the browser tab. This means fewer API calls and a snappier experience.

When you edit or delete a product, React Query updates the cache immediately so you see the changes right away without waiting for a reload.

### The API
All product data comes from [Fake Store API](https://fakestoreapi.com). It's a free API that returns dummy product data. Keep in mind that updates and deletes don't actually persist on their end - they just return a success response.

### UI
The design uses Tailwind CSS for styling and Framer Motion for animations. Everything is responsive and works on mobile, tablet, and desktop.

## 🧪 Testing the Application

1. **Login**
   - Navigate to login page
   - Enter credentials (user/password)
   - Verify redirect to products page

2. **Products List**
   - Verify all 20 products load
   - Test search functionality
   - Test category filters
   - Test pagination

3. **Product Details**
   - Click any product card
   - Verify modal opens with details
   - Check rating display

4. **Update Product**
   - Click "Edit Product"
   - Modify title and price
   - Save changes
   - Verify UI updates immediately

5. **Delete Product**
   - Click "Delete Product"
   - Confirm deletion
   - Verify product removed from list

6. **Window Focus**
   - Switch to another tab
   - Switch back
   - Check network tab for refetch request

## 📊 Performance Optimizations

- React Query caching reduces redundant API calls
- Pagination limits DOM nodes
- Memoized filtered products list
- Optimistic UI updates for mutations
- Image lazy loading (browser native)
- Debounced search (via useMemo)

## 🐛 Known Limitations

- Fake Store API doesn't persist changes (simulated updates)
- Limited to 20 products in the API
- No real authentication backend

## 📝 Assignment Requirements Checklist

- ✅ Simple login page with session persistence
- ✅ Protected routes
- ✅ Fetch and display products from API
- ✅ Product detail modal with full information
- ✅ Edit product functionality
- ✅ Delete product with confirmation
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Loading and error states
- ✅ Search and category filters
- ✅ React Query for state management
- ✅ Intelligent caching
- ✅ Refetch on window focus
- ✅ Performance optimization
- ✅ Pagination for efficient data loading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## Deployment

The site is deployed on Netlify. To deploy your own:

\`\`\`bash
npm run build
\`\`\`

Then drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop).

Or use the CLI:

\`\`\`bash
netlify deploy --prod --dir=dist
\`\`\`

## Things to Note

- The Fake Store API doesn't actually save changes. When you edit or delete a product, it returns a success response but the data resets when you refresh.
- There are only 20 products in the API.
- The authentication is just for show - there's no real backend.
- I built this as a learning project to practice React Query, routing, and state management.

## Author

Built by [Atul Yadav](https://github.com/dev-atulyadav)

Feel free to reach out if you have questions or suggestions!