'use client';

import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex gap-2">
        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full bg-[#1877f2] hover:bg-[#1877f2]/90 text-white transition-all duration-200 hover:scale-110"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={18} />
        </button>
        
        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full bg-[#1da1f2] hover:bg-[#1da1f2]/90 text-white transition-all duration-200 hover:scale-110"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={18} />
        </button>
        
        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="p-2 rounded-full bg-[#25d366] hover:bg-[#25d366]/90 text-white transition-all duration-200 hover:scale-110"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={18} />
        </button>
      </div>
    </div>
  );
}