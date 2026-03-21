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
  CheckCircle2
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
    reviews: 12450
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
    reviews: 8920
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
    reviews: 312
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
    reviews: 1840
  }
];

export default function LokritiApp() {
  const [role, setRole] = useState('consumer'); // 'consumer' | 'owner'
  const [activeTab, setActiveTab] = useState('home'); // home, scan, profile, cart
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // --- NEW FUNCTIONALITY STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [qrModal, setQrModal] = useState(null); 
  const [cart, setCart] = useState([]);
  const [showCertModal, setShowCertModal] = useState(null); 

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

  const categories = ['All', 'Electronics', 'Beauty', 'Apparel', 'Handicrafts', 'FMCG'];

  // --- UI COMPONENTS ---

  const BottomNav = () => {
    if (selectedProduct || isScanning || activeTab === 'cart') return null; 

    return (
      <div className="fixed bottom-0 w-full max-w-md mx-auto z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe">
        <div className="flex justify-around items-center px-6 py-4">
          {role === 'consumer' ? (
            <>
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Home</span>
              </button>
              
              <button onClick={handleScanSimulation} className="relative -top-5">
                <div className="bg-black text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform border border-gray-800">
                  <ScanLine className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                <Settings className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Settings</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                <LayoutDashboard className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Dashboard</span>
              </button>
              
              <button onClick={() => setActiveTab('add')} className="relative -top-5">
                <div className="bg-black text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform border border-gray-800">
                  <Plus className="w-7 h-7" />
                </div>
              </button>

              <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                <Settings className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wide">Settings</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const TopBar = ({ title, showBack, onBack, showCart }) => (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 py-4 flex items-center justify-between">
      {showBack ? (
        <button onClick={onBack} className="text-gray-900 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-9" /> 
      )}
      
      <h1 className="text-lg font-bold tracking-tight text-gray-900">{title || 'LOKRITI'}</h1>
      
      {showCart && role === 'consumer' ? (
        <button onClick={() => setActiveTab('cart')} className="relative text-gray-900 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cart.length}
            </span>
          )}
        </button>
      ) : (
        <div className="w-9" /> 
      )}
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
      <div className="animate-in fade-in duration-500 pb-24">
        <TopBar title="LOKRITI" showCart={true} />
        
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Discover<br/><span className="text-gray-500">Verified Indian Brands</span></h2>
          
          <div className="mt-6 mb-4 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search brands, products & crafts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-4 pt-1">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border shadow-sm ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">No brands found for your search.</div>
          ) : (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden active:scale-[0.98] transition-transform cursor-pointer shadow-sm"
              >
                <div className="relative h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {/* Keep dark gradient on image so white text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white tracking-wide">{product.region}</span>
                  </div>

                  {product.verified && (
                    <div className="absolute top-4 left-28 bg-blue-500/90 backdrop-blur-md border border-white/20 px-2 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-white" />
                    </div>
                  )}

                  <button 
                    onClick={(e) => toggleFavorite(e, product.id)}
                    className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-full transition-colors active:scale-90"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{product.name}</h3>
                    <p className="text-sm text-gray-200 mb-2 font-medium">By {product.artisan}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">₹{product.price}</span>
                      <div className="flex items-center gap-1 text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{product.rating}</span>
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

  const CartView = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
      <div className="animate-in fade-in duration-300 pb-24 h-full flex flex-col bg-gray-50">
        <TopBar title="YOUR CART" showBack onBack={() => setActiveTab('home')} />
        
        <div className="px-4 pt-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium text-lg text-gray-900">Your cart is empty</p>
              <p className="text-sm mt-1">Discover Indian brands to support.</p>
              <button 
                onClick={() => setActiveTab('home')}
                className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold border border-gray-200 shadow-sm"
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover border border-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.artisan}</p>
                    <span className="text-sm font-semibold text-gray-900">₹{item.price}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-200 p-6 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total ({cart.length} items)</span>
              <span className="text-2xl font-bold text-gray-900">₹{total}</span>
            </div>
            <button 
              className="w-full bg-black text-white py-4 rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
              onClick={() => {
                alert("Checkout successful! Thank you for supporting Indian brands.");
                setCart([]);
                setActiveTab('home');
              }}
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
      <div className="fixed inset-0 z-50 w-full max-w-md mx-auto bg-gray-50 overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="relative h-[50vh]">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-50" />
          
          <button 
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 left-4 bg-black/30 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="absolute top-6 right-4 flex items-center gap-2">
            <button 
              onClick={(e) => toggleFavorite(e, selectedProduct.id)}
              className="bg-black/30 backdrop-blur-md border border-white/20 p-3 rounded-full hover:bg-black/50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
          </div>
        </div>

        <div className="px-6 py-8 relative -mt-8 bg-gray-50 rounded-t-[2.5rem] min-h-[60vh] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-24">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">{selectedProduct.name}</h1>
          
          <div className="flex items-center gap-4 mb-5">
            {selectedProduct.verified && (
              <button 
                onClick={() => setShowCertModal(selectedProduct)}
                className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" /> Govt. Verified Origin
              </button>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-gray-900">{selectedProduct.rating}</span>
              <span className="text-xs text-gray-500">({selectedProduct.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 font-medium mb-8 flex items-center gap-2">
            By <span className="text-gray-900 font-semibold">{selectedProduct.artisan}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3"/>{selectedProduct.region}</span>
          </p>

          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-semibold text-gray-900 tracking-tight">Cultural Heritage</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct.culturalValue}</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-gray-900 tracking-tight">Economic Impact</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct.economicBenefit}</p>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 pb-safe flex justify-between items-center z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Authentic Price</p>
              <span className="text-2xl font-bold text-gray-900">₹{selectedProduct.price}</span>
            </div>
            <button 
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null); 
              }}
              className="bg-black text-white px-8 py-3.5 rounded-full font-bold shadow-lg active:scale-95 transition-transform flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OwnerDashboard = () => (
    <div className="animate-in fade-in duration-500 pb-24 bg-gray-50 min-h-screen">
      <TopBar title="DASHBOARD" />
      
      <div className="px-4 pt-6 pb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Performance</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border border-gray-100 shadow-sm p-5 rounded-3xl">
            <ScanLine className="w-6 h-6 text-blue-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {products.reduce((acc, curr) => acc + curr.scans, 0).toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Scans</p>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm p-5 rounded-3xl">
            <Package className="w-6 h-6 text-purple-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{products.length}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Products</p>
          </div>
        </div>

        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Your Digitized Products</h2>
        </div>

        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs font-medium text-gray-500">₹{p.price}</p>
                    {p.verified && <ShieldCheck className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Scans</span>
                  <span className="text-sm font-bold text-gray-900">{p.scans}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button 
                  onClick={() => setQrModal(p)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <QrCode className="w-4 h-4" /> Get Smart Tag
                </button>
                <button 
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 rounded-lg flex items-center justify-center transition-colors border border-red-100"
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
      <div className="animate-in fade-in duration-500 pb-24 bg-gray-50 min-h-screen">
        <TopBar title="REGISTER BRAND" showBack onBack={() => setActiveTab('dashboard')} />
        
        <div className="px-4 py-6">
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            Register your product and upload verification documents. Earn the "Verified Indian Brand" badge to build trust with consumers.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <input required type="text" placeholder="Product Name" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm" 
                onChange={e => setFormData({...formData, name: e.target.value})} />
                
              <div className="flex gap-4">
                <input required type="text" placeholder="Company Name" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  onChange={e => setFormData({...formData, artisan: e.target.value})} />
                <select 
                  className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  value={formData.category}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Handicrafts">Handicrafts</option>
                  <option value="FMCG">FMCG</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-4">
                <input required type="number" placeholder="Price (₹)" className="w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  onChange={e => setFormData({...formData, price: e.target.value})} />
                <input required type="text" placeholder="Mfg. State" className="w-1/2 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                  onChange={e => setFormData({...formData, region: e.target.value})} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Document Verification
              </h3>
              <p className="text-xs text-gray-500 mb-4">Upload GSTIN, Company Registration, or "Make in India" certificate to verify origin.</p>
              
              {!docUploaded ? (
                <div 
                  onClick={() => {
                    setTimeout(() => setDocUploaded(true), 800);
                  }}
                  className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-colors mb-6 active:scale-95 shadow-sm"
                >
                  <Upload className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="text-sm font-bold text-gray-900 mb-1">Tap to select documents</span>
                  <span className="text-xs text-gray-500">PDF, JPG up to 5MB</span>
                </div>
              ) : (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between mb-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">GSTIN_Certificate.pdf</p>
                      <p className="text-xs text-blue-600 flex items-center gap-1 font-medium"><CheckCircle2 className="w-3 h-3"/> Ready for Review</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setDocUploaded(false)} className="text-gray-400 hover:text-gray-900 p-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Brand Story</h3>
              
              <textarea required rows="3" placeholder="Indian Origin & Vision (e.g., Designed in India, local ingredients)..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors mb-4 shadow-sm"
                onChange={e => setFormData({...formData, culturalValue: e.target.value})}></textarea>

              <textarea required rows="2" placeholder="Economic Benefit to Locals..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors shadow-sm"
                onChange={e => setFormData({...formData, economicBenefit: e.target.value})}></textarea>
            </div>

            <button type="submit" className={`w-full py-4 rounded-full font-bold mt-6 active:scale-95 transition-all flex items-center justify-center gap-2 ${docUploaded ? 'bg-black text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
              <QrCode className="w-5 h-5" /> Generate Digital ID
            </button>
          </form>
        </div>
      </div>
    );
  };

  const ProfileSettings = () => (
    <div className="animate-in fade-in duration-500 pb-24 bg-gray-50 min-h-screen">
      <TopBar title="SETTINGS" />
      <div className="px-4 py-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Guest User</h2>
            <p className="text-sm text-gray-500">App Prototype Mode</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">App Role</p>
              <p className="text-xs text-gray-500 mt-0.5">Toggle between interfaces</p>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-1 flex">
              <button 
                onClick={() => { setRole('consumer'); setActiveTab('home'); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${role === 'consumer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Consumer
              </button>
              <button 
                onClick={() => { setRole('owner'); setActiveTab('dashboard'); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${role === 'owner' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Owner
              </button>
            </div>
          </div>
          <div className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
            <p className="font-medium text-gray-900">About Lokriti</p>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-sans antialiased selection:bg-black selection:text-white">
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden ring-1 ring-gray-900/5">
        
        {/* Main Content Area */}
        <main className="h-full overflow-y-auto hide-scrollbar">
          {role === 'consumer' && activeTab === 'home' && <ConsumerHome />}
          {role === 'consumer' && activeTab === 'cart' && <CartView />}
          {role === 'consumer' && activeTab === 'profile' && <ProfileSettings />}
          {role === 'owner' && activeTab === 'dashboard' && <OwnerDashboard />}
          {role === 'owner' && activeTab === 'add' && <AddProductForm />}
          {role === 'owner' && activeTab === 'profile' && <ProfileSettings />}
        </main>

        <ProductDetail />
        <BottomNav />

        {/* SCANNING OVERLAY */}
        {isScanning && (
          <div className="fixed inset-0 z-[100] max-w-md mx-auto bg-white/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="relative w-64 h-64 mb-10">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.05)]"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gray-900 rounded-tl-[3rem]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gray-900 rounded-tr-[3rem]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gray-900 rounded-bl-[3rem]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gray-900 rounded-br-[3rem]"></div>
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-500 shadow-[0_0_20px_5px_rgba(59,130,246,0.4)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-500/80">
                <Camera className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <h2 className="text-gray-900 text-2xl font-bold tracking-tight mb-3">Authenticating Brand</h2>
            <p className="text-gray-500 text-center max-w-xs text-sm font-medium">Querying verification documents and origin data directly from the physical product...</p>
          </div>
        )}

        {/* CERTIFICATE MODAL */}
        {showCertModal && (
          <div className="fixed inset-0 z-[120] max-w-md mx-auto bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg w-full p-1 relative flex flex-col shadow-2xl overflow-hidden text-slate-900">
              <div className="border-4 border-double border-slate-300 p-6 flex flex-col items-center h-full text-center relative bg-white">
                
                <button onClick={() => setShowCertModal(null)} className="absolute top-2 right-2 text-slate-400 hover:text-slate-900 p-1">
                  <X className="w-5 h-5" />
                </button>

                <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
                
                <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 mb-1 border-b-2 border-slate-200 pb-2 w-full">Certificate of Origin</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-bold">Lokriti Verification Platform</p>
                
                <p className="text-sm text-slate-600 mb-2 font-medium">This is to certify that the brand</p>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{showCertModal.artisan}</h4>
                <p className="text-sm text-slate-600 mb-6 font-medium">has successfully cleared document verification and is a recognized Indian entity manufacturing the product:</p>
                
                <p className="text-lg font-bold text-slate-800 mb-8 italic">"{showCertModal.name}"</p>

                <div className="w-full bg-slate-50 border border-slate-200 p-4 rounded-md text-left mb-6">
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <span className="text-slate-500 font-medium">Reg. Region:</span>
                    <span className="font-bold text-slate-800 text-right">{showCertModal.region}</span>
                    <span className="text-slate-500 font-medium">Govt. GSTIN:</span>
                    <span className="font-mono font-bold text-slate-800 text-right">27AABCB{Math.floor(Math.random()*9000)+1000}Q1Z{Math.floor(Math.random()*9)}</span>
                    <span className="text-slate-500 font-medium">Status:</span>
                    <span className="font-bold text-green-600 text-right flex items-center justify-end gap-1"><CheckCircle2 className="w-4 h-4"/> VERIFIED</span>
                  </div>
                </div>

                <div className="mt-auto w-full flex justify-between items-end px-4">
                  <div className="text-left">
                    <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center opacity-80 transform -rotate-12">
                      <span className="text-red-500 text-[8px] font-black uppercase text-center leading-tight">Authentic<br/>Indian<br/>Brand</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-24 border-b border-slate-400 mb-1"></div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lokriti Authority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OWNER QR GENERATOR MODAL */}
        {qrModal && (
          <div className="fixed inset-0 z-[110] max-w-md mx-auto bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white border border-gray-200 rounded-[2rem] w-full p-8 relative flex flex-col items-center shadow-2xl">
              <button 
                onClick={() => setQrModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{qrModal.name}</h3>
              <p className="text-gray-500 text-sm mb-6 text-center">Print this Smart Tag and attach it to your physical product.</p>
              
              <div className="bg-gray-50 p-4 rounded-3xl mb-6 border border-gray-100 relative">
                <div className="w-48 h-48 bg-white flex flex-wrap gap-1 p-2 rounded-2xl overflow-hidden relative shadow-sm">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`w-[20px] h-[20px] ${Math.random() > 0.4 ? 'bg-black' : 'bg-transparent'} rounded-[2px]`}></div>
                  ))}
                  <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border-[3px] border-black">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setQrModal(null)}
                className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
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
