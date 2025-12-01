'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Users, AlertTriangle, Scale, Gavel, Shield } from 'lucide-react'

export default function TermsConditionsPage() {
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
              <FileText className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using APERTURE. 
              By using our service, you agree to these terms.
            </p>
            
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Acceptance of Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Gavel className="w-6 h-6 text-blue-500" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By accessing and using APERTURE ("the Service"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  APERTURE is a web application created by Team DigiExperts for the NASA Space Apps Challenge, 
                  designed to showcase NASA's Astronomy Picture of the Day (APOD) content in an interactive 
                  and educational format.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Use of Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="w-6 h-6 text-green-500" />
                  Use of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <h3 className="font-semibold text-foreground">Permitted Use</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      View and explore NASA APOD images and related educational content
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Save favorites and participate in educational quizzes
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Share content on social media platforms for educational purposes
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Contact us with questions or feedback about the service
                    </p>
                  </li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6">Prohibited Use</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Attempt to reverse engineer, modify, or distribute our code without permission
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Use automated systems to access or scrape our service
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Submit false, misleading, or inappropriate content
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Violate any applicable laws or regulations
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="w-6 h-6 text-purple-500" />
                  Content & Copyright
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">NASA Content</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    All astronomical images and related descriptions are provided by NASA through their 
                    official APOD API. NASA content is generally in the public domain, but specific 
                    usage rights may vary. Please refer to NASA's usage guidelines for details.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">APERTURE Platform</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The APERTURE platform, including its design, code, and educational features, 
                    is the intellectual property of Team DigiExperts. This includes the user interface, 
                    quiz system, and interactive features.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">User-Generated Content</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Any content you submit through our contact forms or feedback systems becomes 
                    non-exclusive property that we may use to improve our service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  APERTURE is provided on an "as is" basis. While we strive to ensure accuracy 
                  and reliability, we make no warranties regarding:
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      The accuracy or completeness of information displayed
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Continuous availability of the service
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Compatibility with all devices and browsers
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      The educational value or accuracy of quiz content
                    </p>
                  </li>
                </ul>

                <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                  This project was created for the NASA Space Apps Challenge and is intended for 
                  educational and demonstration purposes.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Limitation of Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="mt-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Scale className="w-6 h-6 text-cyan-500" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To the maximum extent permitted by applicable law, Team DigiExperts shall not be 
                  liable for any indirect, incidental, special, consequential, or punitive damages, 
                  or any loss of profits or revenues, whether incurred directly or indirectly, 
                  or any loss of data, use, goodwill, or other intangible losses resulting from:
                </p>

                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Your use or inability to use the service
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Any unauthorized access to or use of our servers
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground text-sm">
                      Any bugs, viruses, or similar harmful components
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Changes to Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 space-y-4 mt-6 mb-6">
                <h3 className="font-semibold text-foreground text-xl">Changes to These Terms</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days notice prior to any new terms 
                  taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By continuing to access or use our Service after those revisions become effective, 
                  you agree to be bound by the revised terms.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 mt-6 mb-6">
                <h3 className="font-semibold text-foreground mb-3">Questions About These Terms?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  If you have any questions about these Terms and Conditions, 
                  please contact us through our contact page.
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
