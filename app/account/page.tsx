'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [currency, setCurrency] = useState("ZAR");
  const [formMsg, setFormMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || "");
        setAvatarUrl(profile.avatar_url || "");
        setIsAdmin(profile.is_admin || false);
        setShippingAddress(profile.shipping_address || "");
        setCurrency(profile.preferred_currency || "ZAR");
      }
      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setFormMsg("");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from('products')
        .upload(filePath, file, { upsert: true });

      if (!uploadErr) {
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          setAvatarUrl(publicUrlData.publicUrl);
          setFormMsg("Avatar image uploaded successfully!");
          setUploading(false);
          return;
        }
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          setFormMsg("Avatar image updated from device!");
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setFormMsg(`Upload error: ${err.message}`);
      setUploading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setFormMsg("");

    const updates = {
      id: user.id,
      full_name: fullName,
      avatar_url: avatarUrl,
      shipping_address: shippingAddress,
      preferred_currency: currency,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      setFormMsg(`Error saving profile: ${error.message}`);
    } else {
      setFormMsg("Profile successfully updated!");
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B] flex items-center justify-center font-mono text-xs">
        Retrieving Collector Credentials...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#1C242B] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b-2 border-[#D99B26] pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C85A32] font-mono font-bold">
            Asili Collector Registry
          </span>
          <h1 className="text-3xl font-serif font-black text-[#1C242B] mt-1">
            My Director Profile
          </h1>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <button
              onClick={() => router.push("/admin")}
              className="text-xs font-mono bg-[#C85A32] text-white font-bold px-3 py-2 rounded-lg hover:bg-[#B84A22] transition-colors"
            >
              Director Portal
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="text-xs font-mono border border-[#C85A32] text-[#C85A32] font-bold px-3 py-2 rounded-lg hover:bg-[#C85A32]/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white border-2 border-[#D99B26]/30 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-[#FAF6F0] pb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-[#D99B26] overflow-hidden bg-[#FAF6F0] flex items-center justify-center text-2xl font-serif font-bold text-[#C85A32]">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                fullName ? fullName.charAt(0).toUpperCase() : "O"
              )}
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-xl font-serif font-bold text-[#1C242B]">
              {fullName || "Anonymous Collector"}
            </h2>
            <p className="text-xs font-mono text-stone-500">{user?.email}</p>
            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[10px] font-mono uppercase bg-[#D99B26]/20 border border-[#D99B26]/40 px-2.5 py-1 rounded-full text-[#1C242B] font-bold">
                {isAdmin ? "Director Level" : "Authenticated Operative"}
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#C85A32]/10 border border-[#C85A32]/30 px-2.5 py-1 rounded-full text-[#C85A32] font-bold">
                Currency: {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Pogiso Jan Moloto"
                className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none font-mono"
              >
                <option value="ZAR">ZAR (R - South African Rand)</option>
                <option value="USD">USD ($ - US Dollar)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
                <option value="NGN">NGN (₦ - Nigerian Naira)</option>
                <option value="KES">KES (KSh - Kenyan Shilling)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">
              Update Profile Avatar Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="mt-1 w-full text-xs font-mono file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#D99B26] file:text-[#1C242B] hover:file:bg-[#c38a1e] file:cursor-pointer"
            />
            {uploading && <p className="text-[10px] font-mono text-[#C85A32] mt-1">Uploading avatar...</p>}
          </div>

          <div>
            <label className="block text-xs uppercase font-mono font-semibold text-[#1C242B]">
              Default Delivery Address
            </label>
            <textarea
              rows={3}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter street address, city, province, and postal code..."
              className="mt-1 w-full px-3 py-2 border border-[#D99B26]/40 rounded-lg bg-[#FAF6F0] text-xs focus:outline-none"
            />
          </div>

          {formMsg && (
            <p className="text-xs font-mono text-[#C85A32] font-bold text-center">{formMsg}</p>
          )}

          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full py-3 bg-[#C85A32] text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#B84A22] transition-colors disabled:opacity-50"
          >
            {saving ? "Updating Registry..." : "Save Profile Credentials"}
          </button>
        </form>
      </div>
    </main>
  );
}
