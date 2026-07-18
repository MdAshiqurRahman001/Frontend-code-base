"use client";

import { useSendSupportMessageMutation } from "@/redux/api/userApi";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { Loader2, Send, MessageSquare, Mail, Phone, User } from "lucide-react";

interface SupportFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function SupportPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [sendMessage, { isLoading }] = useSendSupportMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({
    defaultValues: {
      name: currentUser?.fullName ?? "",
      email: currentUser?.email ?? "",
      phone: currentUser?.phoneNumber ?? "",
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    try {
      await sendMessage(data).unwrap();
      toast.success("Message sent! Our team will get back to you shortly.");
      reset({ name: data.name, email: data.email, phone: data.phone, message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Contact Support</h1>
        <p className="text-sm text-gray-500 mt-1">
          Have a question or issue? Send us a message and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: "📧", title: "Email", desc: "support@app.com" },
          { icon: "⏰", title: "Response Time", desc: "Within 24 hours" },
          { icon: "🌍", title: "Availability", desc: "Mon–Fri, 9am–6pm" },
        ].map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquare size={18} className="text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Send a Message</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.phone ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                  }`}
                  {...register("phone", { required: "Phone is required" })}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                }`}
                {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              rows={5}
              placeholder="Describe your issue or question in detail..."
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.message ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
              }`}
              {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please provide more detail (10+ characters)" } })}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-indigo-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader2 size={15} className="animate-spin" /> Sending…</>
            ) : (
              <><Send size={15} /> Send Message</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
