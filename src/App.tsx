import { useState, useEffect } from 'react';
import { RecipeCard } from './components/RecipeCard';
import { AddRecipeModal } from './components/AddRecipeModal';
import { Leaderboard } from './components/Leaderboard';
import { Header } from './components/Header';
import { Recipe } from './components/types';

const initialRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Grandma\'s Honey Glazed Chicken',
    author: 'Chef Maria',
    ingredients: ['1 whole chicken', '4 tbsp honey', '2 tbsp soy sauce', 'Fresh rosemary', 'Garlic cloves', 'Lemon'],
    instructions: 'Preheat oven to 375°F. Mix honey, soy sauce, and minced garlic. Rub chicken with mixture, stuff with lemon and rosemary. Roast for 1.5 hours until golden.',
    votes: 127,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
    category: 'Main Course'
  },
  {
    id: '2',
    name: 'Wild Mushroom Risotto',
    author: 'Antonio B.',
    ingredients: ['Arborio rice', 'Mixed wild mushrooms', 'White wine', 'Parmesan', 'Shallots', 'Vegetable broth'],
    instructions: 'Sauté mushrooms and shallots. Add rice, toast briefly. Gradually add warm broth while stirring. Finish with parmesan and butter.',
    votes: 98,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop',
    category: 'Main Course'
  },
  {
    id: '3',
    name: 'Lemon Lavender Tart',
    author: 'Sophie Chen',
    ingredients: ['Shortcrust pastry', 'Lemons', 'Eggs', 'Sugar', 'Cream', 'Dried lavender'],
    instructions: 'Blind bake pastry. Whisk lemon juice, zest, eggs, sugar, and cream with lavender. Pour into shell, bake until just set.',
    votes: 156,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
    category: 'Dessert'
  },
  {
    id: '4',
    name: 'Spicy Korean Bibimbap',
    author: 'Ji-Yeon Park',
    ingredients: ['Short grain rice', 'Gochujang', 'Beef bulgogi', 'Spinach', 'Carrots', 'Fried egg', 'Sesame oil'],
    instructions: 'Cook rice, prepare vegetables and beef separately. Arrange beautifully in bowl, top with egg. Drizzle sesame oil and gochujang.',
    votes: 201,
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop',
    category: 'Main Course'
  },
  {
    id: '5',
    name: 'Mediterranean Mezze Platter',
    author: 'Yara Hassan',
    ingredients: ['Hummus', 'Baba ganoush', 'Falafel', 'Tabbouleh', 'Pita bread', 'Olives', 'Feta cheese'],
    instructions: 'Prepare each component fresh. Arrange artfully on large platter. Garnish with fresh herbs, olive oil drizzle, and sumac.',
    votes: 89,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    category: 'Appetizer'
  },
  {
    id: '6',
    name: 'Chocolate Soufflé',
    author: 'Pierre Dubois',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Vanilla extract', 'Powdered sugar'],
    instructions: 'Melt chocolate with butter. Beat egg whites stiff. Fold together gently. Bake at 375°F for 12-14 minutes. Serve immediately.',
    votes: 178,
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop',
    category: 'Dessert'
  }
];

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'recipes' | 'leaderboard'>('recipes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [votedRecipes, setVotedRecipes] = useState<Set<string>>(new Set());

  const categories = ['All', 'Main Course', 'Appetizer', 'Dessert', 'Breakfast', 'Soup', 'Salad'];

  const handleVote = (id: string) => {
    if (votedRecipes.has(id)) return;

    setRecipes(prev => prev.map(r =>
      r.id === id ? { ...r, votes: r.votes + 1 } : r
    ));
    setVotedRecipes(prev => new Set([...prev, id]));
  };

  const handleAddRecipe = (recipe: Omit<Recipe, 'id' | 'votes'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      votes: 0
    };
    setRecipes(prev => [newRecipe, ...prev]);
    setShowAddModal(false);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const weeklyWinner = [...recipes].sort((a, b) => b.votes - a.votes)[0];

  return (
    <div className="min-h-screen bg-[#FDF6E9] relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-[#E8D5B7] rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-48 h-48 md:w-64 md:h-64 bg-[#C9A66B] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 md:w-72 md:h-72 bg-[#8B9D77] rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddRecipe={() => setShowAddModal(true)}
        />

        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-20">
          {activeTab === 'recipes' ? (
            <>
              {/* Weekly Champion Banner */}
              <section className="my-6 md:my-10">
                <div className="relative bg-gradient-to-r from-[#C9A66B] via-[#D4B896] to-[#C9A66B] rounded-2xl md:rounded-3xl p-4 md:p-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full"
                         style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                  </div>
                  <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#8B5E3C] rounded-full blur-md opacity-30 scale-110" />
                        <img
                          src={weeklyWinner.image}
                          alt={weeklyWinner.name}
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-[#D4A853] rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xl md:text-2xl">👑</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-[#5C4A32] font-medium text-sm md:text-base tracking-wide uppercase">This Week's Champion</p>
                      <h2 className="font-serif text-2xl md:text-4xl text-[#3D2E1C] mt-1">{weeklyWinner.name}</h2>
                      <p className="text-[#6B5744] mt-1 md:mt-2 text-sm md:text-base">by {weeklyWinner.author} · {weeklyWinner.votes} votes</p>
                    </div>
                    <div className="md:ml-auto flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3">
                      <span className="text-2xl md:text-3xl">🏆</span>
                      <span className="font-serif text-lg md:text-xl text-[#3D2E1C]">Winner!</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Search and Filter */}
              <section className="mb-6 md:mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search recipes or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 md:px-6 py-3 md:py-4 bg-white rounded-full border-2 border-[#E8D5B7] focus:border-[#C9A66B] focus:outline-none text-[#3D2E1C] placeholder-[#A89B8A] text-base shadow-sm font-sans"
                  />
                  <span className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-xl md:text-2xl">🔍</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 md:px-5 py-2 md:py-3 rounded-full whitespace-nowrap text-sm md:text-base transition-all font-medium ${
                        selectedCategory === cat
                          ? 'bg-[#8B9D77] text-white shadow-md'
                          : 'bg-white text-[#5C4A32] border-2 border-[#E8D5B7] hover:border-[#8B9D77]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Recipe Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onVote={handleVote}
                    hasVoted={votedRecipes.has(recipe.id)}
                    delay={index * 0.1}
                  />
                ))}
              </section>

              {filteredRecipes.length === 0 && (
                <div className="text-center py-16 md:py-20">
                  <span className="text-5xl md:text-6xl mb-4 block">🍳</span>
                  <p className="text-[#8B7355] text-lg md:text-xl font-serif">No recipes found. Why not add one?</p>
                </div>
              )}
            </>
          ) : (
            <Leaderboard recipes={recipes} />
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 border-t border-[#E8D5B7]">
          <p className="text-center text-[#A89B8A] text-xs md:text-sm">
            Requested by <span className="text-[#8B7355]">@yousuf_has</span> · Built by <span className="text-[#8B7355]">@clonkbot</span>
          </p>
        </footer>

        {showAddModal && (
          <AddRecipeModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddRecipe}
            categories={categories.filter(c => c !== 'All')}
          />
        )}
      </div>
    </div>
  );
}

export default App;
