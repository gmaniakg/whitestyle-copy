import React from 'react';
import { getPostsByType, getPostContent } from '@/lib/api';
import WithStarClient from '@/components/WithStarClient';
import { youtubeVideoMap } from '@/lib/video-config';

export default async function WithStarListPage() {
  const rawPosts = getPostsByType('board_withstar').sort((a, b) => {
    const idA = parseInt(a.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    const idB = parseInt(b.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    return idB - idA;
  });

  // Resolve all post content and assets on the server to keep client props clean (prevents serialization errors)
  const posts = rawPosts.map(post => {
    const idMatch = post.local_path.match(/\/(\d+)_/);
    const id = idMatch ? idMatch[1] : post.url.split('wr_id=')[1];
    const content = getPostContent(post.local_path) || '';
    
    // Extract first image from markdown content
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    const imgSrc = imgMatch ? imgMatch[1] : null;
    
    // Extract video ID mapping
    const videoId = youtubeVideoMap[id] || null;

    return {
      id,
      title: post.title.replace(/_/g, ' '),
      content,
      imgSrc,
      videoId
    };
  });

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh] bg-white">
      <div className="flex flex-col items-center mb-24 text-center mt-12">
        <span className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-extrabold bg-slate-900 text-white mb-6">
          Meet the Stars
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 font-serif">
          스타와 함께
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">화이트스타일치과를 찾아주신 특별한 분들과의 소중한 인연을 소개합니다.</p>
      </div>

      <WithStarClient posts={posts} />
    </div>
  );
}
