import { Recipe } from './types';
import { motion } from 'framer-motion';

interface LeaderboardProps {
  recipes: Recipe[];
}

export function Leaderboard({ recipes }: LeaderboardProps) {
  const sortedRecipes = [...recipes].sort((a, b) => b.votes - a.votes);
  const topThree = sortedRecipes.slice(0, 3);
  const rest = sortedRecipes.slice(3);

  const podiumOrder = [1, 0, 2]; // 2nd, 1st, 3rd for visual arrangement
  const podiumHeights = ['h-28 md:h-36', 'h-36 md:h-48', 'h-24 md:h-28'];
  const medals = ['🥈', '🥇', '🥉'];
  const podiumColors = ['bg-[#C0C0C0]', 'bg-[#FFD700]', 'bg-[#CD7F32]'];

  return (
    <div className="py-6 md:py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A66B] to-[#D4B896] px-4 md:px-6 py-2 rounded-full mb-4">
          <span className="text-xl md:text-2xl">🏆</span>
          <span className="text-[#3D2E1C] font-medium text-sm md:text-base">Weekly Competition</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-[#3D2E1C] mb-2">Flavor Champions</h2>
        <p className="text-[#8B7355] text-sm md:text-base">The most loved recipes of the week</p>
      </motion.div>

      {/* Podium Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center items-end gap-2 md:gap-4 mb-12 md:mb-16 px-2"
      >
        {podiumOrder.map((position, visualIndex) => {
          const recipe = topThree[position];
          if (!recipe) return null;

          return (
            <motion.div
              key={recipe.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + visualIndex * 0.15 }}
              className="flex flex-col items-center"
            >
              {/* Recipe Card */}
              <div className={`relative mb-2 ${position === 0 ? 'scale-105 md:scale-110' : ''}`}>
                <div className={`absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 ${podiumColors[position]} rounded-full flex items-center justify-center shadow-lg z-10`}>
                  <span className="text-lg md:text-xl">{medals[position]}</span>
                </div>
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Recipe Info */}
              <div className="text-center mb-2 max-w-[100px] md:max-w-[140px]">
                <h3 className="font-serif text-sm md:text-base text-[#3D2E1C] leading-tight line-clamp-2">{recipe.name}</h3>
                <p className="text-[#8B7355] text-xs mt-0.5">{recipe.author}</p>
                <p className="text-[#C9A66B] font-bold text-sm md:text-base mt-1">{recipe.votes} votes</p>
              </div>

              {/* Podium Stand */}
              <div className={`${podiumHeights[position]} w-24 md:w-36 ${podiumColors[position]} rounded-t-xl flex items-start justify-center pt-3 md:pt-4`}>
                <span className="text-2xl md:text-4xl font-serif text-white/80">{position + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Rest of Leaderboard */}
      <div className="max-w-2xl mx-auto">
        <h3 className="font-serif text-xl md:text-2xl text-[#3D2E1C] mb-4 md:mb-6 flex items-center gap-2">
          <span>📊</span> Full Rankings
        </h3>

        <div className="space-y-2 md:space-y-3">
          {rest.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-xl border border-[#E8D5B7] hover:border-[#C9A66B] transition-colors"
            >
              {/* Rank */}
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F5EDE0] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-base md:text-lg text-[#8B7355]">#{index + 4}</span>
              </div>

              {/* Image */}
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm md:text-base text-[#3D2E1C] truncate">{recipe.name}</h4>
                <p className="text-[#8B7355] text-xs md:text-sm">{recipe.author}</p>
              </div>

              {/* Votes */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-[#C9A66B] text-base md:text-lg">{recipe.votes}</p>
                <p className="text-[#A89B8A] text-xs">votes</p>
              </div>
            </motion.div>
          ))}
        </div>

        {rest.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E8D5B7]">
            <span className="text-4xl mb-3 block">🍴</span>
            <p className="text-[#8B7355]">Add more recipes to see the full leaderboard!</p>
          </div>
        )}
      </div>

      {/* Weekly Reward Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 md:mt-16 max-w-xl mx-auto"
      >
        <div className="bg-gradient-to-br from-[#FFF9F0] to-[#F5EDE0] rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-[#E8D5B7] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C9A66B]/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#8B9D77]/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl">🎁</span>
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-[#3D2E1C]">Weekly Rewards</h3>
                <p className="text-[#8B7355] text-sm">For the champion recipe</p>
              </div>
            </div>

            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center gap-3 text-[#5C4A32]">
                <span className="w-7 h-7 bg-[#8B9D77] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                <span className="text-sm md:text-base">Featured spot on homepage banner</span>
              </li>
              <li className="flex items-center gap-3 text-[#5C4A32]">
                <span className="w-7 h-7 bg-[#8B9D77] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                <span className="text-sm md:text-base">Special "Champion Chef" badge</span>
              </li>
              <li className="flex items-center gap-3 text-[#5C4A32]">
                <span className="w-7 h-7 bg-[#8B9D77] rounded-full flex items-center justify-center text-white text-sm">✓</span>
                <span className="text-sm md:text-base">Entry into monthly grand prize draw</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
