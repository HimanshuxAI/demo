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
  X
} from 'lucide-react';

// --- MOCK DATA ---
const initialProducts = [
  {
    id: 'p1',
    name: 'Jaipur Blue Pottery Vase',
    artisan: 'Ram Singh & Family',
    region: 'Rajasthan',
    category: 'Pottery',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Handcrafted floral vase using traditional Turko-Persian techniques.',
    culturalValue: 'Blue Pottery is widely recognized as a traditional craft of Jaipur. It does not use clay, but a dough prepared by mixing quartz stone powder, powdered glass, Multani Mitti, borax, gum and water.',
    economicBenefit: 'Supports 3 generations of artisans and preserves a 300-year-old technique against mass-produced ceramics.',
    scans: 142
  },
  {
    id: 'p2',
    name: 'Channapatna Wooden Train',
    artisan: 'Gowda Toymakers Coop',
    region: 'Karnataka',
    category: 'Toys',
    price: 850,
    image: 'https://images.unsplash.com/photo-1515488042161-246eb526cfad?auto=format&fit=crop&q=80&w=800', // FIXED: Highly reliable wooden train image
    shortDesc: 'Eco-friendly wooden toys colored with natural vegetable dyes.',
    culturalValue: 'Originating from the reign of Tipu Sultan, these toys are made of ivory-wood and coated with natural lac. Completely non-toxic.',
    economicBenefit: 'Empowers local craftsmen in the toy-town of Karnataka, promoting sustainable toy manufacturing over imported plastics.',
    scans: 89
  },
  {
    id: 'p3',
    name: 'Kanjeevaram Silk Stole',
    artisan: 'Srikanth Weavers',
    region: 'Tamil Nadu',
    category: 'Textiles',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800', // FIXED: Restored to beautiful Indian silk fabric
    shortDesc: 'Authentic pure mulberry silk stole with Zari work.',
    culturalValue: 'Woven from pure mulberry silk thread. The pure gold and silver zari comes from Gujarat. This art form dates back to the Chola Dynasty.',
    economicBenefit: 'Directly benefits the handloom weavers of Kanchipuram, ensuring fair wages and keeping the ancient loom alive.',
    scans: 256
  },
  {
    id: 'p4',
    name: 'Madhubani Canvas Art',
    artisan: 'Devi Art Collective',
    region: 'Bihar',
    category: 'Art',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800', // FIXED: Restored to reliable geometric art
    shortDesc: 'Intricate geometric patterns telling ancient mythological stories.',
    culturalValue: 'Also known as Mithila art, characterized by eye-catching geometrical patterns. Traditionally created by women using natural dyes and pigments from plants.',
    economicBenefit: 'Empowers rural women artists in Bihar, providing them with financial independence and global recognition over mass-printed wall art.',
    scans: 312
  },
  {
    id: 'p5',
    name: 'Dhokra Tribal Necklace',
    artisan: 'Bastar Craftsmen',
    region: 'Chhattisgarh',
    category: 'Jewelry',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1599643478524-fb5244cae3dc?auto=format&fit=crop&q=80&w=800', // FIXED: Restored to reliable tribal jewelry
    shortDesc: 'Handcrafted using the ancient lost-wax metal casting technique.',
    culturalValue: 'Dhokra is non-ferrous metal casting using the lost-wax casting technique. This sort of metal casting has been used in India for over 4,000 years.',
    economicBenefit: 'Sustains indigenous tribal (Adivasi) communities and preserves one of the oldest known metal casting methods in the world.',
    scans: 178
  },
  {
    id: 'p6',
    name: 'Handwoven Pashmina Shawl',
    artisan: 'Valley Weavers Association',
    region: 'Kashmir',
    category: 'Textiles',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Ultra-soft, luxurious shawl woven from fine Cashmere wool.',
    culturalValue: 'Spun from the fine downy undercoat of the Changthangi goat. The traditional making of Pashmina is a highly labor-intensive process, involving spinning and weaving entirely by hand.',
    economicBenefit: 'Provides crucial winter income for artisans in the Himalayan region and ensures fair trade practices for the nomadic herders.',
    scans: 405
  }
];

export default function LokritiApp() {
  const [role, setRole] = useState('consumer'); // 'consumer' | 'owner'
  const [activeTab, setActiveTab] = useState('home'); // home, scan, profile (consumer) | dashboard, add, profile (owner)
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // --- NEW FUNCTIONALITY STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [qrModal, setQrModal] = useState(null); // Stores product to show QR for

  // --- HANDLERS ---
  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setSelectedProduct(randomProduct);
    }, 2500);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([{ ...newProduct, id: `p${Date.now()}`, scans: 0 }, ...products]);
    setActiveTab('dashboard');
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent opening product detail when tapping heart
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const categories = ['All', 'Pottery', 'Toys', 'Textiles', 'Jewelry', 'Art'];

  // --- UI COMPONENTS ---

  const BottomNav = () => {
    if (selectedProduct || isScanning) return null; // Hide nav on detail/scan views

    return (
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-40 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center px-6 py-4">
          {role === 'consumer' ? (
            <>
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'} transition-colors`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Home</span>
              </button>
              
              <button onClick={handleScanSimulation} className="relative -top-5">
                <div className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                  <ScanLine className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'} transition-colors`}>
                <Settings className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Settings</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'} transition-colors`}>
                <LayoutDashboard className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Dashboard</span>
              </button>
              
              <button onClick={() => setActiveTab('add')} className="relative -top-5">
                <div className="bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
                  <Plus className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'} transition-colors`}>
                <Settings className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Settings</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const TopBar = ({ title, showBack, onBack }) => (
    <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between">
      {showBack ? (
        <button onClick={onBack} className="text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-9" /> // Spacer
      )}
      <h1 className="text-lg font-semibold tracking-tight text-white">{title || 'LOKRITI'}</h1>
      <div className="w-9" /> {/* Spacer */}
    </div>
  );

  // --- VIEWS ---

  const ConsumerHome = () => {
    // Filter logic
    const filteredProducts = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.region.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.artisan.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="animate-in fade-in duration-500 pb-24">
        <TopBar title="LOKRITI" />
        
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Discover<br/><span className="text-zinc-400">Indian Heritage</span></h2>
          
          <div className="mt-6 mb-4 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search indigenous crafts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 font-medium">No crafts found for your search.</div>
          ) : (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="relative h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-medium text-white tracking-wide">{product.region}</span>
                  </div>

                  <button 
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 p-2 rounded-full transition-colors active:scale-90"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{product.name}</h3>
                    <p className="text-sm text-zinc-300 mb-2 font-medium">By {product.artisan}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">₹{product.price}</span>
                      <div className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold">
                        View Story
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const ProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-50 w-full max-w-md mx-auto bg-black overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="relative h-[50vh]">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          
          <button 
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 left-4 bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="absolute top-6 right-4 flex items-center gap-2">
            <button 
              onClick={(e) => toggleFavorite(e, selectedProduct.id)}
              className="bg-black/50 backdrop-blur-md border border-white/10 p-3 rounded-full hover:bg-black/70 transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
          </div>
        </div>

        <div className="px-6 py-8 relative -mt-8 bg-black rounded-t-[2.5rem] min-h-[60vh]">
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8" />
          
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 leading-tight">{selectedProduct.name}</h1>
          <p className="text-zinc-400 font-medium mb-8 flex items-center gap-2">
            Crafted by <span className="text-white font-semibold">{selectedProduct.artisan}</span>
          </p>

          <div className="space-y-4">
            {/* Grok-style Data Modules */}
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-semibold text-white tracking-tight">Cultural Heritage</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{selectedProduct.culturalValue}</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-white tracking-tight">Economic Impact</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{selectedProduct.economicBenefit}</p>
            </div>
          </div>

          <div className="mt-10 mb-8 border-t border-white/10 pt-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-zinc-500 mb-1">Authentic Price</p>
              <span className="text-3xl font-bold text-white">₹{selectedProduct.price}</span>
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-transform">
              Support Origin
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OwnerDashboard = () => (
    <div className="animate-in fade-in duration-500 pb-24">
      <TopBar title="DASHBOARD" />
      
      <div className="px-4 pt-6 pb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">Performance</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-zinc-900 border border-white/5 p-5 rounded-3xl">
            <ScanLine className="w-6 h-6 text-zinc-400 mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">
              {products.reduce((acc, curr) => acc + curr.scans, 0)}
            </h3>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Scans</p>
          </div>
          <div className="bg-zinc-900 border border-white/5 p-5 rounded-3xl">
            <Package className="w-6 h-6 text-zinc-400 mb-4" />
            <h3 className="text-3xl font-bold text-white mb-1">{products.length}</h3>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Active Crafts</p>
          </div>
        </div>

        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white">Your Digitized Crafts</h2>
        </div>

        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="bg-zinc-900 border border-white/5 p-3 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{p.name}</h4>
                  <p className="text-xs text-zinc-400">₹{p.price}</p>
                </div>
                <div className="bg-black border border-white/10 px-3 py-1.5 rounded-lg flex flex-col items-center">
                  <span className="text-xs text-zinc-500">Scans</span>
                  <span className="text-sm font-bold text-white">{p.scans}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button 
                  onClick={() => setQrModal(p)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <QrCode className="w-4 h-4" /> Get Smart Tag
                </button>
                <button 
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
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
      name: '', artisan: '', region: '', price: '', shortDesc: '', culturalValue: '', economicBenefit: '', category: 'Pottery'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddProduct({
        ...formData,
        price: Number(formData.price),
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800'
      });
    };

    return (
      <div className="animate-in fade-in duration-500 pb-24">
        <TopBar title="DIGITIZE CRAFT" showBack onBack={() => setActiveTab('dashboard')} />
        
        <div className="px-4 py-6">
          <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
            Register a physical product to generate a smart tag. This bridges the gap, allowing consumers to scan and learn the authentic story.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <input required type="text" placeholder="Product Name" className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
                
              <div className="flex gap-4">
                <input required type="number" placeholder="Price (₹)" className="w-1/2 bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  onChange={e => setFormData({...formData, price: e.target.value})} />
                <input required type="text" placeholder="Region" className="w-1/2 bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  onChange={e => setFormData({...formData, region: e.target.value})} />
              </div>

              <div className="flex gap-4">
                <input required type="text" placeholder="Artisan Name" className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                  onChange={e => setFormData({...formData, artisan: e.target.value})} />
                <select 
                  className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  value={formData.category}
                >
                  <option value="Pottery">Pottery</option>
                  <option value="Toys">Toys</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Art">Art</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">The Story (pS Focus)</h3>
              
              <textarea required rows="3" placeholder="Cultural Heritage & Technique..." className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors mb-4"
                onChange={e => setFormData({...formData, culturalValue: e.target.value})}></textarea>

              <textarea required rows="2" placeholder="Economic Benefit to Locals..." className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                onChange={e => setFormData({...formData, economicBenefit: e.target.value})}></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black py-4 rounded-full font-bold mt-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 transition-transform flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" /> Generate Digital ID
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ProfileSettings = () => (
    <div className="animate-in fade-in duration-500 pb-24">
      <TopBar title="SETTINGS" />
      <div className="px-4 py-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10">
            <User className="w-8 h-8 text-zinc-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Guest User</h2>
            <p className="text-sm text-zinc-500">App Prototype Mode</p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">App Role</p>
              <p className="text-xs text-zinc-500 mt-0.5">Toggle between interfaces</p>
            </div>
            <div className="bg-black border border-white/10 rounded-lg p-1 flex">
              <button 
                onClick={() => { setRole('consumer'); setActiveTab('home'); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${role === 'consumer' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                Consumer
              </button>
              <button 
                onClick={() => { setRole('owner'); setActiveTab('dashboard'); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${role === 'owner' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
              >
                Owner
              </button>
            </div>
          </div>
          <div className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
            <p className="font-medium text-white">About Lokriti</p>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center font-sans antialiased selection:bg-white selection:text-black">
      {/* Mobile constraint wrapper for desktop viewing */}
      <div className="w-full max-w-md bg-black min-h-screen relative shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Main Content Area */}
        <main className="h-full overflow-y-auto hide-scrollbar">
          {role === 'consumer' && activeTab === 'home' && <ConsumerHome />}
          {role === 'consumer' && activeTab === 'profile' && <ProfileSettings />}
          {role === 'owner' && activeTab === 'dashboard' && <OwnerDashboard />}
          {role === 'owner' && activeTab === 'add' && <AddProductForm />}
          {role === 'owner' && activeTab === 'profile' && <ProfileSettings />}
        </main>

        <ProductDetail />
        <BottomNav />

        {/* SCANNING OVERLAY (Apple FaceID / Futuristic Vibe) */}
        {isScanning && (
          <div className="fixed inset-0 z-[100] max-w-md mx-auto bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="relative w-64 h-64 mb-10">
              {/* Outer glowing ring */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.1)]"></div>
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[3rem]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[3rem]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[3rem]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[3rem]"></div>
              
              {/* Scanning Laser */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.8)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                <Camera className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-white text-2xl font-bold tracking-tight mb-3">Authenticating Craft</h2>
            <p className="text-zinc-500 text-center max-w-xs text-sm">Extracting heritage data and artisan identity directly from the physical object...</p>
          </div>
        )}

        {/* OWNER QR GENERATOR MODAL */}
        {qrModal && (
          <div className="fixed inset-0 z-[110] max-w-md mx-auto bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] w-full p-8 relative flex flex-col items-center shadow-2xl">
              <button 
                onClick={() => setQrModal(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors bg-black/50 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-2 text-center">{qrModal.name}</h3>
              <p className="text-zinc-400 text-sm mb-6 text-center">Print this Smart Tag and attach it to your physical product.</p>
              
              <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative">
                {/* Simulated QR Code visual */}
                <div className="w-48 h-48 bg-zinc-100 flex flex-wrap gap-1 p-2 rounded-2xl overflow-hidden relative">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-[20px] h-[20px] ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'} rounded-[2px]`}></div>
                  ))}
                  {/* Central branding for QR code */}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border-[3px] border-black">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setQrModal(null)}
                className="w-full bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Download className="w-5 h-5" /> Download Smart Tag
              </button>
            </div>
          </div>
        )}

        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes scan {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(256px); opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
}