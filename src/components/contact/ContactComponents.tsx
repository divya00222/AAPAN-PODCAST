import React, { useState } from "react";
import { siteConfig } from "../../data/site";
import { 
  Mail, 
  Instagram, 
  Youtube, 
  Facebook, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Phone,
  User,
  BookOpen,
  MessageSquare
} from "lucide-react";

// 1. Reusable FormField Component
interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  error
}: FormFieldProps) {
  const inputClass = `w-full px-4 py-3 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-all ${
    error ? "border-red-500 ring-2 ring-red-500/10" : "border-border hover:border-text-muted"
  }`;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="text-xs font-mono font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
        {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${inputClass} resize-none`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500 font-mono flex items-center gap-1.5 animate-fade-in" role="alert">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

// 2. Reusable SocialLinks Component
export function SocialLinks() {
  const linkStyle = "flex items-center gap-4.5 p-4 bg-surface border border-border hover:border-accent/40 hover:shadow-lg rounded-2xl transition-all group";
  const iconStyle = "w-5 h-5 text-text-muted group-hover:text-accent transition-colors";

  // Simple TikTok icon representation since lucide doesn't always bundle it
  const TikTokIcon = () => (
    <svg className="w-5 h-5 text-text-muted group-hover:text-accent fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.22-.17-.43-.35-.63-.54v5.57c.01 2.44-.94 4.87-2.68 6.57-1.85 1.8-4.51 2.65-7.07 2.27-2.8-.41-5.32-2.33-6.42-4.99C-.15 14.15-.3 10.45 1.12 7.55c1.23-2.52 3.8-4.38 6.59-4.75V6.9c-1.12.18-2.22.84-2.83 1.79-.76 1.17-.83 2.73-.2 3.98.6 1.19 1.95 1.99 3.28 1.91 1.25-.08 2.37-.99 2.66-2.2.14-.59.13-1.21.13-1.82V0l1.77.02z"/>
    </svg>
  );

  return (
    <div className="space-y-4" id="contact-social-links">
      <a href={`mailto:${siteConfig.contactEmail}`} className={linkStyle}>
        <div className="p-3 bg-accent/10 text-accent rounded-xl">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest">Email Address</span>
          <span className="block text-sm font-bold text-text-primary group-hover:text-accent transition-colors">{siteConfig.contactEmail}</span>
        </div>
      </a>

      <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className={linkStyle}>
        <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl">
          <Instagram className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest">Instagram</span>
          <span className="block text-sm font-bold text-text-primary group-hover:text-accent transition-colors">@aapan.podcast</span>
        </div>
      </a>

      <a href="https://tiktok.com/@aapan.podcast" target="_blank" rel="noreferrer" className={linkStyle}>
        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
          <TikTokIcon />
        </div>
        <div>
          <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest">TikTok</span>
          <span className="block text-sm font-bold text-text-primary group-hover:text-accent transition-colors">@aapan.podcast</span>
        </div>
      </a>

      <a href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" className={linkStyle}>
        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
          <Youtube className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest">YouTube Channel</span>
          <span className="block text-sm font-bold text-text-primary group-hover:text-accent transition-colors">Aapan Podcast</span>
        </div>
      </a>

      <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className={linkStyle}>
        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
          <Facebook className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest">Facebook</span>
          <span className="block text-sm font-bold text-text-primary group-hover:text-accent transition-colors">Aapan Podcast</span>
        </div>
      </a>
    </div>
  );
}

// 3. Reusable ContactForm Component (with meticulous local validation & integration warning)
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  // Email format validation checker
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please provide a valid email format.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message text cannot be empty.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success flow - Clear errors and show local warning
    setErrors({});
    setSubmittedData({ ...formData });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setSubmittedData(null);
  };

  if (submittedData) {
    return (
      <div className="p-6 sm:p-8 bg-surface border border-border rounded-3xl space-y-6 shadow-2xl text-center max-w-xl mx-auto" id="contact-success-container">
        <div className="w-16 h-16 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black font-display text-text-primary">Form Validated Successfully</h3>
          <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/15 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            Frontend Ready
          </span>
        </div>

        {/* Clear disclaimer explaining no backend is active yet */}
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans max-w-md mx-auto">
          Thank you for exploring our contact portal. The client-side form has successfully captured and validated your input, which is now structured and ready to link with a production backend service (such as SendGrid, Firebase Functions, or a dedicated Node API route). No message was sent.
        </p>

        {/* Structured overview of data submitted */}
        <div className="bg-background border border-border p-4.5 rounded-2xl text-left text-xs font-mono space-y-2 text-text-secondary">
          <div className="flex justify-between border-b border-border/60 pb-1.5">
            <span className="text-text-muted">Sender:</span>
            <span className="font-bold text-text-primary">{submittedData.name}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-1.5">
            <span className="text-text-muted">Email:</span>
            <span className="font-bold text-text-primary">{submittedData.email}</span>
          </div>
          {submittedData.phone && (
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-text-muted">Phone:</span>
              <span className="font-bold text-text-primary">{submittedData.phone}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-border/60 pb-1.5">
            <span className="text-text-muted">Subject:</span>
            <span className="font-bold text-text-primary truncate max-w-[200px]">{submittedData.subject}</span>
          </div>
          <div className="pt-1.5">
            <span className="block text-text-muted mb-1">Message Preview:</span>
            <span className="block text-text-muted font-sans italic bg-surface p-2 rounded border border-border/40 leading-relaxed max-h-24 overflow-y-auto">
              "{submittedData.message}"
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-6 py-3 bg-accent text-background hover:bg-accent-hover font-bold text-xs uppercase tracking-wider rounded-xl transition-all w-full sm:w-auto cursor-pointer"
        >
          Submit Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-surface border border-border rounded-3xl space-y-5 shadow-xl" id="contact-form-element" noValidate>
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
          <Send className="w-4 h-4 text-accent" /> Write Us a Message
        </h3>
        <p className="text-xs text-text-muted">
          Fields marked with * are required. Your input is validated client-side immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <FormField
          label="Full Name"
          id="contact-name"
          placeholder="e.g. Aarav Sharma"
          required
          value={formData.name}
          onChange={(val) => {
            setFormData({ ...formData, name: val });
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          error={errors.name}
        />

        {/* Email Address */}
        <FormField
          label="Email Address"
          id="contact-email"
          type="email"
          placeholder="e.g. aarav@gmail.com"
          required
          value={formData.email}
          onChange={(val) => {
            setFormData({ ...formData, email: val });
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone (Optional) */}
        <FormField
          label="Phone Number"
          id="contact-phone"
          type="tel"
          placeholder="e.g. +977 980-XXXXXXX (Optional)"
          value={formData.phone}
          onChange={(val) => setFormData({ ...formData, phone: val })}
        />

        {/* Subject */}
        <FormField
          label="Subject"
          id="contact-subject"
          placeholder="e.g. Sponsorship, Guest Application..."
          required
          value={formData.subject}
          onChange={(val) => {
            setFormData({ ...formData, subject: val });
            if (errors.subject) setErrors({ ...errors, subject: "" });
          }}
          error={errors.subject}
        />
      </div>

      {/* Message Text */}
      <FormField
        label="Your Message"
        id="contact-message"
        type="textarea"
        placeholder="Provide as much detail as possible about your project or request..."
        required
        value={formData.message}
        onChange={(val) => {
          setFormData({ ...formData, message: val });
          if (errors.message) setErrors({ ...errors, message: "" });
        }}
        error={errors.message}
      />

      <button
        type="submit"
        className="w-full py-3 px-6 bg-accent text-background hover:bg-accent-hover font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-accent/15 flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4 fill-current" /> Send Message
      </button>
    </form>
  );
}
