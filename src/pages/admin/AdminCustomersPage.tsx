import React, { useState, useEffect } from 'react';
import { useCustomerStore } from '../../stores';
import { Customer } from '../../types';
import { Users, Search, Award, DollarSign, X } from 'lucide-react';

export const AdminCustomersPage: React.FC = () => {
  const { customers, loadCustomers } = useCustomerStore();
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
            PATRON RELATIONSHIPS & CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            CUSTOMERS ({customers.length})
          </h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--smoke)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1C140F] border border-white/15 pl-9 pr-3 py-2 text-xs text-[var(--flour)] placeholder:text-[var(--smoke)] focus:outline-none focus:border-[var(--ember)]"
          />
        </div>
      </div>

      <div className="bg-[#1C140F] border border-white/10 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#2B1D14] text-[var(--smoke)] uppercase text-[10px] tracking-wider border-b border-white/10">
            <tr>
              <th className="p-4 font-bold">Customer Name</th>
              <th className="p-4 font-bold">Contact</th>
              <th className="p-4 font-bold">Lifetime Orders</th>
              <th className="p-4 font-bold">Total Spent</th>
              <th className="p-4 font-bold">Rewards Points</th>
              <th className="p-4 font-bold">Last Visit</th>
              <th className="p-4 font-bold text-right">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((cust) => (
              <tr
                key={cust.id}
                onClick={() => setSelectedCust(cust)}
                className="hover:bg-[#2B1D14]/60 transition-colors cursor-pointer"
              >
                <td className="p-4 font-bold uppercase text-[var(--flour)]">
                  {cust.name}
                </td>
                <td className="p-4 text-[var(--smoke)]">
                  <div>{cust.email}</div>
                  <div className="text-[10px]">{cust.phone}</div>
                </td>
                <td className="p-4 font-mono font-bold text-[var(--flour)]">
                  {cust.ordersCount}
                </td>
                <td className="p-4 font-mono font-bold text-emerald-400">
                  ${cust.totalSpent.toFixed(2)}
                </td>
                <td className="p-4 font-mono font-bold text-[var(--gold-line)]">
                  {cust.rewardsPoints} pts
                </td>
                <td className="p-4 text-[var(--smoke)]">
                  {cust.lastOrderDate}
                </td>
                <td className="p-4 text-right">
                  <span className="text-[10px] font-bold uppercase text-[var(--ember)] hover:underline">
                    View CRM →
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-md p-6 sm:p-8 space-y-4 text-[#F3ECDD] shadow-2xl relative">
            <button
              onClick={() => setSelectedCust(null)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--ember)]">
                CUSTOMER PROFILE
              </div>
              <h2 className="text-2xl font-extrabold uppercase font-display">
                {selectedCust.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#2B1D14] p-4 border border-white/10">
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Total Orders</span>
                <span className="text-lg font-bold font-mono text-[var(--flour)]">{selectedCust.ordersCount}</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Total Spend</span>
                <span className="text-lg font-bold font-mono text-emerald-400">${selectedCust.totalSpent.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Loyalty Points</span>
                <span className="text-lg font-bold font-mono text-[var(--gold-line)]">{selectedCust.rewardsPoints}</span>
              </div>
              <div>
                <span className="text-[var(--smoke)] block uppercase font-semibold">Last Visited</span>
                <span className="text-xs text-[var(--flour)]">{selectedCust.lastOrderDate}</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-[var(--smoke)]">
              <div>Email: <strong className="text-white">{selectedCust.email}</strong></div>
              <div>Phone: <strong className="text-white">{selectedCust.phone}</strong></div>
              {selectedCust.notes && (
                <div className="pt-2 text-[var(--gold-line)] italic">
                  Notes: “{selectedCust.notes}”
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedCust(null)}
              className="w-full py-2.5 bg-[#2B1D14] text-xs font-bold uppercase tracking-wider text-center"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
