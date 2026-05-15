// app/components/Products.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Car, Home, Plane, Shield, Anchor, Banknote, Flame, HardHat } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Product {
  Icon: LucideIcon
  title: string
  description: string
}

const products: Product[] = [
  { Icon: Car, title: 'Motor Vehicle', description: 'Comprehensive coverage for cars and motorcycles' },
  { Icon: Home, title: 'Property All Risk', description: 'Full protection for your home and assets' },
  { Icon: Plane, title: 'Travel (ANANDA)', description: 'Safe travels with comprehensive trip coverage' },
  { Icon: Shield, title: 'Personal Accident', description: 'Protection for you and your family' },
  { Icon: Anchor, title: 'Marine Cargo', description: 'Secure your shipments across sea routes' },
  { Icon: Banknote, title: 'Money Insurance', description: 'Safeguard your cash and valuables' },
  { Icon: Flame, title: 'Fire Insurance', description: 'Protection against fire and related perils' },
  { Icon: HardHat, title: "Contractor's All Risk", description: 'Coverage for construction projects' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Products() {
  return (
    <section id="products" className="py-24 bg-bg" aria-label="Our products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Our Products
          </span>
          <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-text-primary">
            Comprehensive Protection for Every Need
          </h2>
        </div>

        {/* Photo strip */}
        <div className="relative w-full aspect-[16/7] sm:aspect-[21/6] rounded-xl overflow-hidden mb-12">
          <Image
            src="/assets/1.png"
            alt="Sahabat Insurance team at work"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-card rounded-xl border border-slate-100 p-6 group transition-all duration-300 hover:border-navy hover:shadow-xl cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-slate-100 group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                <product.Icon size={22} className="text-navy" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-text-primary mb-2 text-base">{product.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">{product.description}</p>

              {/* Link */}
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                  →
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
