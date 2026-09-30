import React, { useState, useEffect } from 'react';
import { useGalleryStore, useUIStore } from '../../stores';
import { GalleryItem } from '../../types';
import { Image as ImageIcon, Plus, Trash2, Edit2, Video, Star, X } from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const { items, loadGallery, saveItem, deleteItem } = useGalleryStore();
  const { addToast } = useUIStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const handleOpenNew = () => {
    setEditing({
      id: `gal-${Date.now()}`,
      title: 'New Dining Room Moment',
      category: 'Restaurant',
      imageUrl: '/images/gallery/gallery-01.jpg',
      videoUrl: '',
      featured: true,
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveItem(editing);
    setIsOpen(false);
    setEditing(null);
    addToast({
      type: 'success',
      title: 'GALLERY UPDATED',
      message: `"${editing.title}" saved successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            MEDIA ASSET CMS & REELS MANAGEMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            GALLERY ASSETS ({items.length})
          </h1>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>ADD MEDIA ASSET</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#1C140F] border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-colors shadow-lg"
          >
            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider text-[var(--flour)] border border-white/10">
                {item.category}
              </div>
              {item.videoUrl && (
                <div className="absolute top-2 right-2 bg-[var(--ember)] text-white p-1 rounded-sm shadow">
                  <Video className="w-3 h-3" />
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase font-display text-[var(--flour)] leading-snug line-clamp-1">
                  {item.title}
                </h4>
                {item.videoUrl && (
                  <span className="text-[10px] text-emerald-400 block mt-0.5">
                    ✓ Video Reel Attached
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={async () => {
                    const updated = { ...item, featured: !item.featured };
                    await saveItem(updated);
                  }}
                  className={`text-[10px] uppercase font-bold flex items-center gap-1 ${
                    item.featured ? 'text-[var(--gold-line)]' : 'text-[var(--smoke)]'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
                  <span>{item.featured ? 'Featured' : 'Standard'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditing({ ...item });
                      setIsOpen(true);
                    }}
                    className="p-1 text-[var(--smoke)] hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Delete this media item?')) {
                        await deleteItem(item.id);
                      }
                    }}
                    className="p-1 text-[var(--smoke)] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-md p-6 sm:p-8 space-y-4 text-[#F3ECDD] shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase font-display">
              MEDIA ITEM METADATA
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Category
                </label>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as GalleryItem['category'] })
                  }
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Food">Food</option>
                  <option value="Events">Events</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Image Path / Poster URL
                </label>
                <input
                  type="text"
                  required
                  value={editing.imageUrl}
                  onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--ember)] mb-1">
                  Video Loop Path (For REEL mode)
                </label>
                <input
                  type="text"
                  value={editing.videoUrl || ''}
                  onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })}
                  placeholder="/video/hero/hero-01.mp4"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)]"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs uppercase font-bold text-[var(--smoke)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
