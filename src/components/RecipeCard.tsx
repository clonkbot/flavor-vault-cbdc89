import { useState } from 'react';
import { Recipe } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe;
  onVote: (id: string) => void;
  hasVoted: boolean;
  delay: number;
}

export function RecipeCard({ recipe, onVote, hasVoted, delay }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVoteAnim, setShowVoteAnim] = useState(false);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVoted) {
      setShowVoteAnim(true);
      onVote(recipe.id);
      setTimeout(() => setShowVoteAnim(false), 600);
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        onClick={() => setIsExpanded(true)}
        className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#E8D5B7] hover:border-[#C9A66B]"
      >
        {/* Image */}
        <div className="relative h-44 md:h-52 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-[#5C4A32]">{recipe.category}</span>
          </div>

          {/* Vote Button */}
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-2 rounded-full transition-all ${
              hasVoted
                ? 'bg-[#8B9D77] text-white'
                : 'bg-white/90 backdrop-blur-sm text-[#3D2E1C] hover:bg-[#C9A66B] hover:text-white'
            }`}
          >
            <span className={`text-lg transition-transform ${showVoteAnim ? 'scale-150' : ''}`}>
              {hasVoted ? '❤️' : '🤍'}
            </span>
            <span className="text-sm font-semibold">{recipe.votes}</span>
          </button>

          {/* Author */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-[#C9A66B] to-[#8B5E3C] rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold">
              {recipe.author.charAt(0)}
            </div>
            <span className="text-white text-xs md:text-sm font-medium drop-shadow-md">{recipe.author}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <h3 className="font-serif text-lg md:text-xl text-[#3D2E1C] leading-tight mb-2 group-hover:text-[#8B5E3C] transition-colors line-clamp-2">
            {recipe.name}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients.slice(0, 3).map((ing, i) => (
              <span key={i} className="text-xs bg-[#F5EDE0] text-[#6B5744] px-2.5 py-1 rounded-full">
                {ing.split(' ').slice(-1)[0]}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-xs bg-[#E8D5B7] text-[#5C4A32] px-2.5 py-1 rounded-full font-medium">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.article>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FDF6E9] rounded-2xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header Image */}
              <div className="relative h-48 md:h-64">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D2E1C]/80 to-transparent" />
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-[#8B9D77] text-white text-xs px-3 py-1 rounded-full mb-2">
                    {recipe.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-white">{recipe.name}</h2>
                  <p className="text-white/80 text-sm mt-1">by {recipe.author}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 md:p-8">
                {/* Vote Section */}
                <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl border border-[#E8D5B7]">
                  <div>
                    <p className="text-[#8B7355] text-sm">Community Rating</p>
                    <p className="font-serif text-2xl text-[#3D2E1C]">{recipe.votes} votes</p>
                  </div>
                  <button
                    onClick={handleVote}
                    disabled={hasVoted}
                    className={`px-5 py-3 rounded-xl font-medium transition-all ${
                      hasVoted
                        ? 'bg-[#8B9D77] text-white cursor-default'
                        : 'bg-[#C9A66B] text-white hover:bg-[#B8956A] hover:-translate-y-0.5 shadow-md'
                    }`}
                  >
                    {hasVoted ? '❤️ Voted!' : '🤍 Vote for this recipe'}
                  </button>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="font-serif text-xl text-[#3D2E1C] mb-3 flex items-center gap-2">
                    <span>🥘</span> Ingredients
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#5C4A32] bg-white p-3 rounded-lg border border-[#E8D5B7]">
                        <span className="w-2 h-2 bg-[#8B9D77] rounded-full flex-shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="font-serif text-xl text-[#3D2E1C] mb-3 flex items-center gap-2">
                    <span>👨‍🍳</span> Instructions
                  </h3>
                  <p className="text-[#5C4A32] leading-relaxed bg-white p-4 rounded-xl border border-[#E8D5B7]">
                    {recipe.instructions}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
