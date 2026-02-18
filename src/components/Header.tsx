import { useState } from 'react';

interface HeaderProps {
  activeTab: 'recipes' | 'leaderboard';
  setActiveTab: (tab: 'recipes' | 'leaderboard') => void;
  onAddRecipe: () => void;
}

export function Header({ activeTab, setActiveTab, onAddRecipe }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FDF6E9]/90 backdrop-blur-md border-b border-[#E8D5B7]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#C9A66B] to-[#8B5E3C] rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform">
              <span className="text-xl md:text-2xl">🍲</span>
            </div>
            <div>
              <h1 className="font-serif text-xl md:text-2xl text-[#3D2E1C] leading-tight">
                Flavor<span className="text-[#C9A66B]">Vault</span>
              </h1>
              <p className="text-[10px] md:text-xs text-[#8B7355] -mt-1 hidden sm:block">Community Recipes</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeTab === 'recipes'
                  ? 'bg-[#3D2E1C] text-[#FDF6E9] shadow-md'
                  : 'text-[#5C4A32] hover:bg-[#E8D5B7]'
              }`}
            >
              🍴 Recipes
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-[#3D2E1C] text-[#FDF6E9] shadow-md'
                  : 'text-[#5C4A32] hover:bg-[#E8D5B7]'
              }`}
            >
              🏆 Leaderboard
            </button>
          </nav>

          {/* Add Recipe Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onAddRecipe}
              className="bg-[#8B9D77] hover:bg-[#7A8C68] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-sm md:text-base"
            >
              <span className="hidden sm:inline">+ Add Recipe</span>
              <span className="sm:hidden">+ Add</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#E8D5B7] transition-colors"
            >
              <svg className="w-6 h-6 text-[#3D2E1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex gap-2">
            <button
              onClick={() => { setActiveTab('recipes'); setMobileMenuOpen(false); }}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'recipes'
                  ? 'bg-[#3D2E1C] text-[#FDF6E9] shadow-md'
                  : 'text-[#5C4A32] bg-[#E8D5B7]'
              }`}
            >
              🍴 Recipes
            </button>
            <button
              onClick={() => { setActiveTab('leaderboard'); setMobileMenuOpen(false); }}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-[#3D2E1C] text-[#FDF6E9] shadow-md'
                  : 'text-[#5C4A32] bg-[#E8D5B7]'
              }`}
            >
              🏆 Leaderboard
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
