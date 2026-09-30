import React, { useState, useEffect } from 'react';
import { useMenuStore, useUIStore } from '../../stores';
import { MenuItem, MenuCategory } from '../../types';
import { Plus, Search, Edit2, Trash2, Copy, Power, Flame, Video, X } from 'lucide-react';

export const AdminMenuPage: React.FC = () => {
  const { items, loadMenu, saveItem, deleteItem, toggleAvailability } = useMenuStore();
  const { addToast } = useUIStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  const categories: (MenuCategory | 'All')[] = [
    'All',
    'Appetizers',
    'Mez Burger',
    'Hand-Held',
    'Plates',
    'Kids Menu',
    'Sides',
    'Add-ons',
    'Dessert',
    'Drinks',
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingItem({
      id: `menu-custom-${Date.now()}`,
      name: '',
      category: 'Mez Burger',
      price: 12.99,
      description: '',
      image: '/images/food/bacon-cheese-mez.jpg',
      video: '',
      tags: ['New Item'],
      available: true,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleDuplicate = async (item: MenuItem) => {
    const duplicated: MenuItem = {
      ...item,
      id: `copy-${Date.now()}-${item.id}`,
      name: `${item.name} (Copy)`,
    };
    await saveItem(duplicated);
    addToast({
      type: 'success',
      title: 'DISH DUPLICATED',
      message: `Created duplicate of "${item.name}".`,
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      await deleteItem(id);
      addToast({
        type: 'info',
        title: 'DISH REMOVED',
        message: `Deleted "${name}" from menu.`,
      });
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    await saveItem(editingItem);
    setIsModalOpen(false);
    setEditingItem(null);
    addToast({
      type: 'success',
      title: 'MENU SAVED',
      message: `"${editingItem.name}" updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
            CATALOG MANAGEMENT & KINETIC VIDEO ASSETS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            MENU CMS ({items.length} DISHES)
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW DISH</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'border-[var(--ember)] bg-[var(--ember)] text-white'
                  : 'border-white/10 text-[var(--smoke)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--smoke)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1C140F] border border-white/15 pl-9 pr-3 py-2 text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none focus:border-[var(--ember)]"
          />
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-[#1C140F] border border-white/10 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#2B1D14] text-[var(--smoke)] uppercase text-[10px] tracking-wider border-b border-white/10">
            <tr>
              <th className="p-3 font-bold">Image/Video</th>
              <th className="p-3 font-bold">Dish Name</th>
              <th className="p-3 font-bold">Category</th>
              <th className="p-3 font-bold">Price</th>
              <th className="p-3 font-bold">Video Asset</th>
              <th className="p-3 font-bold">Status</th>
              <th className="p-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#2B1D14]/60 transition-colors">
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover bg-black border border-white/10"
                  />
                </td>
                <td className="p-3">
                  <div className="font-bold text-[var(--flour)] uppercase">{item.name}</div>
                  <div className="text-[10px] text-[var(--smoke)] max-w-xs truncate">
                    {item.description}
                  </div>
                </td>
                <td className="p-3 font-semibold text-[var(--smoke)] uppercase">
                  {item.category}
                </td>
                <td className="p-3 font-mono font-bold text-[var(--flour)]">
                  ${item.price.toFixed(2)}
                </td>
                <td className="p-3">
                  {item.video ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <Video className="w-3 h-3" />
                      <span>Attached</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-[var(--smoke)]">None</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase border transition-all ${
                      item.available
                        ? 'border-emerald-500 text-emerald-400 bg-emerald-950/40'
                        : 'border-red-500 text-red-400 bg-red-950/40'
                    }`}
                  >
                    {item.available ? 'Available' : 'Sold Out'}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-[var(--smoke)] hover:text-white"
                      title="Edit dish"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(item)}
                      className="p-1.5 text-[var(--smoke)] hover:text-[var(--gold-line)]"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 text-[var(--smoke)] hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Dish Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-xl p-6 sm:p-8 space-y-6 text-[#F3ECDD] shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
                MENU CMS FORM
              </div>
              <h2 className="text-2xl font-extrabold uppercase font-display">
                {editingItem.id.startsWith('menu-custom') ? 'ADD NEW MENU ITEM' : 'EDIT MENU ITEM'}
              </h2>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Sizzling Onion Rings Platter"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as MenuCategory })
                    }
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Base Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Image URL / Asset Path *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="/images/food/bacon-cheese-mez.jpg"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              {/* Video asset field (Section 28.7: The optional video field lets category/item loops be swapped from the admin without a redeploy) */}
              <div>
                <label className="block text-xs uppercase font-bold text-[var(--gold-line)] mb-1 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>Optional Video Loop Asset Path</span>
                </label>
                <input
                  type="text"
                  value={editingItem.video || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, video: e.target.value })}
                  placeholder="/video/categories/burgers.mp4"
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
                <span className="text-[10px] text-[var(--smoke)] block mt-1">
                  Enables live kinetic video loop preview in the customer menu and split modal.
                </span>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--smoke)]">
                  <input
                    type="checkbox"
                    checked={editingItem.available}
                    onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                    className="accent-[var(--ember)]"
                  />
                  <span>Available for Orders</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold uppercase text-[var(--smoke)]">
                  <input
                    type="checkbox"
                    checked={editingItem.featured}
                    onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                    className="accent-[var(--ember)]"
                  />
                  <span>Featured on Home</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-transparent text-xs text-[var(--smoke)] hover:text-white uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
