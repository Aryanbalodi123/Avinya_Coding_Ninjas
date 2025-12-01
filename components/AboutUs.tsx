'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Linkedin, Globe, Sparkles } from 'lucide-react'

export default function AboutUs() {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/codingninjas_cuiet?igsh=MTZoeDhrdGQwdDYzNA==',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'group-hover:text-pink-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/codingninjas-cuiet/',
      icon: Linkedin,
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'group-hover:text-blue-400'
    },
    {
      name: 'Website',
      url: 'https://codingninjas.chitkara.edu.in/',
      icon: Globe,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'group-hover:text-green-400'
    }
  ]

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative group"
      >
        {/* Outer glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/20 via-gray-500/20 to-gray-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main card */}
        <div className="relative bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-700/50 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Background grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(150,150,150,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(150,150,150,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400/10 to-transparent"
              style={{
                animation: 'scanline 3s linear infinite'
              }}
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-700/30 via-gray-600/20 to-gray-700/30 backdrop-blur-sm border border-gray-500/40 flex items-center justify-center p-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {/* Pulsing effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/0 via-gray-400/10 to-gray-400/0 animate-pulse" />
                <Image
                  src="/logo.png"
                  alt="Coding Ninjas Logo"
                  width={120}
                  height={120}
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-clip-text text-transparent text-center"
            >
              CODING NINJAS
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-300 text-base md:text-lg leading-relaxed text-center max-w-3xl mb-8"
            >
              The Coding Ninjas CUIET is Chitkara&apos;s top competitive programming organization. 
              Coding Ninjas&apos; motive is to: <span className="font-semibold bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent">Aspire | Learn | Solve | Innovate</span>. 
              The organization arranges different types of events and hackathons to help students explore the ups and downs of the coding journey.
            </motion.p>

            {/* Divider */}
            <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-8" />

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/social relative w-full sm:w-auto"
                >
                  {/* Button glow */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${social.color} rounded-lg blur opacity-0 group-hover/social:opacity-60 transition-opacity duration-300`} />
                  
                  {/* Button */}
                  <div className="relative flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-br from-gray-700/80 via-gray-600/60 to-gray-700/80 backdrop-blur-sm border border-gray-500/40 rounded-lg overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/social:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <social.icon className={`w-5 h-5 text-gray-400 transition-colors duration-300 ${social.hoverColor}`} />
                    <span className="text-gray-200 font-medium text-sm md:text-base">{social.name}</span>
                    
                    {/* Arrow indicator */}
                    <div className="w-0 group-hover/social:w-4 overflow-hidden transition-all duration-300">
                      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  )
}
