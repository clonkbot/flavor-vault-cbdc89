import { useState } from 'react';
import { Recipe } from './types';
import { motion } from 'framer-motion';

interface AddRecipeModalProps {
  onClose: () => void;
  onAdd: (recipe: Omit<Recipe, 'id' | 'votes'>) => void;
  categories: string[];
}

export function AddRecipeModal({ onClose, onAdd, categories }: AddRecipeModalProps) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const defaultImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1482049016gy-2d1ec7ab7445?w=400&h=300&fit=crop',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ingredientList = ingredients
      .split('\n')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    if (!name || !author || ingredientList.length === 0 || !instructions) {
      return;
    }

    onAdd({
      name,
      author,
      category,
      ingredients: ingredientList,
      instructions,
      image: imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDF6E9] rounded-2xl md:rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#8B9D77] to-[#6B7D5A] p-5 md:p-6 rounded-t-2xl md:rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-white text-xl">✕</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-white">Share Your Recipe</h2>
              <p className="text-white/80 text-sm">Add your culinary creation to the vault</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-5">
          {/* Recipe Name */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Recipe Name <span className="text-[#C9A66B]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Grandma's Apple Pie"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A]"
              required
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Your Name <span className="text-[#C9A66B]">*</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g., Chef John"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Category <span className="text-[#C9A66B]">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Image URL <span className="text-[#8B7355] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/your-dish.jpg"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A]"
            />
            <p className="text-xs text-[#8B7355] mt-1">Leave empty for a random food image</p>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Ingredients <span className="text-[#C9A66B]">*</span>
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={"1 cup flour\n2 eggs\n1/2 cup sugar\n..."}
              rows={4}
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A] resize-none"
              required
            />
            <p className="text-xs text-[#8B7355] mt-1">One ingredient per line</p>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-[#3D2E1C] font-medium mb-2">
              Instructions <span className="text-[#C9A66B]">*</span>
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe how to prepare this delicious dish..."
              rows={4}
              className="w-full px-4 py-3 bg-white rounded-xl border-2 border-[#E8D5B7] focus:border-[#8B9D77] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A] resize-none"
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl font-medium text-[#5C4A32] bg-[#E8D5B7] hover:bg-[#DCC9A8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-3 rounded-xl font-medium text-white bg-[#8B9D77] hover:bg-[#7A8C68] transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              🍽️ Add Recipe
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
