import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Rocket, 
  Coins, 
  BarChart3, 
  Globe,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'
import { useWalletContext } from '../components/WalletProvider'

export const Home: React.FC = () => {
  const { connected } = useWalletContext()

  const features = [
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create meme coins in seconds with automated tokenomics and smart contracts'
    },
    {
      icon: Shield,
      title: 'Secure & Audited',
      description: 'Built on Aptos blockchain with Move language for maximum security'
    },
    {
      icon: TrendingUp,
      title: 'Smart Tokenomics',
      description: 'AI-powered tokenomics distribution for optimal market performance'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for the community, by the community'
    }
  ]

  const stats = [
    { label: 'Total Coins Generated', value: '1,234', icon: Coins },
    { label: 'Active Users', value: '5.2K', icon: Users },
    { label: 'Total Volume', value: '$2.5M', icon: BarChart3 },
    { label: 'Countries', value: '42', icon: Globe }
  ]

  const benefits = [
    'No coding experience required',
    'Instant deployment on Aptos',
    'Automated tokenomics calculation',
    'Built-in liquidity management',
    'Community governance tools',
    'Cross-chain compatibility'
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full">
            <Star className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-400 font-medium">Powered by Aptos Blockchain</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Generate{' '}
            <span className="gradient-text">Meme Coins</span>
            <br />
            in Seconds
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            The ultimate DeFi platform for creating, deploying, and managing meme coins on Aptos. 
            No coding required, just pure creativity and automated smart contracts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {connected ? (
              <Link
                to="/generator"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Generating</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-white/60">Connect your wallet to get started</p>
                <div className="w-64 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                  <span className="text-white/40">Wallet not connected</span>
                </div>
              </div>
            )}
            
            <Link
              to="/explore"
              className="btn-outline text-lg px-8 py-4"
            >
              Explore Coins
            </Link>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="relative">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-2 h-2 bg-primary-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-1/4 w-3 h-3 bg-secondary-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [-5, 15, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/3 w-2 h-2 bg-success-400 rounded-full opacity-60"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold">Why Choose MemeGen?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Built with cutting-edge technology and designed for the modern DeFi user
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover-lift text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto">
                <feature.icon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold">Platform Statistics</h2>
          <p className="text-xl text-white/70">Real-time data from our growing ecosystem</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto">
                <stat.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold">Everything You Need</h2>
          <p className="text-xl text-white/70">Complete toolkit for successful meme coin creation</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">Platform Features</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">Get Started Today</h3>
            <div className="space-y-4">
              <div className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                <h4 className="font-semibold text-primary-400 mb-2">Step 1: Connect Wallet</h4>
                <p className="text-white/70 text-sm">Connect your Aptos wallet to get started</p>
              </div>
              <div className="p-4 bg-secondary-500/10 border border-secondary-500/20 rounded-xl">
                <h4 className="font-semibold text-secondary-400 mb-2">Step 2: Generate Coin</h4>
                <p className="text-white/70 text-sm">Enter coin details and generate smart contracts</p>
              </div>
              <div className="p-4 bg-success-500/10 border border-success-500/20 rounded-xl">
                <h4 className="font-semibold text-success-400 mb-2">Step 3: Deploy & Launch</h4>
                <p className="text-white/70 text-sm">Deploy your coin and start trading</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-4xl font-bold">Ready to Create Your Meme Coin?</h2>
          <p className="text-xl text-white/70">
            Join thousands of creators who are building the future of DeFi on Aptos
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/generator"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Creating Now
            </Link>
            <Link
              to="/explore"
              className="btn-outline text-lg px-8 py-4"
            >
              Explore Community
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
} 