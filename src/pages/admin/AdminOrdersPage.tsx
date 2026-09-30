import React, { useState, useEffect } from 'react';
import { useOrderStore, useUIStore } from '../../stores';
import { Order, OrderStatus } from '../../types';
import { ShoppingBag, Search, Filter, X, Check, Flame, Clock, Phone, Mail } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, loadOrders, updateOrderStatus } = useOrderStore();
  const { addToast } = useUIStore();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const statuses: (OrderStatus | 'All')[] = [
    'All',
    'RECEIVED',
    'CONFIRMED',
    'READY FOR PICKUP',
    'COMPLETED',
    'CANCELLED',
  ];

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'All' && o.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    }
    return true;
  });

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    await updateOrderStatus(orderId, status);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
    addToast({
      type: 'success',
      title: 'ORDER UPDATED',
      message: `Order #${orderId} moved to ${status}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
            LIVE KITCHEN PASS DISPATCH
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            ORDER MANAGEMENT ({orders.length})
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--smoke)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order #, customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#2B1D14] border border-white/15 pl-9 pr-4 py-2 text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none focus:border-[var(--ember)] w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold uppercase tracking-wider">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 border transition-all ${
              filterStatus === st
                ? 'border-[var(--ember)] bg-[var(--ember)] text-white shadow-md'
                : 'border-white/10 text-[var(--smoke)] hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-[#1C140F] border border-white/10 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#2B1D14] text-[var(--smoke)] uppercase text-[10px] tracking-wider border-b border-white/10">
            <tr>
              <th className="p-4 font-bold">Order ID</th>
              <th className="p-4 font-bold">Customer</th>
              <th className="p-4 font-bold">Items Summary</th>
              <th className="p-4 font-bold">Pickup Time</th>
              <th className="p-4 font-bold">Total</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[var(--smoke)]">
                  NO ORDERS FOUND MATCHING FILTER
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-[#2B1D14]/60 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-mono font-bold text-[var(--flour)]">
                    #{order.id}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[var(--flour)] uppercase">{order.customerName}</div>
                    <div className="text-[10px] text-[var(--smoke)]">{order.customerPhone}</div>
                  </td>
                  <td className="p-4 text-[var(--smoke)] max-w-xs truncate">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                  </td>
                  <td className="p-4 text-[var(--gold-line)] font-medium">
                    {order.pickupTime}
                  </td>
                  <td className="p-4 font-mono font-bold text-[var(--flour)]">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                        order.status === 'CONFIRMED'
                          ? 'border-[var(--ember)] text-[var(--ember)] bg-[var(--ember)]/10'
                          : order.status === 'READY FOR PICKUP'
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-950/30'
                          : order.status === 'COMPLETED'
                          ? 'border-white/20 text-[var(--smoke)]'
                          : 'border-blue-400 text-blue-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className="bg-[#15100C] border border-white/20 text-[10px] font-bold uppercase p-1.5 text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                    >
                      <option value="RECEIVED">Received</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="READY FOR PICKUP">Ready</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Order Detail Modal / Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-lg p-6 sm:p-8 space-y-6 text-[#F3ECDD] shadow-2xl relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
                ORDER DETAILS & LIVE STATUS CONTROL
              </div>
              <h2 className="text-2xl font-extrabold uppercase font-display">
                ORDER #{selectedOrder.id}
              </h2>
            </div>

            <div className="p-4 bg-[#2B1D14] border border-white/10 space-y-2 text-xs">
              <div>Customer: <strong className="text-white">{selectedOrder.customerName}</strong></div>
              <div>Phone: <strong className="text-white">{selectedOrder.customerPhone}</strong></div>
              <div>Email: <strong className="text-white">{selectedOrder.customerEmail}</strong></div>
              <div>Pickup Time: <strong className="text-[var(--gold-line)]">{selectedOrder.pickupTime}</strong></div>
              {selectedOrder.specialInstructions && (
                <div className="text-[var(--gold-line)] italic">“{selectedOrder.specialInstructions}”</div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              <div className="text-xs uppercase font-bold tracking-wider text-[var(--smoke)]">
                Items ({selectedOrder.items.reduce((s, i) => s + i.quantity, 0)})
              </div>
              {selectedOrder.items.map((i) => (
                <div key={i.id} className="flex justify-between text-xs border-b border-white/5 pb-1">
                  <span>{i.quantity}× {i.name}</span>
                  <span className="font-mono">${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold">
              <span>Total Bill</span>
              <span className="font-mono text-[var(--ember)]">${selectedOrder.total.toFixed(2)}</span>
            </div>

            {/* Actions for Status Transition */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <label className="block text-xs uppercase font-bold text-[var(--smoke)]">
                Transition Kitchen Status:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'CONFIRMED')}
                  className="p-2 text-[10px] font-bold uppercase bg-[#2B1D14] hover:bg-black text-[var(--gold-line)] border border-white/10"
                >
                  Confirm Order
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'READY FOR PICKUP')}
                  className="p-2 text-[10px] font-bold uppercase bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  Mark Ready For Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
