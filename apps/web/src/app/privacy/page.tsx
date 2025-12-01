'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, UserCheck, Database, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mt-12 mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how APERTURE collects, 
              uses, and protects your information.
            </p>
            
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Database className="w-6 h-6 text-blue-500" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We may collect personal information when you use our contact form, including your name and email address. 
                    This information is only used to respond to your inquiries.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We collect information about how you interact with APERTURE, including pages visited, 
                    time spent on the site, and features used. This helps us improve our service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Local Storage</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Your favorites, quiz progress, and preferences are stored locally in your browser. 
                    This data never leaves your device unless you explicitly share it.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <UserCheck className="w-6 h-6 text-green-500" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      To provide and maintain our service, including displaying NASA APOD images and related content
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      To respond to your comments, questions, and customer service requests
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      To improve our website and develop new features based on user feedback
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      To analyze usage patterns and optimize the user experience
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Lock className="w-6 h-6 text-purple-500" />
                  Data Security & Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the Internet is 100% secure.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Secure Storage</h4>
                      <p className="text-muted-foreground text-xs">
                        Data is stored securely and accessed only by authorized personnel
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">Encryption</h4>
                      <p className="text-muted-foreground text-xs">
                        All data transmission is encrypted using industry-standard protocols
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Third-Party Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Globe className="w-6 h-6 text-orange-500" />
                  Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  APERTURE uses the following third-party services:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">NASA APOD API</h4>
                    <p className="text-muted-foreground text-xs">
                      We use NASA's official API to fetch astronomy images and descriptions. 
                      No personal data is shared with NASA.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Social Media Platforms</h4>
                    <p className="text-muted-foreground text-xs">
                      When you share content on social media, you are subject to those platforms' privacy policies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Eye className="w-6 h-6 text-cyan-500" />
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  You have the right to:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Access and review any personal information we have collected
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Request correction or deletion of your personal information
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Opt out of any future communications from us
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Clear your local browser data at any time
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 mt-6 mb-6">
                <h3 className="font-semibold text-foreground mb-3">Questions About This Policy?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please don't hesitate to contact us.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
