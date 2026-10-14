"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Grid, Bookmark, MapPin, Link as LinkIcon, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  date: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    imageUrl: '/images/clinical-cases/발치후즉시식립_상악전치/1.jpg',
    likes: 342,
    comments: 18,
    caption: 'Another beautiful smile restored! ✨ We loved having our wonderful patient from Tokyo visit us today. 🇯🇵💖\n\n#WhiteStyleDental #SmileMakeover #Dentist',
    date: '2 DAYS AGO'
  },
  {
    id: '2',
    imageUrl: '/images/clinical-cases/발치후즉시식립_대구치/파노라마.jpg',
    likes: 521,
    comments: 24,
    caption: 'Welcome to White Style Dental Clinic. We designed our waiting area to feel like a premium spa, ensuring you feel relaxed before your treatment. 🌿🦷',
    date: '5 DAYS AGO'
  },
  {
    id: '3',
    imageUrl: '/images/clinical-cases/발치후즉시식립_대구치/하악우측.jpg',
    likes: 893,
    comments: 45,
    caption: 'Thank you so much to our lovely patient for bringing us these delicious matcha sweets from Japan! お土産ありがとうございます！🍡🍵 We have the best patients!',
    date: '1 WEEK AGO'
  },
  {
    id: '4',
    imageUrl: '/images/clinical-cases/발치후즉시식립_대구치/하악좌측.jpg',
    likes: 415,
    comments: 12,
    caption: 'Precision and care in every procedure. Our team uses the latest technology for painless and effective treatments. 🔬✨ #DentalCare #HighTech',
    date: '2 WEEKS AGO'
  },
  {
    id: '5',
    imageUrl: '/images/clinical-cases/발치후즉시식립_소구치/1.jpg',
    likes: 1024,
    comments: 56,
    caption: 'That post-whitening glow! 💫 Professional teeth whitening is one of our most popular treatments for international visitors. Fast, safe, and stunning results. 💎',
    date: '2 WEEKS AGO'
  },
  {
    id: '6',
    imageUrl: '/images/clinical-cases/발치후즉시식립_소구치/파노라마.jpg',
    likes: 275,
    comments: 8,
    caption: 'Hygiene is our top priority. Our sterilization processes exceed international standards, giving you complete peace of mind. 🏥✨ #CleanClinic #DentalHygiene',
    date: '3 WEEKS AGO'
  },
  {
    id: '7',
    imageUrl: '/images/clinical-cases/전악재건_ful_mouth/상악1.jpg',
    likes: 388,
    comments: 15,
    caption: 'Skincare for your smile. 🦷✨ Ask us about our premium dental spa packages that combine cleaning, whitening, and gum care.',
    date: '4 WEEKS AGO'
  },
  {
    id: '8',
    imageUrl: '/images/clinical-cases/전악재건_ful_mouth/상악2.jpg',
    likes: 642,
    comments: 31,
    caption: 'State-of-the-art facilities designed with your comfort in mind. Experience dentistry differently at White Style. 🌟',
    date: '1 MONTH AGO'
  },
  {
    id: '9',
    imageUrl: '/images/clinical-cases/전악재건_ful_mouth/하악.jpg',
    likes: 491,
    comments: 22,
    caption: 'Behind the scenes! Our amazing staff preparing for another busy day of transforming smiles. 👩‍⚕️👨‍⚕️💙 #TeamWork #DentalClinic',
    date: '1 MONTH AGO'
  }
];

export default function InstagramModal({ isOpen, onClose }: InstagramModalProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNextPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPost) return;
    const currentIndex = mockPosts.findIndex(p => p.id === selectedPost.id);
    if (currentIndex < mockPosts.length - 1) {
      setSelectedPost(mockPosts[currentIndex + 1]);
    }
  };

  const handlePrevPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPost) return;
    const currentIndex = mockPosts.findIndex(p => p.id === selectedPost.id);
    if (currentIndex > 0) {
      setSelectedPost(mockPosts[currentIndex - 1]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/40 backdrop-blur-md"
        >
          {/* Main Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header (Scrollable with content) */}
            <div className="overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar">
              <div className="p-6 md:p-10 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start max-w-4xl mx-auto">
                  
                  {/* Profile Picture */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600">
                      <div className="w-full h-full rounded-full border-4 border-white dark:border-zinc-950 overflow-hidden bg-white">
                        <img 
                          src="/images/clinical-cases/발치후즉시식립_상악전치/1.jpg" 
                          alt="White Style Dental Clinic" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full">
                      <h2 className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 flex items-center justify-center md:justify-start gap-2">
                        whitestyledentalclinic
                        <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/10" />
                      </h2>
                      <div className="flex gap-2 justify-center">
                        <button className="px-6 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                          Follow
                        </button>
                        <button className="px-6 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-semibold rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                          Message
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-base">
                      <div className="text-zinc-900 dark:text-zinc-100"><span className="font-semibold">245</span> posts</div>
                      <div className="text-zinc-900 dark:text-zinc-100"><span className="font-semibold">12.4K</span> followers</div>
                      <div className="text-zinc-900 dark:text-zinc-100"><span className="font-semibold">150</span> following</div>
                    </div>

                    <div className="space-y-1">
                      <h1 className="font-semibold text-zinc-900 dark:text-zinc-100">White Style Dental Clinic 🦷✨</h1>
                      <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base whitespace-pre-line">
                        Premium dental care for international patients.
                        🇯🇵 Japanese translation available
                        💎 Cosmetic Dentistry | Whitening | Implants
                        📍 Located in the heart of the city
                      </p>
                      <a href="#" className="text-blue-900 dark:text-blue-400 font-medium text-sm flex items-center justify-center md:justify-start gap-1 mt-2 hover:underline">
                        <LinkIcon className="w-3 h-3" />
                        whitestyle-dental.com/jp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="flex md:hidden items-center justify-around text-sm py-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="text-center"><div className="font-semibold text-zinc-900 dark:text-zinc-100">245</div><div className="text-zinc-500">posts</div></div>
                  <div className="text-center"><div className="font-semibold text-zinc-900 dark:text-zinc-100">12.4K</div><div className="text-zinc-500">followers</div></div>
                  <div className="text-center"><div className="font-semibold text-zinc-900 dark:text-zinc-100">150</div><div className="text-zinc-500">following</div></div>
                </div>
              </div>

              {/* Feed Tabs */}
              <div className="flex justify-center border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-10">
                <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-medium text-xs md:text-sm tracking-widest uppercase">
                  <Grid className="w-4 h-4" />
                  Posts
                </button>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-6 max-w-5xl mx-auto mb-10">
                {mockPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => setSelectedPost(post)}
                    className="relative aspect-square group cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-sm md:rounded-xl"
                  >
                    <img 
                      src={post.imageUrl} 
                      alt={post.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-6 text-white font-bold">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                          <span className="text-sm md:text-base">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                          <span className="text-sm md:text-base">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Post Detail Modal */}
          <AnimatePresence>
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedPost(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-lg md:rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 md:hidden z-50 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Left Side: Image */}
                  <div className="relative w-full md:w-[60%] shrink-0 bg-black flex items-center justify-center min-h-[40vh] md:min-h-0">
                    <img
                      src={selectedPost.imageUrl}
                      alt="Post content"
                      className="w-full h-full object-contain md:object-cover"
                    />
                    
                    {/* Navigation Buttons */}
                    <button 
                      onClick={handlePrevPost}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-black transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNextPost}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-black transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Right Side: Details */}
                  <div className="flex-1 bg-white dark:bg-zinc-950 flex flex-col max-h-[50vh] md:max-h-[90vh]">
                    {/* Detail Header */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[2px]">
                          <img 
                            src="/images/clinical-cases/발치후즉시식립_상악전치/1.jpg" 
                            alt="Avatar" 
                            className="w-full h-full rounded-full border border-white object-cover"
                          />
                        </div>
                        <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">whitestyledentalclinic</span>
                      </div>
                      <button className="hidden md:block p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" onClick={() => setSelectedPost(null)}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Detail Comments/Caption */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden bg-gradient-to-tr from-yellow-400 via-rose-500 to-fuchsia-600 p-[2px]">
                          <img 
                            src="/images/clinical-cases/발치후즉시식립_상악전치/1.jpg" 
                            alt="Avatar" 
                            className="w-full h-full rounded-full border border-white object-cover"
                          />
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">whitestyledentalclinic</span>
                          <span className="text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">{selectedPost.caption}</span>
                          <div className="text-xs text-zinc-500 mt-3">{selectedPost.date}</div>
                        </div>
                      </div>
                    </div>

                    {/* Detail Actions */}
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <button className="hover:opacity-60 transition-opacity"><Heart className="w-6 h-6 text-zinc-900 dark:text-zinc-100" /></button>
                          <button className="hover:opacity-60 transition-opacity"><MessageCircle className="w-6 h-6 text-zinc-900 dark:text-zinc-100" /></button>
                        </div>
                        <button className="hover:opacity-60 transition-opacity"><Bookmark className="w-6 h-6 text-zinc-900 dark:text-zinc-100" /></button>
                      </div>
                      <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1">{selectedPost.likes.toLocaleString()} likes</div>
                      
                      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center">
                        <input type="text" placeholder="Add a comment..." className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500" />
                        <button className="text-blue-500 font-semibold text-sm hover:text-blue-600">Post</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global styles for custom scrollbar (you can move this to your global.css)
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
