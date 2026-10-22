'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkAdminStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Check if user is admin in profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin, full_name")
        .eq("id", user.id)
        .single();

      if (!profile || !profile.is_admin) {
        alert("Access denied. Director privileges required.");
        router.push("/");
        return;
      }

      setIsAdmin(true);

      // Fetch all customer orders
      const { data: allOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (allOrders) setOrders(allOrders);
      setLoading(false);
    }

    checkAdminStatus();
  }, [router, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-950 text-stone-400 flex items-center justify-center font-mono text-xs">
        Verifying Director Credentials...
      </main>
    );
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-stone-800 pb-4 flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              Restricted Access
            </span>
            <h1 className="text-3xl font-serif font-bold text-white mt-1">
              Director Control Panel
            </h1>
          </div>
          <span className="text-xs font-mono bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-amber-400">
            Status: Authenticated Director
          </span>
        </div>

        {/* Orders Management Section */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-serif font-bold text-white">
            Incoming Collector Orders ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <p className="text-stone-500 text-sm font-mono py-4">
              No orders registered in the database yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 text-xs uppercase">
                    <th className="pb-3">Reference</th>
                    <th className="pb-3">Amount (ZAR)</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-950/50">
                      <td className="py-3 text-amber-400">{order.paystack_reference}</td>
                      <td className="py-3">R{order.total_amount}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 text-xs rounded uppercase font-bold ${
                            order.status === "paid"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-amber-950 text-amber-400 border border-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-stone-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
