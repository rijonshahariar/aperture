'use client'
import { motion } from 'framer-motion'
import { Card, CardContent} from '@/components/ui/card'
import { Telescope, Users, Heart, Rocket } from 'lucide-react'
import { SiTarget } from '@icons-pack/react-simple-icons'

export default function AboutUsPage() {
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
                            <Telescope className="w-10 h-10 text-primary" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            About APERTURE
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Discover the cosmos through NASA's lens. APERTURE brings you closer to the wonders of space,
                            one breathtaking image at a time.
                        </p>
                    </div>

                    

                    {/* Mission Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mb-6"
                    >
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                        <SiTarget className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Our Mission</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    APERTURE is dedicated to making the universe accessible to everyone. We believe that the
                                    beauty and wonder of space should inspire curiosity, learning, and appreciation for our
                                    cosmic home.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Through NASA's Astronomy Picture of the Day (APOD) archive, we curate and present
                                    stunning astronomical images, educational content, and interactive experiences that
                                    bring the cosmos to your fingertips.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-6 mb-12"
                    >
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <Telescope className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Explore the Universe</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Browse through thousands of astronomical images from NASA's APOD archive,
                                    featuring galaxies, nebulae, planets, and cosmic phenomena.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Learn & Discover</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Each image comes with detailed explanations, interactive quizzes, and
                                    educational content to enhance your understanding of astronomy.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                                        <Heart className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Personalize Your Journey</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Save your favorite cosmic images, take astronomy quizzes, and discover
                                    what the universe looked like on your birthday.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                        <Rocket className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold">Share the Wonder</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    Share amazing cosmic discoveries with friends and family through
                                    social media integration and community features.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Team Section */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-2xl text-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                    Team DigiExperts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    APERTURE was created by Team DigiExperts for the NASA Space Apps Challenge.
                                    Our passionate team of developers and space enthusiasts came together to make
                                    astronomy more accessible and engaging for everyone.
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                                    {[
                                        'Ezaz Ahmed Sayem',
                                        'Shahariar Rijon',
                                        'Bushra Mohammed Harun',
                                        'Jannatul Ferdous'
                                    ].map((name, index) => (
                                        <div key={name} className="text-center">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-2xl">🧑‍🚀</span>
                                            </div>
                                            <p className="font-medium text-foreground">{name}</p>
                                            <p className="text-sm text-muted-foreground">Developer</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div> */}

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        className="text-center mt-12"
                    >
                        <p className="text-muted-foreground mb-6">
                            Ready to explore the cosmos? Start your journey through the universe today.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="/apod"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                <Telescope className="w-5 h-5" />
                                Explore APOD
                            </a>
                            <a
                                href="/gallery"
                                className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors"
                            >
                                Browse Gallery
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
