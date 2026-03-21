import React, { useState, useEffect } from 'react';
import { 
  Home,
  ScanLine,
  User,
  LayoutDashboard,
  Plus,
  Package,
  QrCode,
  ArrowLeft,
  Info,
  MapPin,
  Camera,
  Search,
  ChevronRight,
  TrendingUp,
  Award,
  Settings,
  Heart,
  Trash2,
  Download,
  X,
  ShieldCheck,
  Upload,
  FileText,
  ShoppingCart,
  Star,
  CheckCircle2,
  BadgeCheck,
  Building2,
  Sparkles,
  Globe2,
  ExternalLink,
  Menu
} from 'lucide-react';

// --- MOCK DATA ---
const initialProducts = [
  {
    id: 'p1',
    name: 'boAt Nirvana ANC Earbuds',
    artisan: 'boAt Lifestyle',
    region: 'Delhi, India',
    category: 'Electronics',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Active Noise Cancelling truly wireless earbuds designed in India.',
    culturalValue: 'Founded by Aman Gupta and Sameer Mehta, boAt has revolutionized the Indian audio market by providing high-quality, stylish, and affordable audio products customized for the Indian ear.',
    economicBenefit: 'Manufactured through local PLI schemes, generating thousands of jobs in Indian electronics assembly and reducing reliance on foreign audio brands.',
    scans: 8942,
    verified: true,
    rating: 4.8,
    reviews: 12450,
    website: 'https://www.boat-lifestyle.com/'
  },
  {
    id: 'p2',
    name: 'Mamaearth Ubtan Face Wash',
    artisan: 'Honasa Consumer Ltd.',
    region: 'Haryana',
    category: 'Beauty',
    price: 249,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Natural, toxin-free face wash enriched with Turmeric and Saffron.',
    culturalValue: 'Reviving the ancient Indian tradition of using Ubtan (a mix of turmeric, saffron, and natural oils) for skincare in a modern, easy-to-use format.',
    economicBenefit: 'A homegrown unicorn brand that locally sources natural ingredients from Indian farmers and plants a tree for every order.',
    scans: 4320,
    verified: true,
    rating: 4.6,
    reviews: 8920,
    website: 'https://mamaearth.in/'
  },
  {
    id: 'p3',
    name: 'Kanjeevaram Silk Stole',
    artisan: 'Srikanth Weavers',
    region: 'Tamil Nadu',
    category: 'Handicrafts',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Authentic pure mulberry silk stole with Zari work.',
    culturalValue: 'Woven from pure mulberry silk thread. The pure gold and silver zari comes from Gujarat. This art form dates back to the Chola Dynasty.',
    economicBenefit: 'Directly benefits the handloom weavers of Kanchipuram, ensuring fair wages and keeping the ancient loom alive.',
    scans: 256,
    verified: true,
    rating: 4.9,
    reviews: 312,
    website: 'https://en.wikipedia.org/wiki/Kanchipuram_silk_sari'
  },
  {
    id: 'p4',
    name: 'Premium Cotton Polo',
    artisan: 'Rare Rabbit',
    region: 'Karnataka',
    category: 'Apparel',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Premium cotton polo t-shirt crafted for modern Indian men.',
    culturalValue: 'Rare Rabbit is an Indian premium fashion brand competing globally, proving that high-end fashion design and manufacturing can successfully originate from India.',
    economicBenefit: 'Supports the Indian textile industry from cotton farming to final garment manufacturing, promoting "Make in India" in premium apparel.',
    scans: 1250,
    verified: true,
    rating: 4.7,
    reviews: 1840,
    website: 'https://thehouseofrare.com/'
  },
  {
    id: 'p6',
    name: 'The Derma Co 1% Hyaluronic',
    artisan: 'Honasa Consumer Ltd.',
    region: 'Haryana, India',
    category: 'Beauty',
    price: 499,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Hydrating sunscreen aqua gel with Hyaluronic Acid.',
    culturalValue: 'Designed specifically for Indian skin types and weather conditions, formulated by expert Indian dermatologists.',
    economicBenefit: 'Manufactured entirely in India, supporting local laboratories and retaining beauty industry wealth within the domestic economy.',
    scans: 5120,
    verified: true,
    rating: 4.5,
    reviews: 14200,
    website: 'https://thedermaco.com/'
  },
  {
    id: 'p9',
    name: 'Noise ColorFit Pro 4',
    artisan: 'Nexxbase Marketing',
    region: 'Haryana, India',
    category: 'Electronics',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Feature-rich smartwatch made for the Indian market.',
    culturalValue: 'Noise is a leading Indian connected lifestyle brand that democratized smart wearables for the masses in India.',
    economicBenefit: 'Assembled in India under local PLI schemes, creating domestic tech jobs and competing directly with expensive foreign wearables.',
    scans: 6750,
    verified: true,
    rating: 4.4,
    reviews: 18900,
    website: 'https://www.gonoise.com/'
  },
  {
    id: 'p10',
    name: 'Mysore Sandal Premium Soap',
    artisan: 'Karnataka Soaps & Detergents',
    region: 'Karnataka, India',
    category: 'FMCG',
    price: 150,
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'The only soap in the world made from 100% pure sandalwood oil.',
    culturalValue: 'Introduced by the Maharaja of Mysore in 1916, it preserves the ancient Indian legacy of sandalwood in daily skincare and Ayurvedic healing.',
    economicBenefit: 'A state-owned enterprise that sustains the indigenous sandalwood farming ecosystem and supports local factory workers in Karnataka.',
    scans: 15420,
    verified: true,
    rating: 4.8,
    reviews: 54200,
    website: 'https://www.mysoresandal.co.in/'
  },
  {
    id: 'p12',
    name: 'Handblock Print Kurta',
    artisan: 'FabIndia',
    region: 'New Delhi, India',
    category: 'Apparel',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1583391733958-d25e07fac66a?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Breathable everyday cotton kurta with traditional handblock prints.',
    culturalValue: 'Celebrates traditional Indian textile techniques like block printing, preserving centuries-old craft methods for modern wardrobes.',
    economicBenefit: 'FabIndia connects over 55,000 rural craft producers to modern markets, ensuring sustainable employment for artisans and weavers across India.',
    scans: 9850,
    verified: true,
    rating: 4.6,
    reviews: 12300,
    website: 'https://www.fabindia.com/'
  },
  {
    id: 'p14',
    name: 'Lenskart Air Classic',
    artisan: 'Lenskart Solutions',
    region: 'Rajasthan, India',
    category: 'Apparel',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Ultra-lightweight flexible eyeglasses designed for daily wear.',
    culturalValue: 'Lenskart revolutionized the Indian eyewear market by manufacturing high-quality, affordable glasses locally in their mega-factory in Bhiwadi.',
    economicBenefit: 'Creates thousands of manufacturing jobs in Rajasthan and reduces dependence on imported eyewear frames and lenses.',
    scans: 18200,
    verified: true,
    rating: 4.7,
    reviews: 45000,
    website: 'https://www.lenskart.com/'
  },
  {
    id: 'p16',
    name: 'Wildcraft Rucksack 45L',
    artisan: 'Wildcraft India',
    region: 'Karnataka, India',
    category: 'Apparel',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Durable, weather-resistant trekking backpack.',
    culturalValue: 'Born out of a passion for outdoor exploration in the Western Ghats, Wildcraft is India’s foremost homegrown outdoor and adventure gear brand.',
    economicBenefit: 'Manufactured across multiple facilities in India, supporting local textile and gear manufacturing against foreign outdoor brands.',
    scans: 8900,
    verified: true,
    rating: 4.8,
    reviews: 15600,
    website: 'https://wildcraft.com/'
  },
  {
    id: 'p18',
    name: 'Oversized Graphic T-Shirt',
    artisan: 'Bonkers Corner',
    region: 'Maharashtra, India',
    category: 'Apparel',
    price: 999,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Premium oversized streetwear graphic t-shirt.',
    culturalValue: 'Bonkers Corner is a homegrown Indian streetwear brand that brings global fashion trends to the Indian youth at accessible prices.',
    economicBenefit: 'Designed and manufactured in India, boosting local apparel manufacturing and supporting homegrown fashion startups.',
    scans: 14500,
    verified: true,
    rating: 4.6,
    reviews: 24500,
    website: 'https://www.bonkerscorner.com/'
  }
];

export default function LokritiApp() {
  const [role, setRole] = useState('consumer'); // 'consumer' | 'owner'
  const [activeTab, setActiveTab] = useState('home'); // home, scan, profile, cart
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [qrModal, setQrModal] = useState(null); 
  const [cart, setCart] = useState([]);
  const [showCertModal, setShowCertModal] = useState(null); 
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setSelectedProduct(randomProduct);
    }, 2500);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([{ 
      ...newProduct, 
      id: `p${Date.now()}`, 
      scans: 0, 
      rating: 5.0, 
      reviews: 0 
    }, ...products]);
    setActiveTab('dashboard');
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); 
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setActiveTab('home');
    }, 3500); // Auto close success modal
  };

  const categories = ['All', 'Electronics', 'Beauty', 'Apparel', 'Handicrafts', 'FMCG'];

  // --- UI COMPONENTS ---

  // Mobile Bottom Nav
  const BottomNav = () => {
    if (selectedProduct || isScanning || activeTab === 'cart' || checkoutSuccess) return null; 

    return (
      <div className="md:hidden fixed bottom-0 w-full z-40 bg-white/80 backdrop-blur-2xl border-t border-gray-200/50 pb-safe shadow-[0_-4px_30px_rgba(0,0,0,0.02)]">
        <div className="flex justify-around items-center px-6 py-4">
          {role === 'consumer' ? (
            <>
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-black' : 'text-gray-400 hover:text-gray-600'} transition-all duration-300`}>
                <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-black' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wide">Home</span>
              </button>
              
              <button onClick={handleScanSimulation} className="relative -top-5 group">
                <div className="bg-black text-white p-4 rounded-full shadow-2xl group-hover:scale-105 group-active:scale-95 transition-all duration-300 border-4 border-gray-50">
                  <ScanLine className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-gray-600'} transition-all duration-300`}>
                <Settings className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-black' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wide">Settings</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-black' : 'text-gray-400 hover:text-gray-600'} transition-all duration-300`}>
                <LayoutDashboard className={`w-6 h-6 ${activeTab === 'dashboard' ? 'fill-black' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wide">Dashboard</span>
              </button>
              
              <button onClick={() => setActiveTab('add')} className="relative -top-5 group">
                <div className="bg-black text-white p-4 rounded-full shadow-2xl group-hover:scale-105 group-active:scale-95 transition-all duration-300 border-4 border-gray-50">
                  <Plus className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-gray-600'} transition-all duration-300`}>
                <Settings className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-black' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wide">Settings</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // Desktop Side Nav
  const DesktopSideNav = () => {
    return (
      <div className="hidden md:flex w-64 bg-gray-50 border-r border-gray-200 flex-col h-screen sticky top-0 z-40 flex-shrink-0">
        <div className="px-8 py-8 flex items-center gap-2 border-b border-gray-200/60">
          <Award className="w-6 h-6 text-indigo-600 fill-indigo-600/20" />
          <h1 className="text-xl font-black tracking-widest text-gray-900 uppercase">LOKRITI</h1>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2">
          {role === 'consumer' ? (
            <>
              <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'home' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-black' : ''}`} /> Home
              </button>
              <button onClick={() => setActiveTab('cart')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'cart' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <div className="flex items-center gap-4">
                  <ShoppingCart className={`w-5 h-5 ${activeTab === 'cart' ? 'fill-black' : ''}`} /> Cart
                </div>
                {cart.length > 0 && <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
              </button>
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Settings className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-black' : ''}`} /> Settings
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'fill-black' : ''}`} /> Dashboard
              </button>
              <button onClick={() => setActiveTab('add')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'add' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Plus className="w-5 h-5" /> Digitize Product
              </button>
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-white text-black shadow-sm border border-gray-200/60' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <Settings className={`w-5 h-5 ${activeTab === 'profile' ? 'fill-black' : ''}`} /> Settings
              </button>
            </>
          )}
        </div>

        {/* Scan Button pinned at bottom of sidebar for consumers */}
        {role === 'consumer' && (
          <div className="p-4 border-t border-gray-200/60">
            <button onClick={handleScanSimulation} className="w-full bg-black text-white px-4 py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              <ScanLine className="w-5 h-5" /> Scan Tag
            </button>
          </div>
        )}
      </div>
    );
  };

  const TopBar = ({ title, showBack, onBack, showCart }) => (
    <div className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-gray-200/50 px-4 py-3 flex items-center justify-between relative h-[64px]">
      <div className="flex-1 flex justify-start">
        {showBack && (
          <button onClick={onBack} className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
        {title === 'LOKRITI' && <Award className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />}
        <h1 className="text-[17px] font-black tracking-widest text-gray-900 uppercase">{title || 'LOKRITI'}</h1>
      </div>
      
      <div className="flex-1 flex justify-end">
        {showCart && role === 'consumer' && (
          <button onClick={() => setActiveTab('cart')} className="relative text-gray-900 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cart.length}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );

  // --- VIEWS ---

  const ConsumerHome = () => {
    const filteredProducts = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.region.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.artisan.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="animate-in fade-in duration-500 pb-28 md:pb-12 max-w-7xl mx-auto w-full">
        <TopBar title="LOKRITI" showCart={true} />
        
        <div className="px-5 md:px-10 pt-6 md:pt-10 pb-2">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-1 leading-tight">Discover</h2>
          <h3 className="text-xl md:text-2xl font-medium text-gray-500 mb-6 md:mb-8">Verified Indian Brands</h3>
          
          <div className="mt-6 mb-5 relative group max-w-3xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search brands, products & crafts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/80 border-0 rounded-2xl py-3.5 md:py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all shadow-inner text-base"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-4 pt-1">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                  activeCategory === cat 
                  ? 'bg-black text-white shadow-md md:scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200/60 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 md:px-10 pt-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-lg">No brands found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="group relative h-[360px] w-full rounded-[32px] overflow-hidden active:scale-[0.98] transition-transform cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
                  
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2 pr-16">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span className="text-[11px] font-bold text-white tracking-wide uppercase">{product.region}</span>
                    </div>

                    {product.verified && (
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                        <span className="text-[11px] font-bold text-white tracking-wide uppercase">Verified</span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-5 right-5 bg-black/30 backdrop-blur-md border border-white/20 p-2.5 rounded-full transition-colors active:scale-90 shadow-sm hover:bg-black/50"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-gray-300 mb-1.5 font-semibold tracking-wide uppercase truncate">{product.artisan}</p>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight line-clamp-2">{product.name}</h3>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white">₹{product.price}</span>
                      <div className="flex items-center gap-1 text-gray-900 bg-white px-3.5 py-1.5 rounded-full shadow-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartView = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="animate-in fade-in duration-300 pb-24 md:pb-12 h-full flex flex-col bg-gray-50 md:bg-white w-full">
        <TopBar title="CART" showBack onBack={() => setActiveTab('home')} />
        
        <div className="px-5 md:px-10 pt-6 md:pt-10 flex-1 overflow-y-auto w-full max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
              <div className="bg-gray-100 p-8 rounded-full mb-6 shadow-inner">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <p className="font-bold text-2xl text-gray-900">Your cart is empty</p>
              <p className="text-base mt-2 mb-8 text-gray-500">Support verified Indian brands.</p>
              <button 
                onClick={() => setActiveTab('home')}
                className="bg-black text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform text-lg"
              >
                Discover Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Review Order</h2>
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-4 rounded-[24px] flex gap-5 items-center">
                    <img src={item.image} alt={item.name} className="w-28 h-28 rounded-[18px] object-cover shadow-sm" />
                    <div className="flex-1 py-2">
                      <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-500 font-medium mb-3">{item.artisan}</p>
                      <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors bg-gray-50 rounded-full mr-2"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-200/60 sticky top-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span className="font-semibold text-gray-900">₹{total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-bold">Free</span>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-lg">Total</span>
                      <span className="text-3xl font-black text-gray-900 tracking-tight">₹{total}</span>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-full font-bold shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                    onClick={handleCheckout}
                  >
                    Secure Checkout <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Fixed Checkout Bar (hidden on md) */}
        {cart.length > 0 && (
          <div className="md:hidden fixed bottom-0 w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-gray-200/50 p-6 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-end mb-5 px-1">
              <span className="text-gray-500 font-semibold text-sm">Subtotal ({cart.length} items)</span>
              <span className="text-3xl font-black text-gray-900 tracking-tight">₹{total}</span>
            </div>
            <button 
              className="w-full bg-blue-600 text-white py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(37,99,235,0.25)] active:scale-95 transition-transform flex items-center justify-center gap-2 text-lg"
              onClick={handleCheckout}
            >
              Secure Checkout <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  const ProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-50 w-full flex items-end md:items-center justify-center bg-white md:bg-gray-900/60 md:backdrop-blur-sm animate-in fade-in duration-300">
        
        {/* Modal Container */}
        <div className="w-full h-full md:h-[85vh] md:max-w-5xl md:bg-white md:rounded-[40px] md:shadow-2xl md:overflow-hidden flex flex-col md:flex-row relative animate-in slide-in-from-bottom duration-400">
          
          {/* Mobile Back Button - Floating */}
          <button 
            onClick={() => setSelectedProduct(null)}
            className="md:hidden absolute top-6 left-4 z-10 bg-black/30 backdrop-blur-xl p-3 rounded-full text-white shadow-sm"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={(e) => toggleFavorite(e, selectedProduct.id)}
            className="md:hidden absolute top-6 right-4 z-10 bg-black/30 backdrop-blur-xl p-3 rounded-full shadow-sm"
          >
            <Heart className={`w-6 h-6 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>

          {/* Desktop Close Button */}
          <button 
            onClick={() => setSelectedProduct(null)}
            className="hidden md:flex absolute top-6 right-6 z-20 bg-gray-100 p-3 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Detail Image Header */}
          <div className="relative h-[55vh] md:h-full w-full md:w-1/2 flex-shrink-0">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 md:to-transparent" />
            
            {/* Desktop Favorite Overlay */}
            <button 
              onClick={(e) => toggleFavorite(e, selectedProduct.id)}
              className="hidden md:flex absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Heart className={`w-6 h-6 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Right: Scrollable Content Area */}
          <div className="relative -mt-10 md:mt-0 w-full md:w-1/2 bg-white rounded-t-[40px] md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none pb-32 md:pb-0 overflow-y-auto hide-scrollbar flex flex-col">
            
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4 md:hidden" />
            
            <div className="px-6 md:px-10 pt-2 md:pt-12 flex-1">
              <h1 className="text-[28px] md:text-4xl font-black tracking-tight text-gray-900 mb-4 leading-tight">{selectedProduct.name}</h1>
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10">
                {selectedProduct.verified && (
                  <button 
                    onClick={() => setShowCertModal(selectedProduct)}
                    className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4 text-white" /> 
                    <span className="text-sm font-bold text-white tracking-wide">Verified Origin</span>
                    <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
                <div className="flex items-center gap-1.5 bg-gray-100 px-4 py-2 rounded-full border border-gray-200/60">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{selectedProduct.rating}</span>
                  <span className="text-sm text-gray-500 font-medium">({selectedProduct.reviews.toLocaleString()})</span>
                </div>
              </div>

              <div className="flex items-center gap-5 mb-10 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <Building2 className="w-7 h-7 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Manufactured By</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black text-gray-900 flex items-center gap-1.5">
                      {selectedProduct.artisan}
                    </p>
                    {selectedProduct.website && (
                      <a href={selectedProduct.website} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700 p-1.5 rounded-full transition-colors" title="Visit Official Website">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1.5 font-medium mt-1">
                    <MapPin className="w-3.5 h-3.5"/>{selectedProduct.region}
                  </p>
                </div>
              </div>

              {/* Apple-style Widget Cards */}
              <div className="space-y-5 md:pb-32">
                <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-amber-50 rounded-2xl">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 tracking-tight">Cultural Heritage</h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed font-medium">{selectedProduct.culturalValue}</p>
                </div>

                <div className="bg-white rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:border-emerald-200 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-emerald-50 rounded-2xl">
                      <TrendingUp className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 tracking-tight">Economic Impact</h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed font-medium">{selectedProduct.economicBenefit}</p>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Bar (Sticks to bottom of right pane on desktop) */}
            <div className="fixed md:absolute bottom-0 left-0 right-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200/50 p-5 md:px-10 md:py-6 pb-safe flex justify-between items-center z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.06)] md:shadow-none">
              <div className="pl-2">
                <p className="text-xs text-gray-500 mb-0.5 font-bold uppercase tracking-wider">Price</p>
                <span className="text-3xl font-black text-gray-900 tracking-tight">₹{selectedProduct.price}</span>
              </div>
              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null); 
                }}
                className="bg-black text-white px-8 md:px-12 py-4 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-lg"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const OwnerDashboard = () => (
    <div className="animate-in fade-in duration-500 pb-24 md:pb-12 bg-gray-50 min-h-screen w-full">
      <TopBar title="DASHBOARD" />
      
      <div className="px-5 md:px-10 pt-6 md:pt-10 pb-6 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Overview</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-6 md:p-8 rounded-[32px]">
            <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <ScanLine className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">
              {products.reduce((acc, curr) => acc + curr.scans, 0).toLocaleString()}
            </h3>
            <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Total Scans</p>
          </div>
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 p-6 md:p-8 rounded-[32px]">
            <div className="bg-indigo-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
              <Package className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">{products.length}</h3>
            <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Active Items</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Digitized Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className="bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 p-5 rounded-[28px] flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1 truncate">{p.name}</h4>
                  <p className="text-base font-black text-gray-900 mb-2">₹{p.price}</p>
                  {p.verified && (
                    <div className="inline-flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Verified</span>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl flex flex-col items-center min-w-[70px]">
                  <span className="text-[10px] font-bold uppercase text-gray-400 mb-1">Scans</span>
                  <span className="text-lg font-black text-gray-900">{p.scans}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-50">
                <button 
                  onClick={() => setQrModal(p)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <QrCode className="w-5 h-5" /> Smart Tag
                </button>
                <button 
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-5 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AddProductForm = () => {
    const [formData, setFormData] = useState({
      name: '', artisan: '', region: '', price: '', shortDesc: '', culturalValue: '', economicBenefit: '', category: 'Electronics'
    });
    const [docUploaded, setDocUploaded] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!docUploaded) {
        alert("Please upload verification documents to proceed.");
        return;
      }
      handleAddProduct({
        ...formData,
        price: Number(formData.price),
        verified: true,
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800'
      });
    };

    return (
      <div className="animate-in fade-in duration-500 pb-24 md:pb-12 bg-gray-50 min-h-screen w-full">
        <TopBar title="REGISTER BRAND" showBack onBack={() => setActiveTab('dashboard')} />
        
        <div className="px-5 md:px-10 py-6 md:py-10 max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">Digitize Product</h2>
          <p className="text-gray-600 mb-10 text-base font-medium leading-relaxed">
            Register your product and upload verification documents. Earn the "Verified Indian Brand" badge to build trust.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-10 rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div className="space-y-5">
              <input required type="text" placeholder="Product Name" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-lg" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
                
              <div className="flex flex-col md:flex-row gap-5">
                <input required type="text" placeholder="Company Name" className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-lg"
                  onChange={e => setFormData({...formData, artisan: e.target.value})} />
                <select 
                  className="w-full md:w-64 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-lg"
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  value={formData.category}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="FMCG">FMCG</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <input required type="number" placeholder="Price (₹)" className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-lg"
                  onChange={e => setFormData({...formData, price: e.target.value})} />
                <input required type="text" placeholder="Mfg. State (e.g., Delhi)" className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium text-lg"
                  onChange={e => setFormData({...formData, region: e.target.value})} />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Document Verification
              </h3>
              
              {!docUploaded ? (
                <div 
                  onClick={() => {
                    setTimeout(() => setDocUploaded(true), 800);
                  }}
                  className="w-full bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-[28px] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors active:scale-[0.98] shadow-sm"
                >
                  <Upload className="w-12 h-12 text-blue-500 mb-4" />
                  <span className="text-lg font-bold text-blue-900 mb-1">Tap to select documents</span>
                  <span className="text-sm font-medium text-blue-600/70">GSTIN, Make in India cert (PDF, JPG)</span>
                </div>
              ) : (
                <div className="w-full bg-white border-2 border-blue-200 rounded-[28px] p-6 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900 mb-1">GSTIN_Certificate.pdf</p>
                      <p className="text-sm text-green-600 flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4"/> Verified Ready</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setDocUploaded(false)} className="text-gray-400 hover:text-gray-900 p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Brand Story</h3>
              
              <textarea required rows="3" placeholder="Indian Origin & Vision (e.g., Designed in India, local materials)..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all mb-5 shadow-sm font-medium resize-none text-lg leading-relaxed"
                onChange={e => setFormData({...formData, culturalValue: e.target.value})}></textarea>

              <textarea required rows="2" placeholder="Economic Benefit to Locals..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm font-medium resize-none text-lg leading-relaxed"
                onChange={e => setFormData({...formData, economicBenefit: e.target.value})}></textarea>
            </div>

            <button type="submit" className={`w-full py-5 rounded-full font-bold mt-4 transition-all flex items-center justify-center gap-2 text-xl ${docUploaded ? 'bg-black text-white shadow-xl hover:scale-[1.02] active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              <QrCode className="w-6 h-6" /> Generate Digital ID
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ProfileSettings = () => (
    <div className="animate-in fade-in duration-500 pb-24 md:pb-12 bg-gray-50 min-h-screen w-full">
      <TopBar title="SETTINGS" />
      <div className="px-5 md:px-10 py-6 md:py-10 max-w-3xl mx-auto w-full">
        
        {/* USER PROFILE HEADER */}
        <div className="flex items-center gap-5 mb-8 bg-white p-6 md:p-8 rounded-[32px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm relative">
            <User className="w-10 h-10 text-gray-400" />
            <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Anjali Sharma</h2>
            <p className="text-base font-bold text-blue-600 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4"/> Vocal for Local Champion</p>
          </div>
        </div>

        {/* NEW: ECONOMIC IMPACT DASHBOARD */}
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 rounded-[40px] p-8 md:p-10 text-white mb-10 shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Globe2 className="w-64 h-64 -mt-10 -mr-10" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-200" />
              <p className="text-sm font-bold uppercase tracking-widest text-blue-100">Your Economic Impact</p>
            </div>
            
            <p className="text-sm text-blue-200 font-bold mb-1">Total Spent on Indian Brands</p>
            <h3 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">₹42,500</h3>
            
            <div className="flex gap-4">
              <div className="bg-white/10 p-5 rounded-[24px] flex-1 backdrop-blur-md border border-white/20">
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-blue-100 mb-1.5 leading-tight">Brands Backed</p>
                <p className="text-3xl md:text-4xl font-black">14</p>
              </div>
              <div className="bg-white/10 p-5 rounded-[24px] flex-1 backdrop-blur-md border border-white/20">
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-blue-100 mb-1.5 leading-tight">States Supported</p>
                <p className="text-3xl md:text-4xl font-black">6</p>
              </div>
            </div>
          </div>
        </div>

        {/* APP CONTROLS */}
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 px-2">App Controls</h3>
        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="px-6 md:px-8 py-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div>
              <p className="font-bold text-gray-900 text-lg mb-1">Interface Mode</p>
              <p className="text-sm font-medium text-gray-500">Toggle between Consumer & Owner views</p>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-1.5 flex shadow-inner w-full md:w-auto">
              <button 
                onClick={() => { setRole('consumer'); setActiveTab('home'); }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'consumer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Consumer
              </button>
              <button 
                onClick={() => { setRole('owner'); setActiveTab('dashboard'); }}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${role === 'owner' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Owner
              </button>
            </div>
          </div>
          <div className="px-6 md:px-8 py-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
            <p className="font-bold text-gray-900 text-lg">About Lokriti Platform</p>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans antialiased selection:bg-blue-500/30 selection:text-blue-900">
      
      {/* Desktop Sidebar */}
      <DesktopSideNav />

      {/* Main Content Area */}
      <div className="w-full bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col flex-1">
        
        <main className="h-full overflow-y-auto hide-scrollbar flex-1">
          {role === 'consumer' && activeTab === 'home' && <ConsumerHome />}
          {role === 'consumer' && activeTab === 'cart' && <CartView />}
          {role === 'consumer' && activeTab === 'profile' && <ProfileSettings />}
          {role === 'owner' && activeTab === 'dashboard' && <OwnerDashboard />}
          {role === 'owner' && activeTab === 'add' && <AddProductForm />}
          {role === 'owner' && activeTab === 'profile' && <ProfileSettings />}
        </main>

        <ProductDetail />
        <BottomNav />

        {/* CHECKOUT SUCCESS MODAL */}
        {checkoutSuccess && (
          <div className="fixed inset-0 z-[150] w-full flex items-center justify-center bg-blue-600/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="bg-blue-600 w-full max-w-lg mx-auto flex flex-col items-center justify-center p-10 md:rounded-[40px] md:shadow-2xl animate-in zoom-in-95 duration-500 min-h-[400px]">
              <div className="bg-white/20 p-6 rounded-full mb-8 shadow-inner animate-bounce">
                <CheckCircle2 className="w-24 h-24 text-white" />
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white mb-3 text-center leading-tight">Order Confirmed!</h2>
              <p className="text-blue-100 text-center font-medium text-xl mb-10 leading-relaxed">
                Thank you for supporting verified Indian brands and boosting the local economy.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-full">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                  <span className="text-blue-100 font-medium text-lg">Order ID</span>
                  <span className="text-white font-bold font-mono text-lg">#IND-84291</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100 font-medium text-lg">Impact</span>
                  <span className="text-white font-bold flex items-center gap-1.5 text-lg"><Sparkles className="w-5 h-5"/> +1 Local Brand</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCANNING OVERLAY */}
        {isScanning && (
          <div className="fixed inset-0 z-[100] w-full flex flex-col items-center justify-center bg-white/90 backdrop-blur-2xl animate-in fade-in duration-300">
            <div className="relative w-72 h-72 mb-10">
              <div className="absolute inset-0 border-2 border-gray-100 rounded-[48px] shadow-[0_0_50px_rgba(0,0,0,0.05)] bg-white/50"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-600 rounded-tl-[48px]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-600 rounded-tr-[48px]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-600 rounded-bl-[48px]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-600 rounded-br-[48px]"></div>
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-blue-500 shadow-[0_0_30px_8px_rgba(59,130,246,0.5)] animate-[scan_1.5s_ease-in-out_infinite] rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-50 p-8 rounded-full animate-pulse">
                  <Camera className="w-16 h-16 text-blue-600" />
                </div>
              </div>
            </div>
            <h2 className="text-gray-900 text-3xl font-black tracking-tight mb-4">Authenticating</h2>
            <p className="text-gray-500 text-center max-w-[300px] text-base font-semibold leading-relaxed">Querying verification documents and origin data from the physical product...</p>
          </div>
        )}

        {/* CERTIFICATE MODAL */}
        {showCertModal && (
          <div className="fixed inset-0 z-[120] w-full flex flex-col items-center justify-end md:justify-center bg-gray-900/60 backdrop-blur-md p-5 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-[32px] md:rounded-[40px] w-full max-w-[420px] p-6 md:p-8 relative flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden text-gray-900 transform transition-transform animate-in slide-in-from-bottom-10 md:zoom-in-95">
              
              <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
                <ShieldCheck className="w-72 h-72 -mt-10 -mr-10" />
              </div>
              
              <button onClick={() => setShowCertModal(null)} className="absolute top-6 right-6 bg-gray-100 text-gray-500 hover:text-gray-900 p-2.5 rounded-full active:scale-95 transition-all z-10">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-gray-900 leading-none">Verified Origin</h3>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1.5">Lokriti Platform</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-1 font-semibold relative z-10">Brand / Manufacturer</p>
              <h4 className="text-[28px] font-black text-gray-900 mb-8 leading-tight tracking-tight relative z-10">{showCertModal.artisan}</h4>
              
              <div className="bg-white border border-gray-100 rounded-3xl p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative z-10">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Registered Product</p>
                <p className="text-xl font-bold text-gray-900 mb-6 leading-tight">{showCertModal.name}</p>
                
                <div className="h-px bg-gray-100 w-full mb-5"></div>

                <div className="grid grid-cols-2 gap-y-5 text-sm">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Region</span>
                    <span className="font-bold text-gray-900 text-base">{showCertModal.region}</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">Govt. GSTIN</span>
                    <span className="font-mono font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 text-sm">
                      27AABCB{Math.floor(Math.random()*900)+100}Q1Z
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-green-50 rounded-2xl p-5 border border-green-100/50 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 rounded-full p-1.5 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-green-700 text-base tracking-wide">Documents Verified</span>
                </div>
                <div className="text-[10px] text-green-600/70 font-bold uppercase tracking-widest text-right leading-tight">
                  Make In<br/>India
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OWNER QR GENERATOR MODAL */}
        {qrModal && (
          <div className="fixed inset-0 z-[110] w-full flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-md p-6 animate-in fade-in duration-200">
            <div className="bg-white border border-gray-100 rounded-[40px] w-full max-w-[400px] p-10 relative flex flex-col items-center shadow-2xl animate-in zoom-in-95">
              <button 
                onClick={() => setQrModal(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 rounded-full p-2.5"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-3 text-center">{qrModal.name}</h3>
              <p className="text-gray-500 text-base mb-10 text-center font-medium leading-relaxed">Print this Smart Tag and attach it to your physical product packaging.</p>
              
              <div className="bg-white p-6 rounded-[40px] mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 relative group">
                <div className="w-64 h-64 bg-white flex flex-wrap gap-1.5 p-3 rounded-3xl overflow-hidden relative">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className={`w-[20px] h-[20px] ${Math.random() > 0.4 ? 'bg-black rounded-sm' : 'bg-transparent'} transition-all duration-500`}></div>
                  ))}
                  {/* Central branding */}
                  <div className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-black group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setQrModal(null)}
                className="w-full bg-blue-600 text-white py-5 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_8px_20px_rgba(37,99,235,0.25)] text-xl"
              >
                <Download className="w-6 h-6" /> Save Tag
              </button>
            </div>
          </div>
        )}

        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(280px); opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}
